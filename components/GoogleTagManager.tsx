"use client"

import { useEffect } from "react"

interface GoogleTagManagerProps {
  gtmId: string
}

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []

      // Push a page view event to dataLayer
      window.dataLayer.push({
        event: "pageview",
        page: {
          path: window.location.pathname,
          title: document.title,
          search: window.location.search,
        },
      })

      // Log GTM initialization for debugging
      console.log("Google Tag Manager initialized with ID:", gtmId)
    }
  }, [gtmId])

  // Listen for route changes in Next.js
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleRouteChange = (url: string) => {
        // Push page view event to dataLayer on route change
        window.dataLayer.push({
          event: "pageview",
          page: {
            path: url,
            title: document.title,
          },
        })
      }

      // Add event listener for route changes
      document.addEventListener("routeChangeComplete", handleRouteChange as any)

      return () => {
        document.removeEventListener("routeChangeComplete", handleRouteChange as any)
      }
    }
  }, [])

  return null
}
