"use client"

import { useEffect } from "react"
import { initGTM, cleanGtmId, isPlaceholderGtmId } from "@/lib/analytics"

interface GoogleTagManagerProps {
  gtmId: string
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  useEffect(() => {
    // Clean up and validate the GTM ID
    const cleanedId = cleanGtmId(gtmId || "")

    // Skip loading in development if using placeholder
    if (isPlaceholderGtmId(cleanedId)) {
      console.info("Skipping GTM initialization with placeholder ID")
      return
    }

    // Initialize GTM with the cleaned ID
    initGTM(cleanedId)
  }, [gtmId])

  // This component doesn't render anything visible
  return null
}
