"use client"

import { useEffect } from "react"

interface GoogleTagManagerProps {
  gtmId: string
}

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []

      // Push a page view event to dataLayer for GTM
      window.dataLayer.push({
        event: "pageview",
        page: {
          path: window.location.pathname,
          title: document.title,
          search: window.location.search,
        },
      })

      // Also send pageview to Google Analytics via gtag
      if (window.gtag) {
        window.gtag("event", "page_view", {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname,
        })
      }

      // Log initialization for debugging
      console.log("Google Tag Manager initialized with ID:", gtmId)
      console.log("Google Analytics initialized with ID: G-RKH53HHRHD")
    }
  }, [gtmId])

  // Listen for route changes in Next.js
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleRouteChange = (url: string) => {
        // Push page view event to dataLayer on route change (GTM)
        window.dataLayer.push({
          event: "pageview",
          page: {
            path: url,
            title: document.title,
          },
        })

        // Send pageview to Google Analytics via gtag
        if (window.gtag) {
          window.gtag("event", "page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: url,
          })
        }
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
