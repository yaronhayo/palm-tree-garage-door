"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface GoogleTagManagerProps {
  gtmId: string
}

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (typeof window === "undefined") return

    // Send pageview with path and search
    window.dataLayer.push({
      event: "page_view",
      page: {
        path: pathname,
        title: document.title,
        search: searchParams?.toString() || "",
        url: window.location.href,
      },
    })

    // Log for debugging
    console.log(`[GTM] Page view tracked: ${pathname}${searchParams ? `?${searchParams}` : ""}`)
  }, [pathname, searchParams])

  // Support for enhanced conversions
  useEffect(() => {
    if (typeof window === "undefined") return

    // Add support for enhanced conversions
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    })

    // Log GTM initialization
    console.log(`[GTM] Initialized with ID: ${gtmId}`)
  }, [gtmId])

  return null
}
