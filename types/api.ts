import type { PaginationParams, PaginatedResponse } from "./common"
import type { Service, ServiceArea, Testimonial, FAQ, Project, Promotion } from "./services"

// API endpoints
export enum ApiEndpoint {
  SERVICES = "/api/services",
  SERVICE_AREAS = "/api/service-areas",
  TESTIMONIALS = "/api/testimonials",
  FAQS = "/api/faqs",
  PROJECTS = "/api/projects",
  PROMOTIONS = "/api/promotions",
  CONTACT = "/api/contact",
  BOOKING = "/api/booking",
  QUOTE = "/api/quote",
  NEWSLETTER = "/api/newsletter",
  TESTIMONIAL_SUBMISSION = "/api/testimonial-submission",
}

// API request types
export interface GetServicesRequest extends PaginationParams {
  category?: string
  featured?: boolean
}

export interface GetServiceAreasRequest extends PaginationParams {
  zipCode?: string
  active?: boolean
}

export interface GetTestimonialsRequest extends PaginationParams {
  serviceId?: string
  rating?: number
  verified?: boolean
  source?: string
}

export interface GetFAQsRequest extends PaginationParams {
  category?: string
  serviceId?: string
  searchQuery?: string
}

export interface GetProjectsRequest extends PaginationParams {
  serviceId?: string
  location?: string
}

export interface GetPromotionsRequest extends PaginationParams {
  active?: boolean
  serviceId?: string
}

// API response types
export type GetServicesResponse = PaginatedResponse<Service>
export type GetServiceAreasResponse = PaginatedResponse<ServiceArea>
export type GetTestimonialsResponse = PaginatedResponse<Testimonial>
export type GetFAQsResponse = PaginatedResponse<FAQ>
export type GetProjectsResponse = PaginatedResponse<Project>
export type GetPromotionsResponse = PaginatedResponse<Promotion>

export interface ContactFormResponse {
  success: boolean
  message: string
  referenceId?: string
}

export interface BookingFormResponse {
  success: boolean
  message: string
  bookingId?: string
  confirmationSent?: boolean
}

export interface QuoteFormResponse {
  success: boolean
  message: string
  quoteId?: string
  estimatedResponse?: string
}

export interface NewsletterFormResponse {
  success: boolean
  message: string
  subscribed: boolean
}

export interface TestimonialSubmissionResponse {
  success: boolean
  message: string
  testimonialId?: string
  pending?: boolean
}
