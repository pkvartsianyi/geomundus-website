import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AiOutlineCalendar,
  AiOutlineEnvironment,
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineGithub,
} from "react-icons/ai";
import CountdownTimer from "@/components/countdown-timer";
import SpeakerCard from "@/components/speaker-card";
import SponsorSection from "@/components/sponsor-section";
import CookieConsent from "@/components/cookie-consent";
import { PortableText } from "@portabletext/react";
import { cachedClient } from "@/lib/sanity.client";
import {
  siteSettingsQuery,
  aboutSectionQuery,
  focusTopicQuery,
  speakersQuery,
  sponsorsQuery,
  partnersQuery,
  scheduleQuery,
  faqsQuery,
  currentConferenceYearQuery,
} from "@/lib/sanity.queries";
import ScheduleSection from "@/components/schedule-section";
import FaqSection from "@/components/faq-section";
import { RegisterButton } from "@/components/register-button";
import type {
  AboutSection,
  Conference,
  Faq,
  FocusTopic,
  Partner,
  Schedule,
  SiteSettings,
  Speaker,
  Sponsor,
} from "@/sanity.types";
import PortableTextRenderer from "@/components/portable-text-renderer";

export default async function Home() {
  const siteSettings = await cachedClient<SiteSettings>(
    siteSettingsQuery.query,
  );
  const aboutSection = await cachedClient<AboutSection>(
    aboutSectionQuery.query,
  );
  const focusTopic = await cachedClient<FocusTopic>(focusTopicQuery.query);
  const speakers = await cachedClient<Speaker[]>(speakersQuery.query);
  const sponsors = await cachedClient<Sponsor[]>(sponsorsQuery.query);
  const partners = await cachedClient<Partner[]>(partnersQuery.query);
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          {siteSettings?.conferenceDate && (
            <CountdownTimer targetDate={siteSettings.conferenceDate} />
          )}

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            {aboutSection?.title}
          </h2>

          <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
            {aboutSection?.content && (
              <div className="prose max-w-none">
                <PortableTextRenderer content={aboutSection.content} />
              </div>
            )}
          </div>

          {siteSettings?.youtubeVideoId && (
            <div className="mt-12 max-w-4xl mx-auto aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${siteSettings.youtubeVideoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </section>

      {/* Focus Topics Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {focusTopic && (
            <div className="mt-16 max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 inline-block relative">
                  {focusTopic?.title}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-emerald-600 rounded-full"></span>
                </h2>

                {focusTopic?.description && (
                  <div className="prose prose-lg max-w-3xl mx-auto mt-8 text-gray-700 portable-text">
                    <PortableTextRenderer content={focusTopic.description} />
                  </div>
                )}
              </div>

              {focusTopic?.topics && focusTopic.topics.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-xl md:text-2xl font-semibold text-center mb-10 text-emerald-800">
                    Conference Topics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {focusTopic.topics.slice(0, 9).map((topic, index) => (
                      <div
                        key={index}
                        className="bg-white p-5 rounded-lg shadow-md border-l-4 border-emerald-600 hover:shadow-lg transition-shadow duration-300"
                      >
                        <p className="text-gray-800 font-medium">{topic}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

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
      {speakers && (
        <section id="speakers" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Keynote Speakers
            </h2>

            <p className="text-justify text-gray-700 max-w-4xl mx-auto mb-12">
              Geomundus will feature a broad landscape of expertise and areas of
              action within the GIS field, such as academic figures, NGO
              advisors, government officials, and private sector actors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {speakers.length > 0 ? (
                speakers.map((speaker) => (
                  <SpeakerCard
                    key={speaker._id}
                    name={speaker.name || ""}
                    title={speaker.title || ""}
                    organization={speaker.organization || ""}
                    imageUrl={(speaker as any).imageUrl} // Suppressed type error
                    websiteUrl={speaker.websiteUrl}
                    keynoteTitle={speaker.keynoteTitle}
                    keynoteDescription={speaker.keynoteDescription}
                  />
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center">
                  <p className="text-gray-700">
                    No speakers available at the moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Sponsors Section */}
      {sponsors && partners && (
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
                  href="mailto:geomunduswebteam@gmail.com"
                  className="text-emerald-700 hover:underline"
                >
                  geomunduswebteam@gmail.com
                </Link>{" "}
                for more information on how to be a part of this unique
                conference! We will be glad to discuss your ideas for sponsoring
                the GeoMundus Conference.
              </p>
            </div>

            <SponsorSection sponsors={sponsors} partners={partners} />
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

            {siteSettings?.arrivalInfoPdfUrl && (
              <div className="text-center mb-12">
                <Link
                  href={siteSettings.arrivalInfoPdfUrl}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Arrival Information to University of Münster [PDF]
                </Link>
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
                  <PortableText value={siteSettings.mailingAddress} />
                )}
              </div>

              <div className="text-center">
                <h4 className="text-xl font-bold mb-4">Social Media</h4>
                <div className="flex justify-center space-x-4">
                  {siteSettings?.socialLinks?.twitter && (
                    <Link
                      href={siteSettings.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-emerald-700"
                    >
                      <AiOutlineTwitter className="h-6 w-6" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  )}
                  {siteSettings?.socialLinks?.facebook && (
                    <Link
                      href={siteSettings.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-emerald-700"
                    >
                      <AiOutlineFacebook className="h-6 w-6" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                  )}
                  {siteSettings?.socialLinks?.instagram && (
                    <Link
                      href={siteSettings.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-emerald-700"
                    >
                      <AiOutlineInstagram className="h-6 w-6" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  )}
                  {siteSettings?.socialLinks?.linkedin && (
                    <Link
                      href={siteSettings.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-emerald-700"
                    >
                      <AiOutlineLinkedin className="h-6 w-6" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  )}
                  {siteSettings?.socialLinks?.github && (
                    <Link
                      href={siteSettings.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-emerald-700"
                    >
                      <AiOutlineGithub className="h-6 w-6" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  )}
                </div>
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
