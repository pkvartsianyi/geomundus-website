import { Suspense } from "react";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  params: {
    year: string;
  };
}

// Remove static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getConferenceData(year: string) {
  try {
    const response = await fetch(`${process.env.LEGACY_WEBSITE_URL}/${year}`, {
      cache: 'no-store',
      headers: {
        'Accept': 'text/html',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch conference data for year ${year}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Error fetching conference data:', error);
    return null;
  }
}

const ConferenceContent = async ({ year }: { year: string }) => {
  const currentYear = new Date().getFullYear();
  const parsedYear = Number.parseInt(year);

  // If current year, redirect to main page
  if (parsedYear === currentYear) {
    return redirect("/")
  }

  // Fetch conference data
  const conferenceHtml = await getConferenceData(year);

  // If no conference data, show legacy page via iframe
  if (!conferenceHtml) {
    return (
      <div className="relative w-full h-[90vh]">
        <iframe
          src={`${process.env.LEGACY_WEBSITE_URL}/${year}`}
          title={`Legacy GeoMundus ${year}`}
          className="w-full h-full border-0"
        />
      </div>
    )
  }

  // If HTML is available, render it directly
  return (
    <div className="relative">
      <div 
        className="w-full min-h-[90vh]" 
        dangerouslySetInnerHTML={{ __html: conferenceHtml }}
      />
      <Link 
        href="/" 
        className="fixed bottom-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        Come back to the main page
      </Link>
    </div>
  )
}

const ConferenceYearPage: NextPage<Props> = ({ params }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConferenceContent year={params.year} />
    </Suspense>
  )
}

export default ConferenceYearPage;