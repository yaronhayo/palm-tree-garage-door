import Script from "next/script"

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://garagedoorspringsrepairfl.com",
    name: "Palm Tree Garage Door Repair",
    alternateName: "Palm Tree Garage Door",
    description:
      "Professional garage door repair and installation services for residential and commercial properties in South Florida. Available 24/7 for all your garage door needs.",
    url: "https://garagedoorspringsrepairfl.com",
    logo: "https://garagedoorspringsrepairfl.com/logo.png",
    image: "https://garagedoorspringsrepairfl.com/images/og-cover.webp",
    telephone: "(772) 275-3721",
    email: "support@garagedoorspringsrepairfl.com",
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
      addressLocality: "Miami",
      addressRegion: "FL",
      postalCode: "33101",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.7617,
      longitude: -80.1918,
    },
    areaServed: [
      {
        "@type": "GeoCircle",
        name: "Miami-Dade County",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 25.7617,
          longitude: -80.1918,
        },
        geoRadius: "50000",
      },
      {
        "@type": "GeoCircle",
        name: "Broward County",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 26.1224,
          longitude: -80.1373,
        },
        geoRadius: "50000",
      },
      {
        "@type": "GeoCircle",
        name: "Palm Beach County",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 26.7056,
          longitude: -80.0364,
        },
        geoRadius: "50000",
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
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
