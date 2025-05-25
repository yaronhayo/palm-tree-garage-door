"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/analytics"

export function useVercelAnalytics() {
  useEffect(() => {
    // Track page view on mount
    trackEvent({
      action: "page_view",
      category: "navigation",
      label: window.location.pathname,
    })
  }, [])
}
