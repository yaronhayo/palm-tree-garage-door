// Remove the import and implement inline
const measurePerformance = (metricName: string, value: number) => {
  if (typeof window !== "undefined" && window.performance) {
    try {
      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.debug(`Performance metric - ${metricName}:`, value)
      }

      // Send to analytics
      if (window.gtag) {
        window.gtag("event", "timing_complete", {
          name: metricName,
          value: Math.round(value),
          event_category: "Performance",
        })
      }
    } catch (error) {
      console.error("Error measuring performance:", error)
    }
  }
}

/**
 * Reports Core Web Vitals to analytics
 *
 * @param metric Web Vital metric to report
 */
export function reportWebVitals(metric: any) {
  // Skip if dataLayer is not available
  if (typeof window === "undefined" || !window.dataLayer) return

  // Report to Google Analytics via dataLayer
  window.dataLayer.push({
    event: "web-vitals",
    event_category: "Web Vitals",
    event_action: metric.name,
    event_value: Math.round(metric.value),
    event_label: metric.id,
    non_interaction: true,
  })
}

/**
 * Initializes performance monitoring
 */
export function initPerformanceMonitoring() {
  if (typeof window === "undefined") return

  // Use the web-vitals library when available
  if ("connection" in navigator) {
    // Add connection information to dataLayer
    const connection = (navigator as any).connection
    if (connection) {
      window.dataLayer.push({
        event: "connection-info",
        effectiveType: connection.effectiveType,
        saveData: connection.saveData,
        rtt: connection.rtt,
        downlink: connection.downlink,
      })
    }
  }

  // Add visibility change listener to track user engagement
  document.addEventListener("visibilitychange", () => {
    window.dataLayer.push({
      event: "visibility-change",
      visibilityState: document.visibilityState,
    })
  })
}
