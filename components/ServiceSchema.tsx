import Script from "next/script"

interface ServiceSchemaProps {
  name: string
  description: string
  imageUrl: string
  areaServed: string
  provider: string
}

export default function ServiceSchema({ name, description, imageUrl, areaServed, provider }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "LocalBusiness",
      name: provider,
      image: "https://palmtreegaragedoor.com/logo.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Orlando",
        addressRegion: "FL",
        postalCode: "32801",
        addressCountry: "US",
      },
      telephone: "(321) 366-9723",
    },
    areaServed: {
      "@type": "GeoCircle",
      name: areaServed,
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 28.5383,
        longitude: -81.3792,
      },
      geoRadius: "50000",
    },
    image: imageUrl,
  }

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
