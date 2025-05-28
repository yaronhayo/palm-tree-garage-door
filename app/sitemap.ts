import type { MetadataRoute } from "next"
import { serviceAreas } from "@/data/service-areas"

// Force static generation for this route
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || "https://garagedoorspringsrepairfl.com"
  const currentDate = new Date()

  // Base pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ]

  // Add service area pages
  serviceAreas.forEach((area) => {
    routes.push({
      url: `${baseUrl}/service-areas/${area.city.toLowerCase().replace(/\s+/g, "-")}-${area.state.toLowerCase()}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  })

  // Add service pages
  const services = [
    "garage-door-repair",
    "garage-door-installation",
    "garage-door-spring-replacement",
    "garage-door-opener-repair",
    "garage-door-panel-replacement",
    "garage-door-off-track-repair",
  ]

  services.forEach((service) => {
    routes.push({
      url: `${baseUrl}/services/${service}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })
  })

  return routes
}
