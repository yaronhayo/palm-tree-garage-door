/**
 * Schema.org markup utilities
 */

import type { Testimonial } from "@/types"

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema(serviceAreas: { name: string; slug: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Palm Tree Garage Door",
    image: "https://palmtreegaragedoor.com/logo.png",
    "@id": "https://palmtreegaragedoor.com",
    url: "https://palmtreegaragedoor.com",
    telephone: "(321) 366-9723",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Palm Avenue",
      addressLocality: "Fort Lauderdale",
      addressRegion: "FL",
      postalCode: "33301",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.1224,
      longitude: -80.1373,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    sameAs: ["https://www.facebook.com/palmtreegaragedoor", "https://www.instagram.com/palmtreegaragedoor"],
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.name,
      "@id": `https://palmtreegaragedoor.com/service-areas/${area.slug}`,
    })),
  }
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(
  name: string,
  description: string,
  price: string,
  image: string,
  serviceAreas: { name: string; slug: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: "Palm Tree Garage Door",
      "@id": "https://palmtreegaragedoor.com",
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.name,
    })),
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
    },
    image,
  }
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
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

/**
 * Generate Review schema for a single testimonial
 */
export function generateReviewSchema(testimonial: Testimonial) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "Palm Tree Garage Door",
      image: "https://palmtreegaragedoor.com/logo.png",
      url: "https://palmtreegaragedoor.com",
    },
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: testimonial.date || new Date().toISOString().split("T")[0],
    reviewBody: testimonial.quote,
  }
}

/**
 * Generate AggregateRating schema for all testimonials
 */
export function generateAggregateRatingSchema(testimonials: Testimonial[]) {
  // Calculate average rating
  const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0)
  const averageRating = totalRating / testimonials.length

  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "Palm Tree Garage Door",
      image: "https://palmtreegaragedoor.com/logo.png",
      url: "https://palmtreegaragedoor.com",
    },
    ratingValue: Number(averageRating.toFixed(1)),
    bestRating: 5,
    worstRating: 1,
    ratingCount: testimonials.length,
    reviewCount: testimonials.length,
  }
}
