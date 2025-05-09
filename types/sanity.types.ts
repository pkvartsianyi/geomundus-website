import type { PortableTextBlock } from "@portabletext/types"

// Base Sanity types
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface SanityImageAsset extends SanityDocument {
  _type: "sanity.imageAsset"
  url: string
  path: string
  assetId: string
  extension: string
  metadata: {
    dimensions: {
      width: number
      height: number
      aspectRatio: number
    }
    lqip?: string
    hasAlpha?: boolean
    isOpaque?: boolean
  }
}

export interface SanityImageCrop {
  _type: "sanity.imageCrop"
  top: number
  bottom: number
  left: number
  right: number
}

export interface SanityImageHotspot {
  _type: "sanity.imageHotspot"
  x: number
  y: number
  height: number
  width: number
}

export interface SanityImage {
  _type: "image"
  asset: SanityImageAsset
  crop?: SanityImageCrop
  hotspot?: SanityImageHotspot
  caption?: string
  alt?: string
}

// About Section
export interface AboutSection extends SanityDocument {
  _type: "aboutSection"
  title: string
  content: PortableTextBlock[]
}

// Conference
export interface Conference extends SanityDocument {
  _type: "conference"
  year: number
  title: string
  description?: string
  image?: SanityImage
  websiteUrl?: string
  location?: string
  highlights?: PortableTextBlock[]
  gallery?: Array<SanityImage>
}

// FAQ
export interface FAQ extends SanityDocument {
  _type: "faq"
  question: string
  answer: PortableTextBlock[]
  order: number
}

// Focus Topic
export interface FocusTopic extends SanityDocument {
  _type: "focusTopic"
  title: string
  description: PortableTextBlock[]
  topics: string[]
}

// Partner
export interface Partner extends SanityDocument {
  _type: "partner"
  name: string
  logo?: SanityImage
  websiteUrl?: string
  order: number
}

// Registration
export interface Registration extends SanityDocument {
  _type: "registration"
  firstName: string
  lastName: string
  email: string
  affiliation?: string
  role?: "student" | "academic" | "industry" | "government" | "other"
  dietaryRequirements?: string
  attendingDinner: boolean
  abstract?: string
  status: "pending" | "confirmed" | "cancelled"
  qrCode?: SanityImage
}

// Schedule
export interface ScheduleEvent {
  _key: string
  time: string
  title: string
  description?: string
  speaker?: string
  location?: string
  type?: "keynote" | "talk" | "workshop" | "break" | "social" | "other"
}

export interface ScheduleDay {
  _key: string
  date: string
  events: ScheduleEvent[]
}

export interface Schedule extends SanityDocument {
  _type: "schedule"
  title: string
  days: ScheduleDay[]
}

// Site Settings
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings"
  title?: string
  description?: string
  logo?: SanityImage
  whiteLogo?: SanityImage
  conferenceDate?: string
  conferenceEndDate?: string
  conferenceLocation?: string
  conferenceVenue?: string
  heroSubtitle?: string
  heroMessage?: string
  youtubeVideoId?: string
  contactEmail?: string
  mailingAddress?: PortableTextBlock[]
  socialLinks?: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
    github?: string
  }
  googleMapsEmbedUrl?: string
  storyMapUrl?: string
  arrivalInfoPdfUrl?: string
  registrationOpen?: boolean
  registrationDeadline?: string
  banner?: {
    enabled: boolean
    text: string
    color: string
    linkText?: string
    linkUrl?: string
  }
}

// Speaker
export interface Speaker extends SanityDocument {
  _type: "speaker"
  name: string
  title?: string
  organization?: string
  image?: SanityImage
  websiteUrl?: string
  keynoteTitle?: string
  keynoteDescription?: string
  order: number
}

// Sponsor
export interface Sponsor extends SanityDocument {
  _type: "sponsor"
  name: string
  logo?: SanityImage
  websiteUrl?: string
  tier?: "platinum" | "gold" | "silver" | "bronze"
  order: number
}

// Submission
export interface Submission extends SanityDocument {
  _type: "submission"
  title: string
  description?: string
  callForPapersTitle: string
  callForPapersContent: PortableTextBlock[]
  submissionDeadline?: string
  shortPaperGuidelineUrl?: string
  shortPaperTemplateUrl?: string
  posterGuidelineUrl?: string
  mobilityGrantGuidelineUrl?: string
  submissionFormUrl?: string
  mobilityGrantFormUrl?: string
  posterPrintingNote?: string
  contactEmail?: string
  contactNote?: string
  footnote?: string
}
