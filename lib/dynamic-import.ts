import { lazy, type ComponentType } from "react"

/**
 * Enhanced dynamic import with performance optimizations
 * This helps reduce Total Blocking Time by deferring non-critical components
 */
export function dynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: {
    ssr?: boolean
    loading?: ComponentType
    priority?: "high" | "low"
  } = {},
) {
  const { ssr = true, loading, priority = "low" } = options

  // For high priority components, load immediately
  if (priority === "high") {
    return lazy(importFn)
  }

  // For low priority components, defer loading
  return lazy(() => {
    // Use requestIdleCallback for low priority components in the browser
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      return new Promise((resolve) => {
        ;(window as any).requestIdleCallback(() => {
          importFn().then(resolve)
        })
      })
    }

    // Fallback to normal import for SSR or browsers without requestIdleCallback
    return importFn()
  })
}

/**
 * Preloads a component without rendering it
 * This helps improve performance for components that will be needed soon
 */
export function preloadComponent(importFn: () => Promise<any>) {
  if (typeof window === "undefined") return

  // Use requestIdleCallback to preload during idle time
  if ("requestIdleCallback" in window) {
    ;(window as any).requestIdleCallback(() => {
      importFn()
    })
  } else {
    // Fallback to setTimeout for browsers without requestIdleCallback
    setTimeout(() => {
      importFn()
    }, 1000)
  }
}
