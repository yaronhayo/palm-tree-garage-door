"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackPageView } from "@/lib/analytics-events"

export function useVercelAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isAnalyticsLoaded, setIsAnalyticsLoaded] = useState(false)

  // Check if Vercel Analytics is loaded
  useEffect(() => {
    const checkAnalytics = () => {
      if (typeof window !== "undefined" && window.va) {
        setIsAnalyticsLoaded(true)
        return true
      }
      return false
    }

    // Check immediately
    if (checkAnalytics()) return

    // If not loaded, check again after a delay
    const interval = setInterval(() => {
      if (checkAnalytics()) {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Track page views
  useEffect(() => {
    if (isAnalyticsLoaded) {
      // Combine pathname and search params
      const url = searchParams.size > 0 ? `${pathname}?${searchParams.toString()}` : pathname

      // Track the page view
      trackPageView(url)
    }
  }, [pathname, searchParams, isAnalyticsLoaded])

  return { isAnalyticsLoaded }
}
