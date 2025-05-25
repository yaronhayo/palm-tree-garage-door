"use client"

import { useEffect } from "react"

export function useSpeedInsights() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== "undefined" && "performance" in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Log performance metrics
            console.debug("Performance metric:", {
              name: entry.name,
              value: entry.startTime,
              type: entry.entryType,
            })
          }
        })

        observer.observe({ entryTypes: ["navigation", "resource", "paint"] })

        return () => observer.disconnect()
      } catch (error) {
        console.error("Performance monitoring error:", error)
      }
    }
  }, [])
}
