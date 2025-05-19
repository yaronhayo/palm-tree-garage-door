/**
 * Performance monitoring and optimization utilities
 */

// Safe check for window object
const isBrowser = typeof window !== "undefined"

// Report a custom performance metric
export function reportPerformanceMetric(metricName: string, value: number) {
  if (!isBrowser) return

  try {
    // Use the User Timing API to mark performance events
    performance.mark(metricName)

    // Report to analytics if available
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "performance_metric",
        metric_name: metricName,
        metric_value: value,
      })
    }
  } catch (error) {
    console.error("Error reporting performance metric:", error)
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (!isBrowser) return

  try {
    // Track page load metrics
    window.addEventListener("load", () => {
      const pageLoadTime = performance.now()
      reportPerformanceMetric("page_load", pageLoadTime)
    })
  } catch (error) {
    console.error("Error initializing performance monitoring:", error)
  }
}
