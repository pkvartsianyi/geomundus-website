export interface SiteSettings {
  title?: string;
  description?: string;
  logo?: string;
  whiteLogo?: string;
  conferenceDate?: string;
  conferenceEndDate?: string;
  conferenceLocation?: string;
  conferenceVenue?: string;
  heroSubtitle?: string;
  heroMessage?: string;
  youtubeVideoId?: string;
  contactEmail?: string;
  mailingAddress?: any;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  googleMapsEmbedUrl?: string;
  storyMapUrl?: string;
  arrivalInfoPdfUrl?: string;
  registrationOpen?: boolean;
  registrationDeadline?: string;
  banner?: {
    enabled: boolean;
    text: string;
    color: string;
    linkText?: string;
    linkUrl?: string;
  };
}
