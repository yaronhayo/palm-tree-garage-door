import Script from "next/script"

interface EnhancedLocalBusinessSchemaProps {
  location?: string
  serviceArea?: string[]
  aggregateRating?: {
    ratingValue: string
    reviewCount: string
  }
}

export default function EnhancedLocalBusinessSchema({
  location = "South Florida",
  serviceArea = ["Orlando", "Kissimmee", "Winter Park", "Sanford", "Lake Mary"],
  aggregateRating = {
    ratingValue: "4.9",
    reviewCount: "150",
  },
}: EnhancedLocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://palmtreegaragedoor.com",
    name: "Palm Tree Garage Door Repair",
    alternateName: "Palm Tree Garage Door",
    description: `Professional garage door repair and installation services for residential and commercial properties in ${location}. Available 24/7 for all your garage door needs.`,
    url: "https://palmtreegaragedoor.com",
    logo: "https://palmtreegaragedoor.com/logo.png",
    image: "https://palmtreegaragedoor.com/images/og-cover.webp",
    telephone: "(321) 366-9723",
    email: "info@palmtreegaragedoor.com",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card, Check",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Palm Avenue",
      addressLocality: location === "South Florida" ? "Orlando" : location,
      addressRegion: "FL",
      postalCode: "32801",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5383,
      longitude: -81.3792,
    },
    areaServed: serviceArea.map((area) => ({
      "@type": "City",
      name: area,
    })),
    sameAs: [
      "https://www.facebook.com/palmtreegaragedoor",
      "https://www.instagram.com/palmtreegaragedoor",
      "https://twitter.com/palmtreegdoor",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garage Door Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Emergency Garage Door Repair",
            description: "24/7 emergency repair services for all types of garage doors with fast response times.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "89.00",
            priceCurrency: "USD",
            description: "Starting price for emergency service call",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Spring Replacement",
            description: "Fast and reliable garage door spring replacement services with warranty.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "150.00",
            priceCurrency: "USD",
            description: "Starting price for spring replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Garage Door Installation",
            description: "Professional installation of new garage doors with a variety of styles and materials.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "750.00",
            priceCurrency: "USD",
            description: "Starting price for basic garage door installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Opener Repair & Installation",
            description: "Repair and installation services for all major brands of garage door openers.",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "125.00",
            priceCurrency: "USD",
            description: "Starting price for opener repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "24/7 Emergency Service",
            description: "Emergency garage door repair services available 24/7 with fast response times.",
          },
        },
      ],
    },
    aggregateRating: aggregateRating,
    potentialAction: {
      "@type": "ReservationAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://palmtreegaragedoor.com/#booking",
        inLanguage: "en-US",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Book Garage Door Service",
      },
    },
  }

  return (
    <Script
      id="enhanced-local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
