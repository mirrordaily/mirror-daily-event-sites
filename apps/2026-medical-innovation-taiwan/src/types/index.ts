// schedule
export type FormattedSpeaker = {
  name: string
  title: string[]
}
export type RowSpeakerItem = {
  type: string
  speakers: FormattedSpeaker[]
}

export type ScheduleItem = {
  topic: string
  time: string
  speakersInfo: string
  instruction: string
}

// related-post
export type ResizedImage = {
  original: string
  w480: string
  w800: string
  w1200: string
  w1600: string
  w2400: string
}

export type HeroImage = {
  resized: ResizedImage
  resizedWebp: ResizedImage
}

export type GenericRelatedPost = {
  id: string
  updatedAt: string
  slug: string
  publishedDate: string
  state: string
  title: string
  heroImage: HeroImage | null
  url: string
}

// partner
export type LogoImage = {
  instruction: string
  image: string
}

export type GenericPartners = {
  [key: string]: LogoImage[]
}

// speaker
export type GenericSpeaker = {
  name: string
  image: string
  description: string
}

// index
export type ForumData = {
  metadata: {
    pageInfo: {
      heroImage_mobile?: {
        content: string
        instruction: string
      }
      heroImage_tablet?: {
        content: string
        instruction: string
      }
      heroImage_desktop?: {
        content: string
        instruction: string
      }
      introduction?: {
        content: string
        instruction: string
      }
      qrCode?: {
        content: string
        instruction: string
      }
      video?: {
        content: string
        instruction: string
      }
      registration?: {
        content: string
        instruction: string
      }
      registration_links?: {
        content: string
        instruction: string
      }
    }
    schedule: ScheduleItem[]
    speakers: GenericSpeaker[]
    partners: {
      [key: string]: LogoImage[]
    }
  }

  relatedPost: GenericRelatedPost[]
}

// heroImage
export type FormattedHeroImage = {
  mobile: string
  tablet: string
  desktop: string
}

// Home
export type OGProperty = {
  ogTitle: string
  ogImageSrc: string
  ogDesc: string
}

// header
export type NavItem = {
  title: string
  href: string
  show: boolean
}
