import dynamic from "next/dynamic"
import type { ComponentType } from "react"

interface DynamicImportOptions {
  ssr?: boolean
  loading?: ComponentType
  loadingTimeout?: number
}

/**
 * Enhanced dynamic import utility for better code splitting
 *
 * @param importFn Function that imports the component
 * @param options Configuration options
 * @returns Dynamically imported component
 */
export function dynamicImport<T>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: DynamicImportOptions = {},
) {
  const { ssr = true, loading, loadingTimeout = 3000 } = options

  return dynamic(importFn, {
    ssr,
    loading,
    loadingTimeout,
  })
}

/**
 * Preload a component to improve perceived performance
 *
 * @param importFn Function that imports the component
 */
export function preloadComponent(importFn: () => Promise<any>): void {
  if (typeof window === "undefined") return

  // Use requestIdleCallback if available, otherwise setTimeout
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      importFn()
    })
  } else {
    setTimeout(() => {
      importFn()
    }, 1000)
  }
}
