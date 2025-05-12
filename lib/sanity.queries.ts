import { groq } from "next-sanity";
import { tagQuery } from "./sanity.client";

// Site settings
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
    submissionOpen,
    banner
  }`,
  "siteSettings",
);

// About section
export const aboutSectionQuery = tagQuery(
  groq`*[_type == "aboutSection"][0]{
    title,
    content
  }`,
  "aboutSection",
);

// Focus topic
export const focusTopicQuery = tagQuery(
  groq`*[_type == "focusTopic"][0]{
    title,
    description,
    topics
  }`,
  "focusTopic",
);

// Speakers
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

// Sponsors
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

// Partners
export const partnersQuery = tagQuery(
  groq`*[_type == "partner"] | order(order asc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    websiteUrl
  }`,
  "partner",
);

// Conference archives
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

// Schedule
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

// FAQs
export const faqsQuery = tagQuery(
  groq`*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer
  }`,
  "faq",
);

// Registrations
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

// Submission info
export const submissionInfoQuery = tagQuery(
  groq`*[_type == "submission"][0] {
    title,
    description,
    callForPapersTitle,
    callForPapersContent,
    submissionDeadline,
    shortPaperGuidelineUrl,
    posterGuidelineUrl,
    submissionFormUrl,
    mobilityGrantFormUrl,
    posterPrintingNote,
    contactEmail,
    contactNote,
    footnote
  }`,
  "submission",
);
