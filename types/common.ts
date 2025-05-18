// Common types used throughout the application

// Generic status types
export type Status = "idle" | "loading" | "success" | "error"

// Common response types
export interface ApiResponse<T> {
  data?: T
  error?: ApiError
  status: Status
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

// Pagination types
export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasMore: boolean
}

// Location types
export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country?: string
}

export interface Location extends Address {
  coordinates?: Coordinates
}

// Media types
export interface Image {
  id: string
  url: string
  alt: string
  width: number
  height: number
  blurDataUrl?: string
}

export interface Video {
  id: string
  url: string
  title: string
  thumbnail?: string
  duration?: number
}

// SEO types
export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
}

// Theme and styling types
export type ThemeMode = "light" | "dark" | "system"

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  error: string
  success: string
  warning: string
  info: string
}

// Analytics types
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
}

export interface UserSession {
  id: string
  startTime: number
  endTime?: number
  referrer?: string
  landingPage?: string
  userAgent?: string
  events: AnalyticsEvent[]
}

// Form types
export interface FormField {
  name: string
  label: string
  type: string
  required?: boolean
  placeholder?: string
  defaultValue?: any
  options?: { label: string; value: string }[]
  validation?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    validate?: (value: any) => boolean | string
  }
}

export interface FormConfig {
  fields: FormField[]
  submitLabel: string
  successMessage?: string
  errorMessage?: string
}
