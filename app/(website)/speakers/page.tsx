import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cachedClient } from "@/lib/sanity.client"
import { speakersQuery, siteSettingsQuery } from "@/lib/sanity.queries"
import { LuExternalLink } from "react-icons/lu"

export const metadata: Metadata = {
  title: "Speakers | GeoMundus Conference",
  description: "Meet our keynote speakers for the GeoMundus Conference",
}

export default async function SpeakersPage() {
  const speakers = await cachedClient(speakersQuery.query)
  const siteSettings = await cachedClient(siteSettingsQuery.query)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Keynote Speakers</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            GeoMundus features a broad landscape of expertise within the GIS field, including academic figures, NGO
            advisors, government officials, and private sector actors.
          </p>
        </div>
      </section>

      {/* Speakers List */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {speakers && speakers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {speakers.map((speaker) => (
                <div key={speaker._id} className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-md p-6">
                  <div className="flex-shrink-0">
                    <div className="relative w-40 h-40 mx-auto md:mx-0 overflow-hidden rounded-full">
                      <Image
                        src={speaker.imageUrl || "/placeholder.svg?height=160&width=160"}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold flex items-center gap-2">
                        {speaker.name}
                        {speaker.websiteUrl && (
                          <Link
                            href={speaker.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 hover:text-emerald-800"
                          >
                            <LuExternalLink className="h-5 w-5" />
                            <span className="sr-only">Website</span>
                          </Link>
                        )}
                      </h2>
                      <p className="text-gray-600">{speaker.title}</p>
                      <p className="text-gray-500">{speaker.organization}</p>
                    </div>

                    {(speaker.keynoteTitle || speaker.keynoteDescription) && (
                      <div className="mt-4">
                        <h3 className="font-semibold text-lg text-emerald-700 mb-2">KEYNOTE:</h3>
                        {speaker.keynoteTitle && <p className="font-medium">{speaker.keynoteTitle}</p>}
                        {speaker.keynoteDescription && (
                          <div className="mt-2 text-gray-700">{speaker.keynoteDescription}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Speakers Coming Soon</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're currently finalizing our lineup of distinguished speakers for this year's conference. Check back
                soon for updates!
              </p>
              {siteSettings?.contactEmail && (
                <p className="mt-6 text-gray-600">
                  Interested in speaking at GeoMundus?{" "}
                  <Link href={`mailto:${siteSettings.contactEmail}`} className="text-emerald-700 hover:underline">
                    Contact us
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Join Us at GeoMundus</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Don't miss the opportunity to hear from these distinguished speakers and connect with professionals and
            students in the geospatial community.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-800"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}
