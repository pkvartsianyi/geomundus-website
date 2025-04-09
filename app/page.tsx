import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ChevronDown, Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"
import CountdownTimer from "@/components/countdown-timer"
import SpeakerCard from "@/components/speaker-card"
import SponsorSection from "@/components/sponsor-section"
import CookieConsent from "@/components/cookie-consent"
import { PortableText } from "@portabletext/react"
import { cachedClient } from "@/lib/sanity.client"
import {
  siteSettingsQuery,
  aboutSectionQuery,
  focusTopicQuery,
  speakersQuery,
  sponsorsQuery,
  partnersQuery,
} from "@/lib/sanity.queries"

export default async function Home() {
  const siteSettings = await cachedClient(siteSettingsQuery)
  const aboutSection = await cachedClient(aboutSectionQuery)
  const focusTopic = await cachedClient(focusTopicQuery)
  const speakers = await cachedClient(speakersQuery)
  const sponsors = await cachedClient(sponsorsQuery)
  const partners = await cachedClient(partnersQuery)

  // Format conference date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const startDate = siteSettings?.conferenceDate ? new Date(siteSettings.conferenceDate) : new Date()
  const endDate = siteSettings?.conferenceEndDate ? new Date(siteSettings.conferenceEndDate) : new Date()

  const startDay = startDate.getDate()
  const endDay = endDate.getDate()
  const month = startDate.toLocaleString("default", { month: "long" })

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600 min-h-[90vh]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            {siteSettings?.whiteLogo && (
              <Image
                src={siteSettings.whiteLogo || "/placeholder.svg"}
                alt="GeoMundus Logo"
                width={300}
                height={150}
                className="mx-auto"
              />
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            {siteSettings?.heroSubtitle || "A Conference on Geospatial Technologies, Geoinformatics & GI Applications"}
          </h2>
          <h3 className="text-lg md:text-xl mb-4">
            This year, we have an additional focus topic: <em>Environmental challenges seen through the GIS lens</em>.
          </h3>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-5 w-5" />
            <h3 className="text-lg md:text-xl">
              {startDay}
              <sup>th</sup> and {endDay}
              <sup>th</sup> {month}
            </h3>
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="h-5 w-5" />
            <h3 className="text-lg md:text-xl font-bold">{siteSettings?.conferenceLocation || "Lisbon, Portugal"}</h3>
          </div>
          <h3 className="text-lg md:text-xl mb-8">
            {siteSettings?.heroMessage || "To our participants all over the globe, "}
            <span className="text-yellow-300">See you in Portugal!</span>
          </h3>
          <Button asChild size="lg" className="bg-white text-emerald-800 hover:bg-gray-100">
            <Link href="#info">
              Discover
              <ChevronDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="info" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <CountdownTimer targetDate={siteSettings?.conferenceDate || "Oct 25, 2024 09:00:00"} />

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {aboutSection?.title || "About the conference"}
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
            {aboutSection?.content ? (
              <div className="prose max-w-none">
                <PortableText value={aboutSection.content} />
              </div>
            ) : (
              <p className="text-justify">
                The GeoMundus Conference is an international Geoinformatics and Geospatial Technologies conference
                organized by students for students.
              </p>
            )}
          </div>

          <div className="mt-12 max-w-4xl mx-auto aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${siteSettings?.youtubeVideoId || "cV8qlgsHk6c"}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              {focusTopic?.title || "This year's focus topic:"}
            </h2>

            {focusTopic?.description ? (
              <div className="prose max-w-none">
                <PortableText value={focusTopic.description} />
              </div>
            ) : (
              <p className="text-justify text-gray-700">
                This conference shares and celebrates the work of researchers, students, policymakers and professionals
                within the scope of <strong>Geoinformatics and GI Applications</strong>.
              </p>
            )}

            {focusTopic?.topics && focusTopic.topics.length > 0 && (
              <ul className="list-disc pl-6 mt-6 space-y-2 text-gray-700">
                {focusTopic.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Keynote Speakers</h2>

          <p className="text-justify text-gray-700 max-w-4xl mx-auto mb-12">
            As a student-led effort, Geomundus will feature a broad landscape of expertise and areas of action within
            the GIS field, such as academic figures, NGO advisors, government officials, and private sector actors.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {speakers && speakers.length > 0 ? (
              speakers.map((speaker) => (
                <SpeakerCard
                  key={speaker._id}
                  name={speaker.name}
                  title={speaker.title}
                  organization={speaker.organization}
                  imageUrl={speaker.imageUrl}
                  websiteUrl={speaker.websiteUrl}
                  keynoteTitle={speaker.keynoteTitle}
                  keynoteDescription={speaker.keynoteDescription}
                />
              ))
            ) : (
              // Fallback speakers if no data from Sanity
              <>
                <SpeakerCard
                  name="Prof. Dr. Gilberto Câmara"
                  title="Senior Research Fellow"
                  organization="Brazil's National Institute for Space Research (INPE)"
                  imageUrl="/images/speakers/gilberto-camara.png"
                  websiteUrl="https://gilbertocamara.org/"
                  keynoteTitle="Open Source Geospatial Software: The first 40 years and beyond"
                />
                <SpeakerCard
                  name="Pablo Viejo"
                  title="Digital Solutions Developer"
                  organization="Bettermaps"
                  imageUrl="/images/speakers/pablo-viejo.jpg"
                  keynoteTitle="The Future of AI-GIS: Challenges and Opportunities"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Sponsors & Partners</h2>

          <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
            <p className="text-justify">
              GeoMundus is seeking partners from public and private entities including, but not limited to, spatial,
              technological, scientific, governmental, and academic fields. We will be thrilled to have your support and
              participation in this international event.
            </p>

            <p className="text-justify">
              Are you interested in placing your logo on our website? Maybe you want to sponsor a specific event at the
              conference? There are endless ways to contribute to enhancing both Geomundus and your business. See our
              sponsorship tier levels{" "}
              <a href="#" className="text-emerald-700 hover:underline">
                here
              </a>
              .
            </p>

            <p className="text-justify">
              Start the conversation by contacting us at{" "}
              <a
                href={`mailto:${siteSettings?.contactEmail || "budget@geomundus.org"}`}
                className="text-emerald-700 hover:underline"
              >
                {siteSettings?.contactEmail || "budget@geomundus.org"}
              </a>
              for more information on how to be a part of this unique conference! We will be glad to discuss your ideas
              to sponsor the GeoMundus Conference 2024.
            </p>
          </div>

          <SponsorSection sponsors={sponsors} partners={partners} />
        </div>
      </section>

      {/* Preconference Event */}
      <section id="tour" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Preconference Event</h2>

          <div className="h-[80vh] w-full">
            <iframe
              src={siteSettings?.storyMapUrl || "https://storymaps.arcgis.com/stories/453cb12a362346b2bdaeddc6a4513592"}
              width="100%"
              height="100%"
              allowFullScreen
              allow="geolocation"
              className="border-0"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Location & Contact</h2>

          <div className="text-center mb-8">
            <iframe
              src={
                siteSettings?.googleMapsEmbedUrl ||
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2458.058763798403!2d7.593380312105773!3d51.96935347673458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9ba9f3d65243d%3A0x34c737361405b3e7!2sGeo%201!5e0!3m2!1sen!2sde!4v1715340655200!5m2!1sen!2sde"
              }
              width="80%"
              height="600"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 mx-auto"
            ></iframe>
          </div>

          <div className="text-center mb-12">
            <a href={siteSettings?.arrivalInfoPdfUrl || "#"} className="font-bold text-emerald-700 hover:underline">
              Arrival Information to University of Münster [PDF]
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Email</h4>
              <a
                href={`mailto:${siteSettings?.contactEmail || "info@geomundus.org"}`}
                className="text-emerald-700 hover:underline"
              >
                {siteSettings?.contactEmail || "info@geomundus.org"}
              </a>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Mailing address</h4>
              <p>
                {siteSettings?.mailingAddress || (
                  <>
                    University of Münster
                    <br />
                    Institute for Geoinformatics
                    <br />
                    Heisenbergstraβe 2, D-48149
                    <br />
                    Münster, Germany
                  </>
                )}
              </p>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Social Media</h4>
              <div className="flex justify-center space-x-4">
                {siteSettings?.socialLinks?.twitter && (
                  <a
                    href={siteSettings.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-700"
                  >
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {siteSettings?.socialLinks?.facebook && (
                  <a
                    href={siteSettings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-700"
                  >
                    <Facebook className="h-6 w-6" />
                    <span className="sr-only">Facebook</span>
                  </a>
                )}
                {siteSettings?.socialLinks?.instagram && (
                  <a
                    href={siteSettings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-700"
                  >
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                )}
                {siteSettings?.socialLinks?.linkedin && (
                  <a
                    href={siteSettings.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-700"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {siteSettings?.socialLinks?.github && (
                  <a
                    href={siteSettings.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-700"
                  >
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <ul className="flex flex-wrap justify-center gap-4 mb-4">
            <li>
              <a
                href="https://github.com/geomunduswebteam/geomundus2024"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                &copy; GeoMundus 2024
              </a>
            </li>
            <li>Designed by GeoMundus Web Team</li>
          </ul>
        </div>
      </footer>

      {/* Cookie Consent */}
      <CookieConsent />
    </main>
  )
}
