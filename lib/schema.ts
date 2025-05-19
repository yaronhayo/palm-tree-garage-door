import type { ServiceArea, Testimonial } from "@/types"

// Define types for our schema objects
export interface LocalBusinessSchema {
  "@context": string
  "@type": string
  "@id": string
  name: string
  url: string
  logo: {
    "@type": string
    url: string
  }
  image: string[]
  description: string
  address: {
    "@type": string
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    "@type": string
    latitude: number
    longitude: number
  }
  telephone: string
  email: string
  priceRange: string
  openingHoursSpecification: Array<{
    "@type": string
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
  sameAs: string[]
  areaServed: Array<{
    "@type": string
    name: string
  }>
  serviceArea?: {
    "@type": string
    name: string
    hasOfferCatalog: {
      "@type": string
      name: string
      itemListElement: Array<{
        "@type": string
        name: string
      }>
    }
  }
}

export interface ServiceSchema {
  "@context": string
  "@type": string
  serviceType: string
  provider: {
    "@type": string
    name: string
    url: string
  }
  areaServed: Array<{
    "@type": string
    name: string
  }>
  description: string
  offers: {
    "@type": string
    price: string
    priceCurrency: string
    priceValidUntil: string
    availability: string
  }
  image: string
}

export interface ReviewSchema {
  "@context": string
  "@type": string
  itemReviewed: {
    "@type": string
    name: string
    image: string
    url: string
  }
  author: {
    "@type": string
    name: string
  }
  reviewRating: {
    "@type": string
    ratingValue: number
    bestRating: number
    worstRating: number
  }
  datePublished: string
  reviewBody: string
}

export interface AggregateRatingSchema {
  "@context": string
  "@type": string
  itemReviewed: {
    "@type": string
    name: string
    image: string
    url: string
  }
  ratingValue: number
  bestRating: number
  worstRating: number
  ratingCount: number
  reviewCount: number
}

// Business information constants
const BUSINESS_NAME = "Palm Tree Garage Door Repair"
const BUSINESS_URL = "https://palmtreegaragedoor.com"
const BUSINESS_LOGO = "https://palmtreegaragedoor.com/logo.png"
const BUSINESS_DESCRIPTION =
  "Professional garage door repair and installation services in South Florida. 24/7 emergency service, free estimates, and expert technicians."
const BUSINESS_PHONE = "+13213669723"
const BUSINESS_EMAIL = "info@palmtreegaragedoor.com"
const BUSINESS_ADDRESS = {
  street: "123 Palm Avenue",
  city: "Fort Lauderdale",
  region: "FL",
  postalCode: "33301",
  country: "US",
}
const BUSINESS_GEO = {
  latitude: 26.1224,
  longitude: -80.1373,
}
const BUSINESS_HOURS = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  {
    days: ["Saturday"],
    opens: "09:00",
    closes: "16:00",
  },
  {
    days: ["Sunday"],
    opens: "10:00",
    closes: "14:00",
  },
]
const BUSINESS_SOCIAL = [
  "https://www.facebook.com/palmtreegaragedoor",
  "https://www.instagram.com/palmtreegaragedoor",
  "https://twitter.com/palmtreegarage",
]

// Generate LocalBusiness schema
export function generateLocalBusinessSchema(serviceAreas: ServiceArea[]): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${BUSINESS_URL}/#organization`,
    name: BUSINESS_NAME,
    url: BUSINESS_URL,
    logo: {
      "@type": "ImageObject",
      url: BUSINESS_LOGO,
    },
    image: [
      `${BUSINESS_URL}/images/garage-door-repair-service.png`,
      `${BUSINESS_URL}/images/service-truck.png`,
      `${BUSINESS_URL}/logo.png`,
    ],
    description: BUSINESS_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_ADDRESS.street,
      addressLocality: BUSINESS_ADDRESS.city,
      addressRegion: BUSINESS_ADDRESS.region,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS_GEO.latitude,
      longitude: BUSINESS_GEO.longitude,
    },
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: "$$",
    openingHoursSpecification: BUSINESS_HOURS.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: BUSINESS_SOCIAL,
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.name,
    })),
    serviceArea: {
      "@type": "GeoCircle",
      name: "South Florida",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Garage Door Services",
        itemListElement: [
          { "@type": "Offer", name: "Garage Door Repair" },
          { "@type": "Offer", name: "Spring Replacement" },
          { "@type": "Offer", name: "Opener Repair" },
          { "@type": "Offer", name: "New Installation" },
        ],
      },
    },
  }
}

// Generate Service schema for a specific service
export function generateServiceSchema(
  serviceType: string,
  description: string,
  price: string,
  imageUrl: string,
  serviceAreas: ServiceArea[],
): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS_NAME,
      url: BUSINESS_URL,
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.name,
    })),
    description,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: "USD",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
    },
    image: imageUrl,
  }
}

// Generate FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
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

// Generate Review schema for a single testimonial
export function generateReviewSchema(testimonial: Testimonial): ReviewSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS_NAME,
      image: BUSINESS_LOGO,
      url: BUSINESS_URL,
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

// Generate AggregateRating schema for all testimonials
export function generateAggregateRatingSchema(testimonials: Testimonial[]): AggregateRatingSchema {
  // Calculate average rating
  const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0)
  const averageRating = totalRating / testimonials.length

  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS_NAME,
      image: BUSINESS_LOGO,
      url: BUSINESS_URL,
    },
    ratingValue: Number.parseFloat(averageRating.toFixed(1)),
    bestRating: 5,
    worstRating: 1,
    ratingCount: testimonials.length,
    reviewCount: testimonials.length,
  }
}
