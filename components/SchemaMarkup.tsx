"use client"

import Script from "next/script"

interface SchemaMarkupProps {
  page?: string
}

export default function SchemaMarkup({ page = "home" }: SchemaMarkupProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Palm Tree Garage Door",
    description:
      "Professional garage door repair and installation services in South Florida. 24/7 emergency service, free estimates, and expert technicians.",
    url: "https://palmtreegaragedoor.com",
    telephone: "+1-561-123-4567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Delray Beach",
      addressRegion: "FL",
      postalCode: "33444",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.4614625,
      longitude: -80.0728201,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    image: "https://palmtreegaragedoor.com/logo.png",
    sameAs: ["https://www.facebook.com/palmtreegaragedoor", "https://twitter.com/palmtreegaragedoor"],
  }

  const pageSpecificSchema = {
    home: {
      ...baseSchema,
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 26.4614625,
          longitude: -80.0728201,
        },
        geoRadius: "50000",
      },
    },
    services: {
      ...baseSchema,
      "@type": "Service",
      serviceType: "Garage Door Repair and Installation",
      areaServed: {
        "@type": "State",
        name: "Florida",
      },
    },
    testimonials: {
      ...baseSchema,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "150",
      },
    },
  }

  const schema = pageSpecificSchema[page as keyof typeof pageSpecificSchema] || baseSchema

  return (
    <Script
      id={`schema-${page}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}
