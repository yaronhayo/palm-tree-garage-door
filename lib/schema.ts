/**
 * Schema Utility Functions
 *
 * These functions generate JSON-LD schema markup for SEO.
 * They are used by the SchemaMarkup component to add structured data to pages.
 *
 * @export - These functions use named exports as they are utility functions
 */

import type { ServiceArea } from "@/data/service-areas"
import type { FAQItem } from "@/data/faq-items"
import type { Testimonial } from "@/components/Testimonials"

// Company information
const COMPANY_NAME = "Palm Tree Garage Door"
const COMPANY_LEGAL_NAME = "Palm Tree Garage Door LLC"
const COMPANY_URL = "https://palmtreegaragedoor.com"
const COMPANY_LOGO = "https://palmtreegaragedoor.com/logo.png"
const COMPANY_EMAIL = "info@palmtreegaragedoor.com"
const COMPANY_PHONE = "+1-954-864-2525"
const COMPANY_DESCRIPTION =
  "Palm Tree Garage Door provides professional garage door repair, installation, and maintenance services in South Florida. We offer 24/7 emergency service, free estimates, and guaranteed workmanship."
const COMPANY_FOUNDING_DATE = "2018-01-01"
const COMPANY_SOCIAL = {
  facebook: "https://facebook.com/palmtreegaragedoor",
  instagram: "https://instagram.com/palmtreegaragedoor",
  twitter: "https://twitter.com/palmtreegdoor",
}

// Generate LocalBusiness schema
export function generateLocalBusinessSchema(serviceAreas: ServiceArea[]) {
  // Get the main service area (first in the list)
  const mainArea = serviceAreas[0]

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${COMPANY_URL}/#organization`,
    name: COMPANY_NAME,
    legalName: COMPANY_LEGAL_NAME,
    url: COMPANY_URL,
    logo: COMPANY_LOGO,
    image: COMPANY_LOGO,
    description: COMPANY_DESCRIPTION,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    foundingDate: COMPANY_FOUNDING_DATE,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garage Door Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Garage Door Repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Spring Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Opener Repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "New Installation",
          },
        },
      ],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: mainArea.address || "123 Palm Tree Way",
      addressLocality: mainArea.city,
      addressRegion: "FL",
      postalCode: mainArea.zipCode || "33301",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: mainArea.latitude || 26.1224,
      longitude: mainArea.longitude || -80.1373,
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.city,
      "@id": `${COMPANY_URL}/service-areas#${area.city.toLowerCase().replace(/\s+/g, "-")}`,
    })),
    sameAs: [COMPANY_SOCIAL.facebook, COMPANY_SOCIAL.instagram, COMPANY_SOCIAL.twitter],
  }
}

// Generate Service schema
export function generateServiceSchema(
  name: string,
  description: string,
  price: string,
  image: string,
  serviceAreas: ServiceArea[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${name} - ${COMPANY_NAME}`,
    description: description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY_NAME,
      url: COMPANY_URL,
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.city,
    })),
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
    },
    image: image,
    url: `${COMPANY_URL}/services/${name.toLowerCase().replace(/\s+/g, "-")}`,
  }
}

// Generate FAQ schema
export function generateFAQSchema(faqItems: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

// Generate Review schema
export function generateReviewSchema(testimonial: Testimonial) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY_NAME,
      url: COMPANY_URL,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    reviewBody: testimonial.text,
    datePublished: testimonial.date,
  }
}

// Generate AggregateRating schema
export function generateAggregateRatingSchema(testimonials: Testimonial[]) {
  // Calculate average rating
  const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0)
  const averageRating = (totalRating / testimonials.length).toFixed(1)

  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY_NAME,
      url: COMPANY_URL,
    },
    ratingValue: averageRating,
    bestRating: "5",
    worstRating: "1",
    ratingCount: testimonials.length,
  }
}

// Generate BreadcrumbList schema
export function generateBreadcrumbListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
