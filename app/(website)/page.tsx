import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineCalendar, AiOutlineEnvironment } from "react-icons/ai";
import CountdownTimer from "@/components/countdown-timer";
import SpeakerCard from "@/components/speaker-card";
import SponsorSection from "@/components/sponsor-section";
import CookieConsent from "@/components/cookie-consent";
import { cachedClient } from "@/lib/sanity.client";
import {
  siteSettingsQuery,
  currentConferenceQuery,
  scheduleQuery,
  faqsQuery,
  currentConferenceYearQuery,
} from "@/lib/sanity.queries";
import ScheduleSection from "@/components/schedule-section";
import FaqSection from "@/components/faq-section";
import { RegisterButton } from "@/components/register-button";
import PortableTextRenderer from "@/components/portable-text-renderer";
import type { Conference, Faq, Schedule, SiteSettings } from "@/sanity.types";
import YouTubeSection from "@/components/video-section";
import { SocialLinks } from "@/components/socialLinks";
import { FeaturedResource } from "@/components/featured-resources";

export default async function Home() {
  const siteSettings = await cachedClient<SiteSettings>(
    siteSettingsQuery.query,
  );
  const currentConference = await cachedClient<Conference>(
    currentConferenceQuery.query,
  );
  const schedule = await cachedClient<Schedule>(scheduleQuery.query);
  const faqs = await cachedClient<Faq[]>(faqsQuery.query);
  const currentYear = await cachedClient<Conference>(
    currentConferenceYearQuery.query,
  );

  const startDate = siteSettings?.conferenceDate
    ? new Date(siteSettings.conferenceDate)
    : null;
  const endDate = siteSettings?.conferenceEndDate
    ? new Date(siteSettings.conferenceEndDate)
    : null;

  const startDay = startDate?.getDate();
  const endDay = endDate?.getDate();
  const month = startDate?.toLocaleString("default", { month: "long" });
  const year = startDate?.getFullYear();

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      {siteSettings && (
        <section className="relative flex flex-col items-center justify-center px-4 py-24 pt-32 text-center text-white bg-gradient-to-br from-emerald-800 to-teal-600 min-h-[90vh]">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              {siteSettings?.logo && (
                <Image
                  src={siteSettings.logo || "/placeholder.svg"}
                  alt={siteSettings.title || "GeoMundus Logo"}
                  width={300}
                  height={150}
                  className="mx-auto"
                />
              )}
            </div>
            <h2 className="text-xl md:text-2xl font-medium mb-4">
              {siteSettings?.heroSubtitle}
            </h2>
            <h3 className="text-lg md:text-xl mb-4">
              {siteSettings?.description}
            </h3>
            {startDate && endDate && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <AiOutlineCalendar className="h-5 w-5" />
                <h3 className="text-lg md:text-xl">
                  {startDay}
                  <sup>th</sup> and {endDay}
                  <sup>th</sup> {month} {year}
                </h3>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 mb-6">
              <AiOutlineEnvironment className="h-5 w-5" />
              <h3 className="text-lg md:text-xl font-bold">
                {siteSettings?.conferenceLocation}
              </h3>
            </div>
            <h3 className="text-lg md:text-xl mb-8 bg-emerald-700/50 inline-block px-4 py-2 rounded-md">
              {siteSettings?.heroMessage}
              <span className="text-yellow-300 font-bold ml-2">
                See you in Portugal!
              </span>
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <RegisterButton
                registrationOpen={siteSettings?.registrationOpen}
              />
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {currentConference.about && (
        <section id="info" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {siteSettings?.conferenceDate && (
              <CountdownTimer targetDate={siteSettings.conferenceDate} />
            )}

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              {currentConference.about?.title}
            </h2>

            <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
              {currentConference.about?.content && (
                <div className="prose max-w-none">
                  <PortableTextRenderer
                    content={currentConference.about.content}
                  />
                </div>
              )}
            </div>

            {siteSettings?.youtubeVideoId && (
              <div className="mt-12">
                <YouTubeSection
                  videoId={siteSettings.youtubeVideoId}
                  title="GeoMundus Conference"
                  description="Watch our latest conference video to learn more about GeoMundus and the exciting topics we cover in geospatial technologies."
                />
              </div>
            )}

            {/* Updated Focus Topic Section with Modern Design */}
            {currentConference.focusTopic && (
              <div className="mt-24 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block relative">
                    {currentConference.focusTopic?.title || "This Year's Focus"}
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-emerald-600 rounded-full"></span>
                  </h2>

                  {currentConference.focusTopic?.description && (
                    <div className="prose prose-lg max-w-3xl mx-auto mt-8 text-gray-700">
                      <div className="portable-text">
                        <PortableTextRenderer
                          content={currentConference.focusTopic.description}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {currentConference.focusTopic?.topics &&
                  currentConference.focusTopic.topics.length > 0 && (
                    <div className="mt-12">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentConference.focusTopic.topics.map(
                          (topic, index) => {
                            return (
                              <div
                                key={index}
                                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-emerald-600 hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] group"
                              >
                                <div className="flex items-start">
                                  <div>
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                      {topic}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                      Explore innovative approaches and research
                                      in this critical area of geospatial
                                      science.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          },
                        )}
                      </div>

                      <div className="mt-12 text-center">
                        <Button
                          asChild
                          className="bg-emerald-700 hover:bg-emerald-800 text-white"
                        >
                          <Link href="/submissions">Submit Your Research</Link>
                        </Button>
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Schedule Section */}
      {schedule && schedule.days && schedule.days.length > 0 && (
        <section id="schedule" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Conference Schedule
            </h2>
            <ScheduleSection schedule={schedule} />
          </div>
        </section>
      )}

      {/* Speakers Section */}
      {currentConference?.keynoteSpeakers &&
        currentConference.keynoteSpeakers.length > 0 && (
          <section id="speakers" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                Keynote Speakers
              </h2>

              <p className="text-justify text-gray-700 max-w-4xl mx-auto mb-12">
                GeoMundus will feature a broad landscape of expertise and areas
                of action within the GIS field, such as academic figures, NGO
                advisors, government officials, and private sector actors.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentConference.keynoteSpeakers.map((speaker, index) => (
                  <SpeakerCard
                    key={index}
                    name={speaker.name || ""}
                    title={speaker.topic || ""}
                    organization={speaker.organization || ""}
                    imageUrl={
                      speaker.imageUrl ||
                      "/placeholder.svg?height=300&width=300"
                    }
                    websiteUrl={speaker.websiteUrl}
                    keynoteTitle={speaker.topic}
                    keynoteDescription=""
                  />
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Sponsors Section */}
      {currentConference.sponsors && currentConference.partners && (
        <section id="sponsors" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Sponsors & Partners
            </h2>

            <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
              <p className="text-justify">
                GeoMundus is seeking partners from public and private entities
                including, but not limited to, spatial, technological,
                scientific, governmental, and academic fields. We will be
                thrilled to have your support and participation in this
                international event.
              </p>

              <p className="text-justify">
                Start the conversation by contacting us at{" "}
                <Link
                  href="mailto:budget@geomundus.org"
                  className="text-emerald-700 hover:underline"
                >
                  budget@geomundus.org
                </Link>{" "}
                for more information on how to be a part of this unique
                conference! We will be glad to discuss your ideas for sponsoring
                the GeoMundus Conference.
              </p>
            </div>

            <SponsorSection
              sponsors={currentConference.sponsors}
              partners={currentConference.partners}
            />
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <section id="faq" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            <FaqSection faqs={faqs} />
          </div>
        </section>
      )}

      {/* Preconference Event */}
      {siteSettings?.storyMapUrl && (
        <section id="tour" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Preconference Event
            </h2>

            <div className="h-[80vh] w-full">
              <iframe
                src={siteSettings.storyMapUrl}
                width="100%"
                height="100%"
                allowFullScreen
                allow="geolocation"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-white">
        <FeaturedResource link={siteSettings?.arrivalInfoPdfUrl} />
      </section>

      {/* Location & Contact */}
      {siteSettings && (
        <section id="contact" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Location & Contact
            </h2>

            {siteSettings?.googleMapsEmbedUrl && (
              <div className="text-center mb-8">
                <iframe
                  src={siteSettings.googleMapsEmbedUrl}
                  width="80%"
                  height="600"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0 mx-auto"
                ></iframe>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-xl font-bold mb-4">Email</h4>
                <Link
                  href={`mailto:${siteSettings?.contactEmail}`}
                  className="text-emerald-700 hover:underline"
                >
                  {siteSettings?.contactEmail}
                </Link>
              </div>

              <div className="text-center">
                <h4 className="text-xl font-bold mb-4">Mailing address</h4>
                {siteSettings?.mailingAddress && (
                  <PortableTextRenderer content={siteSettings.mailingAddress} />
                )}
              </div>

              <div className="text-center">
                <h4 className="text-xl font-bold mb-4">Social Media</h4>
                <SocialLinks
                  twitter={siteSettings?.socialLinks?.twitter}
                  facebook={siteSettings?.socialLinks?.facebook}
                  instagram={siteSettings?.socialLinks?.instagram}
                  linkedin={siteSettings?.socialLinks?.linkedin}
                  github={siteSettings?.socialLinks?.github}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Past Conferences Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Past Conferences
          </h2>

          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg mb-8">
              GeoMundus has a rich history of bringing together students,
              researchers, and professionals in the geospatial community since
              2009.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-emerald-700 hover:bg-emerald-800"
            >
              <Link href="/archive">Explore Past Conferences</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <ul className="flex flex-wrap justify-center gap-4 mb-4">
            <li>
              <Link
                href="https://github.com/geomunduswebteam/geomundus2024"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                © GeoMundus {currentYear?.year}
              </Link>
            </li>
            <li>Designed and Developed by GeoMundus Web Team</li>
          </ul>
        </div>
      </footer>

      {/* Cookie Consent */}
      <CookieConsent />
    </main>
  );
}
