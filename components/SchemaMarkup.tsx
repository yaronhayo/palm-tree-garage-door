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
}

const COMPANY_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"

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
}: SchemaMarkupProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Generate the appropriate schema based on the page
  const generateSchema = () => {
    // Always include the LocalBusiness schema
    const schemas = [generateLocalBusinessSchema(serviceAreas)]

    // Add breadcrumbs schema if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push(generateBreadcrumbListSchema(breadcrumbs))
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
