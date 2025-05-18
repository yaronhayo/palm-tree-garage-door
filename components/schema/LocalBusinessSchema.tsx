import Script from "next/script"

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://palmtreegaragedoor.com",
    name: "Palm Tree Garage Door Repair",
    alternateName: "Palm Tree Garage Door",
    description:
      "Professional garage door repair and installation services for residential and commercial properties in South Florida. Available 24/7 for all your garage door needs.",
    url: "https://palmtreegaragedoor.com",
    logo: "https://palmtreegaragedoor.com/logo.png",
    image: "https://palmtreegaragedoor.com/images/og-cover.webp",
    telephone: "(321) 366-9723",
    email: "info@palmtreegaragedoor.com",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Palm Avenue",
      addressLocality: "Orlando",
      addressRegion: "FL",
      postalCode: "32801",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5383,
      longitude: -81.3792,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Orlando",
      },
      {
        "@type": "City",
        name: "Kissimmee",
      },
      {
        "@type": "City",
        name: "Winter Park",
      },
      {
        "@type": "City",
        name: "Sanford",
      },
      {
        "@type": "City",
        name: "Lake Mary",
      },
    ],
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
            name: "Garage Door Repair",
            description: "Professional repair services for all types of garage doors.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Spring Replacement",
            description: "Fast and reliable garage door spring replacement services.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Garage Door Installation",
            description: "Professional installation of new garage doors.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Opener Repair & Installation",
            description: "Repair and installation services for garage door openers.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "24/7 Emergency Service",
            description: "Emergency garage door repair services available 24/7.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
    },
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
