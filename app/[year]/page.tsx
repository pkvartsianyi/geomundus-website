import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PortableText } from "@portabletext/react"
import { cachedClient } from "@/lib/sanity.client"
import { conferenceByYearQuery, currentConferenceYearQuery } from "@/lib/sanity.queries"
import ConferenceGallery from "@/components/conference-gallery"

type Props = {
  params: { year: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const conference = await cachedClient(conferenceByYearQuery, { year: Number.parseInt(params.year) })

  if (!conference) {
    return {
      title: "Conference Not Found",
    }
  }

  return {
    title: `GeoMundus ${params.year} - ${conference.title}`,
    description: conference.description,
  }
}

export default async function ConferenceYearPage({ params }: Props) {
  const year = Number.parseInt(params.year)
  const conference = await cachedClient(conferenceByYearQuery, { year })
  const currentYear = await cachedClient(currentConferenceYearQuery)

  if (!conference) {
    notFound()
  }

  const isCurrentYear = year === currentYear

  return (
    <main className="flex min-h-screen flex-col">
      {/* Archive Banner */}
      {!isCurrentYear && (
        <div className="bg-amber-100 text-amber-800 p-4 text-center">
          <p className="font-medium">
            You are viewing an archived conference.
            <Link href="/" className="ml-2 underline">
              View the current conference
            </Link>
          </p>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600 min-h-[60vh]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">GeoMundus {year}</h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4">{conference.title}</h2>
          <h3 className="text-lg md:text-xl mb-4">{conference.description}</h3>
          <h3 className="text-lg md:text-xl mb-8">
            <span className="font-bold">{conference.location}</span>
          </h3>

          {isCurrentYear && (
            <Button asChild size="lg" className="bg-white text-emerald-800 hover:bg-gray-100">
              <Link href="/registration">Register Now</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Conference Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Conference Highlights</h2>

          <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
            {conference.highlights && (
              <div className="prose max-w-none">
                <PortableText value={conference.highlights} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {conference.galleryImages && conference.galleryImages.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Photo Gallery</h2>

            <ConferenceGallery images={conference.galleryImages} />
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Explore Other GeoMundus Conferences</h2>

          <div className="flex flex-wrap justify-center gap-4">
            {isCurrentYear ? (
              <Button asChild variant="outline">
                <Link href="/archive">View All Past Conferences</Link>
              </Button>
            ) : (
              <>
                <Button asChild>
                  <Link href="/">Current Conference</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/archive">All Past Conferences</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
