import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { path?: string[] } },
) {
  // Get the requested path
  const { path } = (await params) || {};

  if (!path || path.length === 0) {
    return new NextResponse(null, { status: 404 });
  }

  const assetPath = path.join("/");

  // Try to extract year from Referer header
  const referrer = request.headers.get("referer");
  let year;

  if (referrer) {
    try {
      const referrerUrl = new URL(referrer);
      const pathSegments = referrerUrl.pathname.split("/");
      // Look for '/archive/YYYY' pattern
      const archiveYearIndex = pathSegments.indexOf("archive") + 1;
      if (archiveYearIndex > 0 && archiveYearIndex < pathSegments.length) {
        year = pathSegments[archiveYearIndex];
      }
    } catch (error) {
      console.error("Error parsing referrer:", error);
    }
  }

  // If no year found, return 404
  if (!year) {
    console.log(`No year found for asset: ${assetPath}`);
    return new NextResponse(null, { status: 404 });
  }

  // Construct and check the legacy URL
  const legacyUrl = `${process.env.LEGACY_WEBSITE_URL}/${year}/assets/${assetPath}`;

  try {
    const response = await fetch(legacyUrl, {
      method: "HEAD",
      cache: "force-cache",
    });

    if (response.ok) {
      // If the asset exists, redirect to it
      return NextResponse.redirect(legacyUrl);
    }
  } catch (error) {
    console.error(`Failed to check ${legacyUrl}:`, error);
  }

  // If asset wasn't found, return 404
  return new NextResponse(null, { status: 404 });
}
