"use client"

import { useEffect } from "react"
import { initPerformanceMonitoring } from "@/lib/performance-monitoring"

/**
 * Hook to initialize performance monitoring with Speed Insights
 */
export function useSpeedInsights() {
  useEffect(() => {
    // Initialize performance monitoring
    initPerformanceMonitoring()

    // Log initialization in development
    if (process.env.NODE_ENV === "development") {
      console.log("Speed Insights monitoring initialized")
    }

    return () => {
      // Cleanup if needed
      if (process.env.NODE_ENV === "development") {
        console.log("Speed Insights monitoring cleanup")
      }
    }
  }, [])
}

export default useSpeedInsights
