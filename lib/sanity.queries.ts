import { groq } from "next-sanity"

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
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
  registrationDeadline
}`

export const aboutSectionQuery = groq`*[_type == "aboutSection"][0]{
  title,
  content
}`

export const focusTopicQuery = groq`*[_type == "focusTopic"][0]{
  title,
  description,
  topics
}`

export const speakersQuery = groq`*[_type == "speaker"] | order(order asc) {
  _id,
  name,
  title,
  organization,
  "imageUrl": image.asset->url,
  websiteUrl,
  keynoteTitle,
  keynoteDescription
}`

export const sponsorsQuery = groq`*[_type == "sponsor"] | order(tier asc, order asc) {
  _id,
  name,
  "logoUrl": logo.asset->url,
  websiteUrl,
  tier
}`

export const partnersQuery = groq`*[_type == "partner"] | order(order asc) {
  _id,
  name,
  "logoUrl": logo.asset->url,
  websiteUrl
}`

// New queries for conference archives
export const conferencesQuery = groq`*[_type == "conference"] | order(year desc) {
  _id,
  year,
  title,
  description,
  "imageUrl": image.asset->url,
  websiteUrl,
  location
}`

export const conferenceByYearQuery = groq`*[_type == "conference" && year == $year][0] {
  _id,
  year,
  title,
  description,
  "imageUrl": image.asset->url,
  websiteUrl,
  location,
  highlights,
  "galleryImages": gallery[].asset->url
}`

export const currentConferenceYearQuery = groq`*[_type == "conference"] | order(year desc)[0].year`

// Query for schedule
export const scheduleQuery = groq`*[_type == "schedule"][0] {
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
}`

// Query for FAQs
export const faqsQuery = groq`*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer
}`

// Query for registrations
export const registrationsQuery = groq`*[_type == "registration"] | order(_createdAt desc) {
  _id,
  firstName,
  lastName,
  email,
  affiliation,
  role,
  dietaryRequirements,
  attendingDinner,
  _createdAt
}`

// Query for submission information
export const submissionInfoQuery = groq`*[_type == "submission"][0] {
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
}`
