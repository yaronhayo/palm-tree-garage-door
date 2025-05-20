/**
 * Performance monitoring utilities
 */

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  if (typeof window === "undefined") return

  try {
    // Set up performance observer for key metrics
    if ("PerformanceObserver" in window) {
      // LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]

        // Report LCP
        reportPerformanceMetric("LCP", lastEntry)
      })

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

      // FID (First Input Delay)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const firstInput = entries[0]

        // Report FID
        reportPerformanceMetric("FID", firstInput)
      })

      fidObserver.observe({ type: "first-input", buffered: true })

      // CLS (Cumulative Layout Shift)
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0

        for (const entry of entryList.getEntries()) {
          // @ts-ignore - layout shift entry
          if (!entry.hadRecentInput) {
            // @ts-ignore - layout shift entry
            clsValue += entry.value
          }
        }

        // Report CLS
        reportPerformanceMetric("CLS", { value: clsValue })
      })

      clsObserver.observe({ type: "layout-shift", buffered: true })
    }
  } catch (error) {
    console.error("Error initializing performance monitoring:", error)
  }
}

/**
 * Report a performance metric
 */
function reportPerformanceMetric(name: string, entry: any): void {
  if (typeof window === "undefined") return

  try {
    // Report to Vercel Speed Insights if available
    if (window.va) {
      window.va("event", {
        name: `web_vitals_${name.toLowerCase()}`,
        value: entry.value || entry.duration || 0,
        category: "Web Vitals",
      })
    }

    // Report to Google Analytics if available
    if (window.gtag) {
      window.gtag("event", name, {
        value: Math.round(entry.value || entry.duration || 0),
        event_category: "Web Vitals",
        non_interaction: true,
      })
    }

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Performance] ${name}:`, entry.value || entry.duration || 0)
    }
  } catch (error) {
    console.error(`Error reporting ${name}:`, error)
  }
}
