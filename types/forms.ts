// Form-related types

// Contact form
export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  serviceInterest?: string
  recaptchaToken?: string
}

// Booking form
export interface BookingFormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  message?: string
  recaptchaToken?: string
}

// Quote request form
export interface QuoteFormData {
  name: string
  email: string
  phone: string
  address: string
  zipCode: string
  serviceType: string
  doorType?: string
  doorWidth?: number
  doorHeight?: number
  description?: string
  images?: File[]
  recaptchaToken?: string
}

// Newsletter subscription
export interface NewsletterFormData {
  email: string
  name?: string
  interests?: string[]
  recaptchaToken?: string
}

// Testimonial submission
export interface TestimonialSubmissionData {
  name: string
  email: string
  rating: number
  text: string
  serviceId?: string
  consentToPublish: boolean
  recaptchaToken?: string
}

// Form validation errors
export interface FormErrors {
  [key: string]: string
}

// Form submission status
export type FormStatus = "idle" | "submitting" | "success" | "error"

// Form submission result
export interface FormResult {
  success: boolean
  message?: string
  errors?: FormErrors
  data?: any
}
