import type React from "react"
/**
 * Dynamic import utilities
 */
import { lazy } from "react"

/**
 * Dynamically import a component with proper typing
 */
export function dynamicImport<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
): React.LazyExoticComponent<T> {
  return lazy(importFn)
}

/**
 * Preload a component
 */
export function preloadComponent(importFn: () => Promise<any>): void {
  importFn().catch((error) => {
    console.error("Error preloading component:", error)
  })
}
