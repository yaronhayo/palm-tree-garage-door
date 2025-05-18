"use client"

import { useEffect } from "react"
import { initPerformanceMonitoring, reportPerformanceMetrics } from "@/lib/performance"

interface PerformanceMonitorProps {
  reportingEndpoint?: string
  reportingInterval?: number
  debug?: boolean
}

export default function PerformanceMonitor({
  reportingEndpoint,
  reportingInterval = 60000, // Default: report every minute
  debug = false,
}: PerformanceMonitorProps) {
  useEffect(() => {
    // Only run in production unless debug is true
    if (process.env.NODE_ENV !== "production" && !debug) return

    // Initialize performance monitoring
    initPerformanceMonitoring()

    // Set up periodic reporting
    const intervalId = setInterval(() => {
      reportPerformanceMetrics(reportingEndpoint)
    }, reportingInterval)

    // Initial report after 5 seconds
    const initialReportTimeout = setTimeout(() => {
      reportPerformanceMetrics(reportingEndpoint)
    }, 5000)

    // Clean up
    return () => {
      clearInterval(intervalId)
      clearTimeout(initialReportTimeout)
    }
  }, [reportingEndpoint, reportingInterval, debug])

  // This component doesn't render anything
  return null
}
