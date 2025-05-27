"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateReviewSchema,
  generateAggregateRatingSchema,
  generateBreadcrumbListSchema,
  generateFAQCategorySchema,
  generateWebPageSchema,
} from "@/lib/schema"

// Import service areas data
import { serviceAreas } from "@/data/service-areas"

// Import FAQ data
import { faqItems, faqCategories } from "@/data/faq-items"

// Import testimonials data
import { testimonialsData } from "@/components/Testimonials"

interface SchemaMarkupProps {
  page?: "home" | "service" | "contact" | "testimonials" | "about" | "faq" | string
  serviceName?: string
  serviceDescription?: string
  servicePrice?: string
  serviceImage?: string
  breadcrumbs?: { name: string; url: string }[]
  activeSection?: string | null
}

const COMPANY_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://palmtreegaragedoor.com"
const COMPANY_NAME = "Palm Tree Garage Door Repair"
const COMPANY_DESCRIPTION =
  "Professional garage door repair and installation services in South Florida. 24/7 emergency service, free estimates, and expert technicians for all garage door needs."
const COMPANY_LOGO = `${COMPANY_URL}/logo.png`
const COMPANY_PHONE = "(321) 366-9723"
const COMPANY_EMAIL = "palmtreegaragedoor@gmail.com"

/**
 * SchemaMarkup Component - Generates JSON-LD schema markup for SEO
 *
 * This component is used to add structured data to pages for better search engine visibility.
 * It dynamically generates different schema types based on the page and provided props.
 *
 * @export default - This component uses default export for compatibility with dynamic imports
 */
export default function SchemaMarkup({
  page = "home",
  serviceName,
  serviceDescription,
  servicePrice,
  serviceImage,
  breadcrumbs,
  activeSection,
}: SchemaMarkupProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Generate the appropriate schema based on the page
  const generateSchema = () => {
    // Always include the LocalBusiness schema
    const schemas = [
      generateLocalBusinessSchema(serviceAreas, {
        name: COMPANY_NAME,
        description: COMPANY_DESCRIPTION,
        logo: COMPANY_LOGO,
        url: COMPANY_URL,
        telephone: COMPANY_PHONE,
        email: COMPANY_EMAIL,
        priceRange: "$$$",
        openingHours: "Mo-Su 00:00-23:59", // 24/7 service
      }),
    ]

    // Add WebPage schema for the current page
    schemas.push(
      generateWebPageSchema({
        url: COMPANY_URL + (page === "home" ? "" : `/${page}`),
        name:
          page === "home"
            ? "Palm Tree Garage Door Repair | South Florida's Trusted Garage Door Experts"
            : `${page.charAt(0).toUpperCase() + page.slice(1)} | Palm Tree Garage Door Repair`,
        description: COMPANY_DESCRIPTION,
        activeSection: activeSection || undefined,
      }),
    )

    // Add breadcrumbs schema if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push(generateBreadcrumbListSchema(breadcrumbs))
    } else if (page !== "home") {
      // Generate default breadcrumbs for non-home pages
      schemas.push(
        generateBreadcrumbListSchema([
          { name: "Home", url: COMPANY_URL },
          { name: page.charAt(0).toUpperCase() + page.slice(1), url: `${COMPANY_URL}/${page}` },
        ]),
      )
    }

    // Add page-specific schemas
    if (page === "home" || page === "testimonials") {
      // Add AggregateRating schema
      schemas.push(generateAggregateRatingSchema(testimonialsData))

      // Add individual Review schemas (limit to 10 for performance)
      testimonialsData.slice(0, 10).forEach((testimonial) => {
        schemas.push(generateReviewSchema(testimonial))
      })
    }

    if (page === "home") {
      // Add FAQ schema with enhanced options
      schemas.push(
        generateFAQSchema(faqItems.slice(0, 10), {
          includeMetadata: true,
          pageUrl: COMPANY_URL,
        }),
      )
    } else if (page === "faq") {
      // Add comprehensive FAQ schema for FAQ page
      schemas.push(
        generateFAQSchema(faqItems, {
          includeMetadata: true,
          includeCategories: true,
          pageUrl: `${COMPANY_URL}/faq`,
        }),
      )

      // Add category schemas
      faqCategories.forEach((category) => {
        schemas.push(generateFAQCategorySchema(category))
      })
    } else if (page === "service" && serviceName && serviceDescription && servicePrice && serviceImage) {
      // Add specific service schema
      schemas.push(generateServiceSchema(serviceName, serviceDescription, servicePrice, serviceImage, serviceAreas))
    }

    return schemas
  }

  return (
    <>
      {generateSchema().map((schema, index) => (
        <Script
          key={`schema-${index}`}
          id={`schema-${page}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          strategy="afterInteractive"
        />
      ))}
    </>
  )
}
