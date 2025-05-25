"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { trackEvent, GA_CATEGORIES, GA_EVENTS } from "@/lib/analytics"

export function useServiceAreaTracking() {
  const pathname = usePathname()
  const [serviceArea, setServiceArea] = useState<string | null>(null)

  useEffect(() => {
    // Extract service area from URL if present
    const extractServiceArea = () => {
      if (!pathname) return null

      // Check for service area in pathname
      const serviceAreas = [
        "delray-beach",
        "boca-raton",
        "coral-springs",
        "plantation",
        "fort-lauderdale",
        "pompano-beach",
      ]

      for (const area of serviceAreas) {
        if (pathname.includes(area)) {
          return area.replace("-", " ")
        }
      }

      return null
    }

    const area = extractServiceArea()
    if (area && area !== serviceArea) {
      setServiceArea(area)

      // Track service area view
      trackEvent({
        action: GA_EVENTS.VIEW,
        category: GA_CATEGORIES.ENGAGEMENT,
        label: `service_area_view`,
        service_area: area,
      })
    }
  }, [pathname, serviceArea])

  return serviceArea
}
