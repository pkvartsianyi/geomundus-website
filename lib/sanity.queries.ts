import { groq } from "next-sanity";
import { tagQuery } from "./sanity.client";

export const siteSettingsQuery = tagQuery(
  groq`*[_type == "siteSettings"][0]{
  title,
  description,
  "logo": logo.asset->url,
  "whiteLogo": whiteLogo.asset->url,
  conferenceDate,
  conferenceEndDate,
  conferenceLocation,
  conferenceVenue,
  heroSubtitle,
  heroMessage,
  youtubeVideoId,
  contactEmail,
  mailingAddress,
  socialLinks,
  googleMapsEmbedUrl,
  storyMapUrl,
  arrivalInfoPdfUrl,
  registrationOpen,
  registrationDeadline,
  banner
}`,
  "siteSettings",
);

export const aboutSectionQuery = tagQuery(
  groq`*[_type == "aboutSection"][0]{
  title,
  content
}`,
  "aboutSection",
);

export const focusTopicQuery = tagQuery(
  groq`*[_type == "focusTopic"][0]{
  title,
  description,
  topics
}`,
  "focusTopic",
);

export const speakersQuery = tagQuery(
  groq`*[_type == "speaker"] | order(order asc) {
  _id,
  name,
  title,
  organization,
  "imageUrl": image.asset->url,
  websiteUrl,
  keynoteTitle,
  keynoteDescription
}`,
  "speaker",
);

export const sponsorsQuery = tagQuery(
  groq`*[_type == "sponsor"] | order(tier asc, order asc) {
  _id,
  name,
  "logoUrl": logo.asset->url,
  websiteUrl,
  tier
}`,
  "sponsor",
);

export const partnersQuery = tagQuery(
  groq`*[_type == "partner"] | order(order asc) {
  _id,
  name,
  "logoUrl": logo.asset->url,
  websiteUrl
}`,
  "partner",
);

// New queries for conference archives
export const conferencesQuery = tagQuery(
  groq`*[_type == "conference"] | order(year desc) {
  _id,
  year,
  title,
  description,
  "imageUrl": image.asset->url,
  websiteUrl,
  location
}`,
  "conference",
);

export const conferenceByYearQuery = (year: number) =>
  tagQuery(
    groq`*[_type == "conference" && year == $year][0] {
  _id,
  year,
  title,
  description,
  "imageUrl": image.asset->url,
  websiteUrl,
  location,
  highlights,
  "galleryImages": gallery[].asset->url
}`,
    "conference",
  );

export const currentConferenceYearQuery = tagQuery(
  groq`*[_type == "conference"] | order(year desc)[0].year`,
  "conference",
);

// Query for schedule
export const scheduleQuery = tagQuery(
  groq`*[_type == "schedule"][0] {
  days[] {
    date,
    events[] {
      time,
      title,
      description,
      speaker,
      location,
      type
    }
  }
}`,
  "schedule",
);

// Query for FAQs
export const faqsQuery = tagQuery(
  groq`*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer
}`,
  "faq",
);

// Query for registrations
export const registrationsQuery = tagQuery(
  groq`*[_type == "registration"] | order(_createdAt desc) {
  _id,
  firstName,
  lastName,
  email,
  affiliation,
  role,
  dietaryRequirements,
  attendingDinner,
  _createdAt
}`,
  "registration",
);

// Query for submission information
export const submissionInfoQuery = tagQuery(
  groq`*[_type == "submission"][0] {
  title,
  description,
  callForPapersTitle,
  callForPapersContent,
  submissionDeadline,
  shortPaperGuidelineUrl,
  shortPaperTemplateUrl,
  posterGuidelineUrl,
  mobilityGrantGuidelineUrl,
  submissionFormUrl,
  mobilityGrantFormUrl,
  posterPrintingNote,
  contactEmail,
  contactNote,
  footnote
}`,
  "submission",
);
