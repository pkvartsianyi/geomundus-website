import type { Metadata } from "next";
import { cachedClient } from "@/lib/sanity.client";
import { currentConferenceQuery } from "@/lib/sanity.queries";
import SpeakerCard from "@/components/speaker-card";
import type { Conference } from "@/sanity.types";

export const metadata: Metadata = {
  title: "Speakers - GeoMundus Conference",
  description: "Meet our keynote speakers for the GeoMundus Conference.",
};

export default async function SpeakersPage() {
  const currentConference = await cachedClient<Conference>(
    currentConferenceQuery.query,
  );
  const speakers = currentConference?.keynoteSpeakers || [];
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Keynote Speakers
          </h1>

          <p className="text-center text-gray-700 max-w-4xl mx-auto mb-12">
            GeoMundus features a broad landscape of expertise and areas of
            action within the GIS field, such as academic figures, NGO advisors,
            government officials, and private sector actors.
          </p>

          {speakers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {speakers.map((speaker, index) => (
                <SpeakerCard
                  key={index}
                  name={speaker.name || ""}
                  title={speaker.topic || ""}
                  organization={speaker.organization || ""}
                  imageUrl={
                    speaker.imageUrl || "/placeholder.svg?height=300&width=300"
                  }
                  websiteUrl={speaker.websiteUrl}
                  keynoteTitle={speaker.topic}
                  keynoteDescription=""
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Speakers will be announced soon. Stay tuned!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
