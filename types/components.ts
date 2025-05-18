// Types for component props

import type { ReactNode } from "react"
import type { ImageData, SEOMetadata, Location } from "./common"
import type { Service } from "./services"

// Button variants
export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "link"

// Button sizes
export type ButtonSize = "sm" | "md" | "lg" | "xl"

// Button props
export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  className?: string
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
  iconPosition?: "left" | "right"
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  href?: string
  target?: string
  rel?: string
  ariaLabel?: string
}

// Card variants
export type CardVariant = "default" | "outline" | "filled" | "elevated"

// Card props
export interface CardProps {
  variant?: CardVariant
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  image?: ImageData
  title?: string
  subtitle?: string
  footer?: ReactNode
  hoverable?: boolean
}

// Header props
export interface HeaderProps {
  transparent?: boolean
  sticky?: boolean
  className?: string
}

// Footer props
export interface FooterProps {
  className?: string
}

// Hero section props
export interface HeroSectionProps {
  title: string
  subtitle?: string
  image?: ImageData
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  overlay?: boolean
  overlayOpacity?: number
  fullHeight?: boolean
  className?: string
  backgroundPosition?: string
}

// Testimonial data
export interface Testimonial {
  id: string | number
  name: string
  location?: string
  rating: number
  service?: string
  date?: string
  image?: string
  quote: string
}

// Testimonials section props
export interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  className?: string
  autoplay?: boolean
  autoplayInterval?: number
}

// FAQ item
export interface FAQItem {
  question: string
  answer: string
}

// FAQ section props
export interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
  subtitle?: string
  className?: string
  structured?: boolean
}

// Service area props
export interface ServiceAreaProps {
  areas: {
    city: string
    state: string
    zipCodes: string[]
  }[]
  title?: string
  subtitle?: string
  className?: string
  featured?: boolean
  maxItems?: number
}

// Service card props
export interface ServiceCardProps {
  service: Service
  className?: string
  onClick?: () => void
  featured?: boolean
}

// Services grid props
export interface ServicesGridProps {
  services: Service[]
  title?: string
  subtitle?: string
  className?: string
  columns?: 1 | 2 | 3 | 4
  featured?: boolean
}

// SEO component props
export interface SEOProps extends SEOMetadata {
  structuredData?: Record<string, any>
}

// Image gallery props
export interface ImageGalleryProps {
  images: string[] | ImageData[]
  className?: string
  columns?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  rounded?: boolean
  aspectRatio?: "1:1" | "4:3" | "16:9" | "3:2"
  lightbox?: boolean
  thumbnailQuality?: number
  fullQuality?: number
}

// Location CTA props
export interface LocationCTAProps {
  location: Location
  className?: string
  phone?: string
  ctaText?: string
  ctaLink?: string
}
