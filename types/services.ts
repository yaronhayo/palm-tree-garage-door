import type { Image, Location } from "./common"

// Service types
export interface Service {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price?: {
    amount: number
    currency: string
    unit?: string
  }
  features: string[]
  image: Image
  icon?: string
  category: ServiceCategory
  faqs?: FAQ[]
  seo?: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description?: string
  image?: Image
}

// FAQ types
export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  serviceId?: string
}

// Testimonial types
export interface Testimonial {
  id: string
  name: string
  location?: string
  rating: number
  text: string
  date: string
  image?: Image
  serviceId?: string
  verified: boolean
  source?: "google" | "yelp" | "facebook" | "website"
}

// Project/Gallery types
export interface Project {
  id: string
  title: string
  description: string
  location: Location
  date: string
  images: Image[]
  beforeImages?: Image[]
  afterImages?: Image[]
  serviceId?: string
  testimonialId?: string
}

// Service area types
export interface ServiceArea {
  id: string
  name: string
  slug: string
  zipCodes: string[]
  description?: string
  image?: Image
  coordinates?: {
    latitude: number
    longitude: number
  }
  radius?: number // in miles
  isActive: boolean
  priority: number
}

// Offer/Promotion types
export interface Promotion {
  id: string
  title: string
  description: string
  code?: string
  discountType: "percentage" | "fixed" | "free_service"
  discountValue: number
  startDate: string
  endDate: string
  image?: Image
  serviceIds?: string[]
  isActive: boolean
  termsAndConditions?: string
}
