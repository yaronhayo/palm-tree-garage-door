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
        event: "pageView",
        page: {
          url: window.location.href,
          title: document.title,
        },
      })

      // Log GTM initialization
      console.log("Google Tag Manager dataLayer initialized with ID:", gtmId)
    }
  }, [gtmId])

  return null
}
