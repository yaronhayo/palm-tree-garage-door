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

      // Log GTM initialization
      console.log("Google Tag Manager initialized with ID:", gtmId)
    }
  }, [gtmId])

  return null
}
