// app/archive/assets/[[...path]]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Years to check, in order of preference
const YEARS_TO_CHECK = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', 
                        '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'];

export async function GET(
  request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  // Get the requested path

  const {path} = await params || [];  
  if (!path || path.length === 0) {
    return new NextResponse(null, { status: 404 });
  }
  const assetsPath = path.join('/');
  
  // Construct the original URL to allow proper redirecting
  const originalUrl = request.nextUrl.clone();
  const originalPath = originalUrl.pathname;
  
  // Check if the assets exists in any of the years
  // In a production environment, you might want to implement caching here
  // for performance reasons
  for (const year of YEARS_TO_CHECK) {
    const legacyUrl = `${process.env.LEGACY_WEBSITE_URL}/${year}/assets/${assetsPath}`;
    try {
      // Using fetch with HEAD method to check if file exists
      const response = await fetch(legacyUrl, { 
        method: 'HEAD',
        cache: 'force-cache' // Cache the result to avoid repeated checks
      });
      
      if (response.ok) {
        // If the assets exists, redirect to it
        return NextResponse.redirect(legacyUrl);
      }
    } catch (error) {
      // Silently continue if fetch fails
      console.error(`Failed to check ${legacyUrl}:`, error);
    }
  }
  
  // If assets wasn't found in any year, return 404
  return new NextResponse(null, { status: 404 });
}
