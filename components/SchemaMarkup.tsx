"use client"

import { useEffect, useState } from "react"
import {
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateReviewSchema,
  generateAggregateRatingSchema,
} from "@/lib/schema"

// Import service areas data
import { serviceAreas } from "@/data/service-areas"

// Import FAQ data
import { faqItems } from "@/data/faq-items"

// Import testimonials data
import { testimonialsData } from "@/components/Testimonials"

interface SchemaMarkupProps {
  page?: "home" | "service" | "contact" | "testimonials"
  serviceName?: string
  serviceDescription?: string
  servicePrice?: string
  serviceImage?: string
}

export default function SchemaMarkup({
  page = "home",
  serviceName,
  serviceDescription,
  servicePrice,
  serviceImage,
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
      // Add service schemas for main services
      const services = [
        {
          name: "Garage Door Repair",
          description:
            "Professional garage door repair services for all makes and models. Fast, reliable service with a satisfaction guarantee.",
          price: "89.00",
          image: "https://palmtreegaragedoor.com/images/services/door-repair.png",
        },
        {
          name: "Spring Replacement",
          description:
            "Expert garage door spring replacement services. We use high-quality springs rated for 10,000+ cycles for lasting performance.",
          price: "175.00",
          image: "https://palmtreegaragedoor.com/images/services/spring-replacement.png",
        },
        {
          name: "Opener Repair",
          description:
            "Garage door opener repair and replacement services for all major brands. Fast diagnosis and affordable solutions.",
          price: "95.00",
          image: "https://palmtreegaragedoor.com/images/services/opener-repair.png",
        },
        {
          name: "New Installation",
          description:
            "Professional garage door installation services. Wide selection of styles, materials, and features to match your home.",
          price: "900.00",
          image: "https://palmtreegaragedoor.com/images/services/new-installation.png",
        },
      ]

      services.forEach((service) => {
        schemas.push(
          generateServiceSchema(service.name, service.description, service.price, service.image, serviceAreas),
        )
      })

      // Add FAQ schema
      schemas.push(generateFAQSchema(faqItems))
    } else if (page === "service" && serviceName && serviceDescription && servicePrice && serviceImage) {
      // Add specific service schema
      schemas.push(generateServiceSchema(serviceName, serviceDescription, servicePrice, serviceImage, serviceAreas))
    }

    return schemas
  }

  return (
    <>
      {generateSchema().map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
