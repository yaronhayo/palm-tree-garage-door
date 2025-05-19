/**
 * Performance monitoring utilities that work with Vercel Speed Insights
 */

// Safe check for browser environment
const isBrowser = typeof window !== "undefined"

// Interface for performance metric data
interface PerformanceMetricData {
  name: string
  value: number
  attribution?: Record<string, any>
  navigationType?: string
}

/**
 * Report a custom performance metric to Vercel Speed Insights
 */
export function reportPerformanceMetric(metricData: PerformanceMetricData): void {
  if (!isBrowser) return

  try {
    // Check if web-vitals is available
    if (typeof window.webVitals?.reportWebVitals === "function") {
      window.webVitals.reportWebVitals({
        metric: {
          id: metricData.name,
          value: metricData.value,
          attribution: metricData.attribution || {},
          navigationType: metricData.navigationType || "navigate",
        },
      })
    }

    // Also report to dataLayer if available
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "performance_metric",
        metric_name: metricData.name,
        metric_value: metricData.value,
      })
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`Performance Metric - ${metricData.name}: ${metricData.value}`)
    }
  } catch (error) {
    console.error("Error reporting performance metric:", error)
  }
}

/**
 * Track component render time
 */
export function trackComponentRender(componentName: string): () => void {
  if (!isBrowser) return () => {}

  try {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime

      reportPerformanceMetric({
        name: `${componentName}_render`,
        value: renderTime,
        attribution: {
          component: componentName,
        },
      })
    }
  } catch (error) {
    console.error("Error tracking component render:", error)
    return () => {}
  }
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  if (!isBrowser) return

  try {
    // Set up performance observer for long tasks
    if ("PerformanceObserver" in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Report long tasks (over 50ms)
            if (entry.duration > 50) {
              reportPerformanceMetric({
                name: "long_task",
                value: entry.duration,
                attribution: {
                  startTime: entry.startTime,
                  duration: entry.duration,
                },
              })
            }
          })
        })

        longTaskObserver.observe({ entryTypes: ["longtask"] })
      } catch (e) {
        console.error("Long task observer error:", e)
      }
    }

    // Track page load metrics
    window.addEventListener("load", () => {
      // Use Navigation Timing API if available
      if (performance.getEntriesByType && typeof performance.getEntriesByType === "function") {
        const navigationEntries = performance.getEntriesByType("navigation")

        if (navigationEntries && navigationEntries.length > 0) {
          const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming

          reportPerformanceMetric({
            name: "page_load",
            value: navigationEntry.loadEventEnd - navigationEntry.startTime,
          })

          reportPerformanceMetric({
            name: "ttfb",
            value: navigationEntry.responseStart - navigationEntry.requestStart,
          })
        }
      }
    })
  } catch (error) {
    console.error("Error initializing performance monitoring:", error)
  }
}

// Add type definitions for web-vitals global
declare global {
  interface Window {
    webVitals?: {
      reportWebVitals: (data: { metric: any }) => void
    }
    dataLayer?: any[]
  }
}
