import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cachedClient } from "@/lib/sanity.client"
import { conferenceByYearQuery } from "@/lib/sanity.queries"
import type { Conference } from "@/sanity.types"
import PortableTextRenderer from "@/components/portable-text-renderer"
import { CalendarIcon, MapPinIcon, ExternalLinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  params: {
    year: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = params
  const query = conferenceByYearQuery(Number.parseInt(year))
  const conference = await cachedClient<Conference>(query.query, { year: Number.parseInt(year) })

  if (!conference) {
    return {
      title: "Conference Not Found - GeoMundus",
      description: "The requested conference year could not be found.",
    }
  }

  return {
    title: `${conference.title} - GeoMundus`,
    description: conference.description || "Past GeoMundus Conference",
  }
}

export default async function ConferenceArchivePage({ params }: Props) {
  const { year } = await params
  const query = conferenceByYearQuery(Number.parseInt(year))
  const conference = await cachedClient<Conference>(query.query, { year: Number.parseInt(year) })

  if (!conference) {
    notFound()
  }
  console.log(conference);
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Image Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-teal-600 opacity-90" />
        {conference.imageUrl ? (
          <div className="absolute inset-0">
            <Image
              src={conference.imageUrl || "/placeholder.svg"}
              alt={conference.title || "Conference image"}
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>
        ) : null}

        <div className="relative container mx-auto px-4 py-24 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 flex items-center">
              <Link
                href="/archive"
                className="text-white/80 hover:text-white flex items-center gap-2 mb-4 transition-colors"
              >
                <span>← Back to Archive</span>
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{conference.title}</h1>

            <div className="flex flex-wrap gap-6 mb-8">
              {conference.year && (
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{conference.year}</span>
                </div>
              )}

              {conference.location && (
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{conference.location}</span>
                </div>
              )}
            </div>

            {conference.description && <p className="text-lg md:text-xl max-w-3xl">{conference.description}</p>}

            {conference.websiteUrl && (
              <div className="mt-8">
                <Button asChild size="lg" className="bg-white text-emerald-800 hover:bg-gray-100">
                  <a
                    href={conference.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <span>Visit Original Website</span>
                    <ExternalLinkIcon className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-16">
            {/* Highlights Section */}
            {conference.highlights && conference.highlights.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-8 text-emerald-800 dark:text-emerald-400 border-b pb-4 border-emerald-200 dark:border-emerald-800">
                  Conference Highlights
                </h2>
                <div className="prose dark:prose-invert max-w-none prose-emerald prose-lg">
                  <PortableTextRenderer content={conference.highlights} />
                </div>
              </section>
            )}

            {/* Gallery Section */}
            {conference.gallery && conference.gallery.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-8 text-emerald-800 dark:text-emerald-400 border-b pb-4 border-emerald-200 dark:border-emerald-800">
                  Photo Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {conference.gallery.map((image, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                      <CardContent className="p-0">
                        <div className="relative aspect-square">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={image.alt || `Gallery image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="mt-16 flex flex-col sm:flex-row justify-between gap-4 border-t border-gray-200 dark:border-gray-700 pt-8">
            <Button asChild variant="outline">
              <Link href="/archive">Back to Archive</Link>
            </Button>

            <Button asChild>
              <Link href="/">Return to Current Conference</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
