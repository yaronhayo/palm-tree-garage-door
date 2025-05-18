"use client"

import { useEffect } from "react"

// List of critical resources to preload
const criticalResources = [
  // Hero section image
  { url: "/images/service-truck.png", type: "image" },

  // Service images (first 2 are most important)
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9140.JPG-zZvo0fWK5tefuFBOFyW6pc5KGYaHwR.jpeg",
    type: "image",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9142.JPG-eOeOz7t0rhU5GzYTwLLD8nCYNZW0V9.jpeg",
    type: "image",
  },

  // Logo
  { url: "/logo.png", type: "image" },

  // Fallback image
  { url: "/placeholder.png", type: "image" },
]

export default function ResourcePreloader() {
  useEffect(() => {
    // Only preload in production or if not on a slow connection
    if (
      process.env.NODE_ENV !== "production" ||
      (navigator.connection &&
        (navigator.connection.saveData ||
          (navigator.connection.effectiveType && navigator.connection.effectiveType.includes("2g"))))
    ) {
      return
    }

    // Check if the browser supports requestIdleCallback
    const requestIdleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))

    // Preload resources during browser idle time
    requestIdleCallback(() => {
      criticalResources.forEach((resource) => {
        if (resource.type === "image") {
          const img = new Image()
          img.src = resource.url
        }
      })
    })
  }, [])

  // This component doesn't render anything
  return null
}
