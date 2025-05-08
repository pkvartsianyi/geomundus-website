import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// This secret is used to ensure only authorized requests can revalidate
const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify the request has the correct secret
    const secret = request.headers.get("x-webhook-secret");
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Extract information from the webhook payload
    const { _type, slug, _id } = body;

    // Create a tag for this specific document
    const documentTag = `${_type}:${_id}`;

    // Revalidate the specific document using its tag
    revalidateTag(documentTag);

    // Determine which paths to revalidate based on document type
    switch (_type) {
      case "siteSettings":
        // Site settings affect all pages
        revalidatePath("/", "layout");
        break;
      case "conference":
        // Revalidate archive and specific conference page
        revalidatePath("/archive");
        if (body.year) {
          revalidatePath(`/${body.year}`);
        }
        break;
      case "speaker":
        // Speakers appear on the home page
        revalidatePath("/");
        break;
      case "sponsor":
      case "partner":
        // Sponsors and partners appear on home and sponsors page
        revalidatePath("/");
        revalidatePath("/sponsors");
        break;
      case "faq":
        // FAQs appear on the home page
        revalidatePath("/");
        break;
      case "submission":
        // Submission info appears on the submissions page
        revalidatePath("/submissions");
        break;
      case "schedule":
        // Schedule appears on the home page
        revalidatePath("/");
        break;
      case "aboutSection":
      case "focusTopic":
        // These appear on the home page
        revalidatePath("/");
        break;
      default:
        // For any other document types, revalidate the home page
        revalidatePath("/");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: err },
      { status: 500 },
    );
  }
}
