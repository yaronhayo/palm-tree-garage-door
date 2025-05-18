// Target keywords for garage door repair
export const primaryKeywords = [
  "garage door repair",
  "garage door service",
  "broken garage door",
  "garage door installation",
  "garage door spring repair",
  "garage door opener repair",
  "emergency garage door repair",
  "garage door off track",
  "garage door panel replacement",
  "commercial garage door repair",
]

export const secondaryKeywords = [
  "garage door maintenance",
  "garage door tune-up",
  "garage door cable repair",
  "garage door sensor repair",
  "garage door remote programming",
  "garage door noise repair",
  "garage door won't open",
  "garage door won't close",
  "garage door stuck",
  "garage door company near me",
]

export const localKeywords = [
  "garage door repair near me",
  "local garage door repair",
  "garage door repair company",
  "best garage door repair",
  "affordable garage door repair",
  "same day garage door repair",
  "24/7 garage door repair",
  "emergency garage door service",
  "garage door repair cost",
  "garage door repair estimate",
]

// Generate SEO-friendly title
export function generateSEOTitle(service: string, location?: string): string {
  if (location) {
    return `${service} in ${location} | Palm Tree Garage Door Repair`
  }
  return `${service} | Professional & Reliable | Palm Tree Garage Door Repair`
}

// Generate SEO-friendly description
export function generateSEODescription(service: string, location?: string): string {
  const baseDescription = `Professional ${service.toLowerCase()} services with same-day appointments, 24/7 emergency repairs, and free estimates. Licensed and insured technicians.`

  if (location) {
    return `${baseDescription} Serving ${location} and surrounding areas.`
  }

  return baseDescription
}

// Generate schema markup data
export function generateSchemaData(service: string, location?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: location ? `${service} in ${location}` : service,
    provider: {
      "@type": "LocalBusiness",
      name: "Palm Tree Garage Door Repair",
      telephone: "+1234567890",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Main Street",
        addressLocality: location || "Your City",
        addressRegion: "State",
        postalCode: "12345",
        addressCountry: "US",
      },
    },
    areaServed: location || "Local Area",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garage Door Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
          },
        },
      ],
    },
  }
}
