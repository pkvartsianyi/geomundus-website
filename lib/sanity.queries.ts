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
  arrivalInfoPdfUrl
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
