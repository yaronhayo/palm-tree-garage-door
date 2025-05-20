// Common type definitions

/**
 * Service area type
 */
export interface ServiceArea {
  name: string
  slug: string
  description?: string
  zip_codes?: string[]
  image?: string
}

/**
 * Testimonial type
 */
export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  text: string
  date: string
  image?: string
  verified?: boolean
  service?: string
}

/**
 * Service type
 */
export interface Service {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price?: string
  image: string
  icon?: string
  features?: string[]
}

/**
 * FAQ item type
 */
export interface FAQItem {
  question: string
  answer: string
  category?: string
}

/**
 * Form submission data
 */
export interface FormData {
  name: string
  email: string
  phone: string
  message?: string
  service?: string
  preferredDate?: string
  preferredTime?: string
  address?: string
  city?: string
  zip?: string
  recaptchaToken?: string
  [key: string]: any
}

/**
 * API response type
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
