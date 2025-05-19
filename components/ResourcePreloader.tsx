"use client"

import { useEffect } from "react"
import Head from "next/head"

// List of critical resources to preload
const criticalResources = [
  { type: "image", url: "/logo.png" },
  { type: "image", url: "/images/garage-door-repair-service.png" },
  { type: "font", url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
]

// List of domains to preconnect to
const preconnectDomains = [
  "https://res.cloudinary.com",
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
]

export default function ResourcePreloader() {
  useEffect(() => {
    // Preload images after critical content is loaded
    const timer = setTimeout(() => {
      const preloadImages = [
        "/images/services/door-repair.png",
        "/images/services/spring-replacement.png",
        "/images/services/opener-repair.png",
        "/images/services/new-installation.png",
      ]

      preloadImages.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }, 1000) // Delay non-critical preloads

    return () => clearTimeout(timer)
  }, [])

  return (
    <Head>
      {/* Preconnect to important domains */}
      {preconnectDomains.map((domain, index) => (
        <link key={`preconnect-${index}`} rel="preconnect" href={domain} crossOrigin="anonymous" />
      ))}

      {/* Preload critical resources */}
      {criticalResources.map((resource, index) => {
        if (resource.type === "image") {
          return (
            <link
              key={`preload-${index}`}
              rel="preload"
              href={resource.url}
              as="image"
              type={resource.url.endsWith(".png") ? "image/png" : "image/jpeg"}
            />
          )
        } else if (resource.type === "font") {
          return <link key={`preload-${index}`} rel="preload" href={resource.url} as="style" />
        }
        return null
      })}
    </Head>
  )
}
