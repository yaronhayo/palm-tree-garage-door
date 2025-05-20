/**
 * Performance utilities
 */

/**
 * Measure time between two points
 */
export function measureTiming(markName: string): void {
  if (typeof performance === "undefined") return

  try {
    performance.mark(markName)
  } catch (error) {
    console.error(`Error creating performance mark ${markName}:`, error)
  }
}

/**
 * Measure time between two marks
 */
export function measureTimeBetween(startMark: string, endMark: string, measureName: string): number | null {
  if (typeof performance === "undefined") return null

  try {
    performance.measure(measureName, startMark, endMark)
    const entries = performance.getEntriesByName(measureName)
    return entries.length > 0 ? entries[0].duration : null
  } catch (error) {
    console.error(`Error measuring performance between ${startMark} and ${endMark}:`, error)
    return null
  }
}

/**
 * Report a custom performance metric
 */
export function reportPerformanceMetric(name: string, value: number): void {
  if (typeof window === "undefined" || !window.performance || !window.performance.mark) {
    return
  }

  try {
    // Use Web Vitals API if available
    if ("web-vitals" in window) {
      // @ts-ignore - web-vitals API
      window.webVitals.reportCustomMetric({
        name,
        value,
        attribution: {
          type: "custom",
        },
      })
    }

    // Also report to Google Analytics if available
    if (window.gtag) {
      window.gtag("event", "timing_complete", {
        name,
        value,
        event_category: "Performance",
      })
    }
  } catch (error) {
    console.error(`Error reporting performance metric ${name}:`, error)
  }
}

/**
 * Get LCP (Largest Contentful Paint) element
 */
export function observeLCP(callback: (element: Element) => void): void {
  if (typeof PerformanceObserver === "undefined") return

  try {
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // @ts-ignore - LCP entry
        if (entry.element) {
          // @ts-ignore - LCP entry
          callback(entry.element)
        }
      }
    })

    observer.observe({ type: "largest-contentful-paint", buffered: true })
  } catch (error) {
    console.error("Error observing LCP:", error)
  }
}
