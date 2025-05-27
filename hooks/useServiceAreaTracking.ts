"use client"

import { useEffect, useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import { trackEvent, GA_CATEGORIES, GA_EVENTS } from "@/lib/analytics"

export function useServiceAreaTracking() {
  const pathname = usePathname()
  const [serviceArea, setServiceAreaState] = useState<string | null>(null)

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
      setServiceAreaState(area)

      // Track service area view
      trackEvent({
        action: GA_EVENTS.VIEW,
        category: GA_CATEGORIES.ENGAGEMENT,
        label: `service_area_view`,
        service_area: area,
      })
    }
  }, [pathname, serviceArea])

  // Method to manually set service area
  const setServiceArea = useCallback((city: string, zipCode?: string) => {
    if (city) {
      const formattedArea = city.toLowerCase().replace(/\s+/g, "-")
      setServiceAreaState(formattedArea)

      // Track service area update
      trackEvent({
        action: GA_EVENTS.VIEW,
        category: GA_CATEGORIES.ENGAGEMENT,
        label: `service_area_update`,
        service_area: formattedArea,
        zip_code: zipCode,
      })
    }
  }, [])

  // Method to track form submission with service area
  const trackFormWithServiceArea = useCallback(
    (formType: string, formData: any) => {
      trackEvent({
        action: GA_EVENTS.FORM_SUBMIT,
        category: GA_CATEGORIES.FORM,
        label: formType,
        service_area: serviceArea,
        ...formData,
      })
    },
    [serviceArea],
  )

  return {
    serviceArea,
    setServiceArea,
    trackFormWithServiceArea,
  }
}
