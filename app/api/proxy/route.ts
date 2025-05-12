import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get("year");
  const path = searchParams.get("path");

  if (!year || !path) {
    return new NextResponse("Missing required parameters", { status: 400 });
  }

  // Construct the URL to the legacy content
  const legacyUrl = `${process.env.LEGACY_WEBSITE_URL}/${year}${path}`;

  try {
    // Fetch the content from the legacy site
    const response = await fetch(legacyUrl, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch: ${response.status}`, {
        status: response.status,
      });
    }

    // Get content type to properly handle different types of resources
    const contentType = response.headers.get("content-type") || "text/plain";

    // Get the content as array buffer to handle binary data
    const data = await response.arrayBuffer();

    // Create a response with the same content type
    const proxyResponse = new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

    return proxyResponse;
  } catch (error) {
    console.error(`Proxy error for ${legacyUrl}:`, error);
    return new NextResponse("Failed to proxy content", { status: 500 });
  }
}
