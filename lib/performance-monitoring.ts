// Performance monitoring utilities

/**
 * Reports Web Vitals metrics to analytics
 */
export function reportWebVitals(metric: any) {
  if (typeof window === "undefined" || !window.dataLayer) return

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.debug(`Web Vital: ${metric.name}`, metric)
  }

  // Report to Google Analytics via dataLayer
  window.dataLayer.push({
    event: "web-vitals",
    event_category: "Web Vitals",
    event_action: metric.name,
    event_value: Math.round(metric.value * 10) / 10,
    event_label: metric.id,
    non_interaction: true,
  })

  // Send to Google Analytics 4 if available
  if (window.gtag) {
    window.gtag("event", "web_vitals", {
      metric_name: metric.name,
      metric_value: Math.round(metric.value * 10) / 10,
      metric_id: metric.id,
      metric_delta: metric.delta,
    })
  }
}

/**
 * Measures performance of a specific operation
 */
export function measurePerformance(metricName: string, value: number) {
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

      // Record performance mark
      performance.mark(`${metricName}-end`)

      // Report to PerformanceObserver if available
      if ("PerformanceObserver" in window) {
        try {
          performance.measure(metricName, {
            start: "navigationStart",
            end: `${metricName}-end`,
          })
        } catch (e) {
          // Fallback for older browsers
          performance.measure(metricName)
        }
      }
    } catch (error) {
      console.error("Error measuring performance:", error)
    }
  }
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

  // Set up performance observer for long tasks
  if ("PerformanceObserver" in window) {
    try {
      // Monitor long tasks
      const longTaskObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          // Only log long tasks in development
          if (process.env.NODE_ENV === "development") {
            console.debug("Long Task:", entry.duration, entry)
          }

          // Report long tasks to analytics
          if (entry.duration > 50) {
            window.dataLayer.push({
              event: "long-task",
              taskDuration: Math.round(entry.duration),
              taskName: entry.name || "unknown",
            })
          }
        })
      })

      longTaskObserver.observe({ entryTypes: ["longtask"] })
    } catch (e) {
      // Silently fail if longtask isn't supported
    }
  }
}
