import Script from "next/script"
import { serviceAreas } from "@/data/service-areas"

export default function ServiceAreaSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Garage Door Repair and Installation Services",
    provider: {
      "@type": "LocalBusiness",
      name: "Palm Tree Garage Door Repair",
      telephone: "(321) 366-9723",
      image: "https://palmtreegaragedoor.com/logo.png",
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.city,
      address: {
        "@type": "PostalAddress",
        addressRegion: area.state,
        postalCode: area.zipCodes.join(", "),
      },
    })),
    serviceType: [
      "Garage Door Repair",
      "Garage Door Installation",
      "Spring Replacement",
      "Opener Repair",
      "Emergency Garage Door Service",
    ],
  }

  return (
    <Script
      id="service-area-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
