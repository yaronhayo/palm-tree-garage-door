import React from "react"

type PerformanceMetric = {
  name: string
  value: number
  unit: string
  description: string
}

type PerformanceReport = {
  metrics: PerformanceMetric[]
  timestamp: number
  url: string
  userAgent: string
}

// Collect core web vitals and other performance metrics
export function collectPerformanceMetrics(): PerformanceMetric[] {
  const metrics: PerformanceMetric[] = []

  // Only run in browser environment
  if (typeof window === "undefined" || !window.performance) {
    return metrics
  }

  try {
    // Navigation timing metrics
    const navigationTiming = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
    if (navigationTiming) {
      // Time to First Byte (TTFB)
      metrics.push({
        name: "ttfb",
        value: navigationTiming.responseStart - navigationTiming.requestStart,
        unit: "ms",
        description: "Time to First Byte",
      })

      // DOM Content Loaded
      metrics.push({
        name: "domContentLoaded",
        value: navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart,
        unit: "ms",
        description: "DOM Content Loaded",
      })

      // Load Event
      metrics.push({
        name: "loadEvent",
        value: navigationTiming.loadEventEnd - navigationTiming.fetchStart,
        unit: "ms",
        description: "Page Load Complete",
      })
    }

    // Paint metrics
    const paintMetrics = performance.getEntriesByType("paint")
    paintMetrics.forEach((metric) => {
      const name = metric.name === "first-paint" ? "fp" : metric.name === "first-contentful-paint" ? "fcp" : metric.name

      metrics.push({
        name,
        value: metric.startTime,
        unit: "ms",
        description: metric.name,
      })
    })

    // Largest Contentful Paint
    if ("PerformanceObserver" in window) {
      // This would normally be set up earlier in the app lifecycle
      // We're just checking if we have an LCP entry already recorded
      const lcpEntries = performance.getEntriesByType("largest-contentful-paint")
      if (lcpEntries.length > 0) {
        const lcp = lcpEntries[lcpEntries.length - 1]
        metrics.push({
          name: "lcp",
          value: lcp.startTime,
          unit: "ms",
          description: "Largest Contentful Paint",
        })
      }
    }

    // First Input Delay - would normally be collected via PerformanceObserver
    // Just checking if we have any entries already
    const fidEntries = performance.getEntriesByType("first-input")
    if (fidEntries.length > 0) {
      const fid = fidEntries[0]
      metrics.push({
        name: "fid",
        value: fid.processingStart - fid.startTime,
        unit: "ms",
        description: "First Input Delay",
      })
    }

    // Cumulative Layout Shift - would normally be collected via PerformanceObserver
    // Just a placeholder as CLS is calculated over time
    if (window.cumulativeLayoutShiftScore !== undefined) {
      metrics.push({
        name: "cls",
        value: window.cumulativeLayoutShiftScore || 0,
        unit: "",
        description: "Cumulative Layout Shift",
      })
    }

    // Memory usage if available
    if (performance.memory) {
      metrics.push({
        name: "jsHeapSizeLimit",
        value: Math.round(performance.memory.jsHeapSizeLimit / (1024 * 1024)),
        unit: "MB",
        description: "JS Heap Size Limit",
      })

      metrics.push({
        name: "totalJSHeapSize",
        value: Math.round(performance.memory.totalJSHeapSize / (1024 * 1024)),
        unit: "MB",
        description: "Total JS Heap Size",
      })

      metrics.push({
        name: "usedJSHeapSize",
        value: Math.round(performance.memory.usedJSHeapSize / (1024 * 1024)),
        unit: "MB",
        description: "Used JS Heap Size",
      })
    }
  } catch (error) {
    console.error("Error collecting performance metrics:", error)
  }

  return metrics
}

// Report performance metrics to analytics or monitoring service
export function reportPerformanceMetrics(endpoint?: string): void {
  if (typeof window === "undefined") return

  // Collect metrics
  const metrics = collectPerformanceMetrics()

  // Create report
  const report: PerformanceReport = {
    metrics,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  }

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.group("Performance Metrics")
    metrics.forEach((metric) => {
      console.log(`${metric.description}: ${metric.value}${metric.unit}`)
    })
    console.groupEnd()
  }

  // Send to analytics
  if (typeof window.gtag === "function") {
    metrics.forEach((metric) => {
      window.gtag("event", "performance_metric", {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_unit: metric.unit,
        metric_description: metric.description,
        page_url: window.location.href,
      })
    })
  }

  // Send to custom endpoint if provided
  if (endpoint) {
    try {
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
        // Use keepalive to ensure the request completes even if the page is unloading
        keepalive: true,
      }).catch((err) => console.error("Error reporting performance metrics:", err))
    } catch (error) {
      console.error("Error sending performance report:", error)
    }
  }
}

// Initialize performance monitoring
export function initPerformanceMonitoring(): void {
  if (typeof window === "undefined") return

  // Set up CLS monitoring
  let cumulativeLayoutShiftScore = 0

  if ("PerformanceObserver" in window) {
    // Observe Largest Contentful Paint
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1]
          window.largestContentfulPaint = lastEntry.startTime
        }
      }).observe({ type: "largest-contentful-paint", buffered: true })
    } catch (e) {
      console.error("LCP monitoring error:", e)
    }

    // Observe First Input Delay
    try {
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        if (entries.length > 0) {
          const firstInput = entries[0]
          window.firstInputDelay = firstInput.processingStart - firstInput.startTime
        }
      }).observe({ type: "first-input", buffered: true })
    } catch (e) {
      console.error("FID monitoring error:", e)
    }

    // Observe Cumulative Layout Shift
    try {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            cumulativeLayoutShiftScore += entry.value
            window.cumulativeLayoutShiftScore = cumulativeLayoutShiftScore
          }
        }
      }).observe({ type: "layout-shift", buffered: true })
    } catch (e) {
      console.error("CLS monitoring error:", e)
    }
  }

  // Report metrics when the page is hidden (user navigates away)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      reportPerformanceMetrics()
    }
  })

  // Report metrics on page unload
  window.addEventListener("beforeunload", () => {
    reportPerformanceMetrics()
  })

  // Report metrics after page load + 5 seconds
  window.addEventListener("load", () => {
    // Initial report after load
    setTimeout(() => {
      reportPerformanceMetrics()
    }, 5000)
  })
}

// Add these to the window object for TypeScript
declare global {
  interface Window {
    cumulativeLayoutShiftScore?: number
    largestContentfulPaint?: number
    firstInputDelay?: number
    gtag?: (...args: any[]) => void
    performance: Performance & {
      memory?: {
        jsHeapSizeLimit: number
        totalJSHeapSize: number
        usedJSHeapSize: number
      }
    }
  }
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

export function measurePerformance<T>(fn: () => T, label: string): T {
  const start = performance.now()
  const result = fn()
  const end = performance.now()

  console.log(`${label} took ${end - start}ms`)

  return result
}

export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = null,
): React.LazyExoticComponent<T> {
  const LazyComponent = React.lazy(importFunc)

  return (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </React.Suspense>
  )
}
