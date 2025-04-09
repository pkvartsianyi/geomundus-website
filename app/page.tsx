import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ChevronDown, Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"
import CountdownTimer from "@/components/countdown-timer"
import SpeakerCard from "@/components/speaker-card"
import SponsorSection from "@/components/sponsor-section"
import CookieConsent from "@/components/cookie-consent"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600 min-h-[90vh]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Image src="/images/white-logo.png" alt="GeoMundus Logo" width={300} height={150} className="mx-auto" />
          </div>
          <h2 className="text-xl md:text-2xl font-medium mb-4">
            A Conference on Geospatial Technologies, Geoinformatics & GI Applications
          </h2>
          <h3 className="text-lg md:text-xl mb-4">
            This year, we have an additional focus topic: <em>Environmental challenges seen through the GIS lens</em>.
          </h3>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-5 w-5" />
            <h3 className="text-lg md:text-xl">
              25<sup>th</sup> and 26<sup>th</sup> October
            </h3>
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="h-5 w-5" />
            <h3 className="text-lg md:text-xl font-bold">Münster, Germany</h3>
          </div>
          <h3 className="text-lg md:text-xl mb-8">
            To our participants all over the globe, <span className="text-yellow-300">See you in Germany!</span>
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
          <CountdownTimer targetDate="Oct 25, 2024 09:00:00" />

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">About the conference</h2>

          <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
            <p className="text-justify">
              The GeoMundus Conference is an{" "}
              <strong>international Geoinformatics and Geospatial Technologies conference</strong> organized by students
              for students. It is hosted by the students of the{" "}
              <a href="https://mastergeotech.info" className="text-emerald-700 hover:underline">
                Erasmus Mundus Master's program in Geospatial Technologies
              </a>
              . Since 2009, the GeoMundus conference has been hosted annually - alternating between the program's
              organizing universities-
              <a href="https://www.novaims.unl.pt/" className="text-emerald-700 hover:underline">
                NOVA IMS (Lisbon, Portugal)
              </a>
              ,{" "}
              <a href="https://www.uni-muenster.de/en/" className="text-emerald-700 hover:underline">
                University of Münster (Münster, Germany)
              </a>
              and{" "}
              <a href="https://www.uji.es/" className="text-emerald-700 hover:underline">
                UJI (Castellón de la Plana, Spain)
              </a>
              . This year, the 16th edition of the conference will be held at the University of Münster, Münster,
              Germany. This conference is free of charge.
            </p>

            <p className="text-justify">
              The approach of students organizing a conference for students is quite unique. However, the participants
              include experts, researchers, professionals, policymakers, and the general public. Anyone who is curious
              or enthusiastic about geospatial technologies and their applications can participate in this conference!
              It is a fantastic opportunity to engage with this exciting and fast-growing field and to network with a
              diverse group of people at the cutting edge.
            </p>

            <p className="text-justify">
              As students and future members of the geospatial community, we want to bring together a representative
              group of professionals to share their experience and critically discuss the role of geospatial
              technologies experts in the industry, academia, government and NGO positions where students are most
              likely to develop a career.
            </p>

            <p className="text-justify">The 16th edition will be in-person attendance.</p>

            <p className="text-justify">
              This year's conference will feature keynote speakers, workshops, paper and poster presentations, career
              development, and networking events. Past keynotes have included illustrious names from Geospatial space
              such as Dr. Michael Goodchild, Dr. Werner Kuhn, and John Nelson.
            </p>
          </div>

          <div className="mt-12 max-w-4xl mx-auto aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/cV8qlgsHk6c"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">This year's focus topic:</h2>

            <p className="text-justify text-gray-700">
              This conference shares and celebrates the work of researchers, students, policymakers and professionals
              within the scope of <strong>Geoinformatics and GI Applications</strong>. We're setting the stage for
              enriching discussions on the newest technologies and methodologies that address environmental challenges
              with the use of geospatial information. This will promote multi-disciplinary insights from participants on
              topics that cover <strong>Geospatial Technologies</strong> and various aspects of sustainable development
              such as (but not limited to):
            </p>

            <ul className="list-disc pl-6 mt-6 space-y-2 text-gray-700">
              <li>Disaster management</li>
              <li>Environmental resilience</li>
              <li>Spatiotemporal modeling of climate conditions</li>
              <li>Data visualization and decision-making</li>
              <li>Water management</li>
              <li>Physical Geography</li>
              <li>Remote sensing techniques</li>
              <li>Sustainable land use</li>
              <li>Geospatial Analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Keynote Speakers</h2>

          <p className="text-justify text-gray-700 max-w-4xl mx-auto mb-12">
            As a student-led effort, Geomundus will feature a broad landscape of expertise and areas of action within
            the GIS field, such as academic figures, NGO advisors, government officials, and private sector actors. We
            understand that climate action seen through a GIS lens requires a wide array of perspectives that enrich
            discussions and ignite our curiosity. These insights will ultimately become the foundations of our
            professional practice. Information about the keynote speakers and the keynote topics will be updated soon!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

            <SpeakerCard
              name="Rafaela Tiengo"
              title="Remote Sensing Specialist"
              organization="Universidade dos Açores"
              imageUrl="/images/speakers/rafaela-tiengo.jpeg"
              websiteUrl="https://rafaelatiengo.substack.com/"
              keynoteTitle="Monitoring Conservation Projects: Integrating Google Earth Engine, Google Colab and Python"
            />

            <SpeakerCard
              name="Andres Felipe Ramirez"
              title="Geospatial Information Manager"
              organization="German Agency for International Cooperation (GIZ)"
              imageUrl="/images/speakers/andres-felipe-ramirez.jpeg"
              websiteUrl="https://www.linkedin.com/in/aframirez/"
              keynoteTitle="Geospatial Technologies in the context of International Organizations, NGOs, and Development Cooperation"
            />
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
              <a href="mailto:budget@geomundus.org" className="text-emerald-700 hover:underline">
                budget@geomundus.org
              </a>
              for more information on how to be a part of this unique conference! We will be glad to discuss your ideas
              to sponsor the GeoMundus Conference 2024.
            </p>
          </div>

          <SponsorSection />
        </div>
      </section>

      {/* Preconference Event */}
      <section id="tour" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Preconference Event</h2>

          <div className="h-[80vh] w-full">
            <iframe
              src="https://storymaps.arcgis.com/stories/453cb12a362346b2bdaeddc6a4513592"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2458.058763798403!2d7.593380312105773!3d51.96935347673458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b9ba9f3d65243d%3A0x34c737361405b3e7!2sGeo%201!5e0!3m2!1sen!2sde!4v1715340655200!5m2!1sen!2sde"
              width="80%"
              height="600"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 mx-auto"
            ></iframe>
          </div>

          <div className="text-center mb-12">
            <a href="#" className="font-bold text-emerald-700 hover:underline">
              Arrival Information to University of Münster [PDF]
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Email</h4>
              <a href="mailto:info@geomundus.org" className="text-emerald-700 hover:underline">
                info@geomundus.org
              </a>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Mailing address</h4>
              <p>
                University of Münster
                <br />
                Institute for Geoinformatics
                <br />
                Heisenbergstraβe 2, D-48149
                <br />
                Münster, Germany
              </p>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Social Media</h4>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://twitter.com/geomundus_conf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-700"
                >
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://www.facebook.com/geomundus/?fref=ts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-700"
                >
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/geomundus_conference/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-700"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/geomundusconference/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-700"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/geomunduswebteam/geomundus2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-700"
                >
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </a>
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
