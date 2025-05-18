import Script from "next/script"

interface ServiceSchemaProps {
  serviceName: string
  serviceDescription: string
  location?: string
  price?: {
    amount: string
    currency: string
    description: string
  }
  image?: string
}

export default function ServiceSchema({
  serviceName,
  serviceDescription,
  location = "South Florida",
  price,
  image = "/images/garage-door-repair-service.png",
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: location ? `${serviceName} in ${location}` : serviceName,
    description: serviceDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Palm Tree Garage Door Repair",
      telephone: "(321) 366-9723",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Palm Avenue",
        addressLocality: "Orlando",
        addressRegion: "FL",
        postalCode: "32801",
        addressCountry: "US",
      },
    },
    areaServed: location,
    image: image,
    offers: price
      ? {
          "@type": "Offer",
          price: price.amount,
          priceCurrency: price.currency,
          description: price.description,
          availability: "https://schema.org/InStock",
          url: "https://palmtreegaragedoor.com/services",
        }
      : undefined,
    serviceType: "Garage Door Service",
  }

  return (
    <Script
      id={`service-schema-${serviceName.toLowerCase().replace(/\s+/g, "-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
