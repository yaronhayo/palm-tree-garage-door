import React from "react"
/**
 * Performance optimization utilities
 */

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === "undefined") return

  // Preload critical images
  const criticalImages = ["/logo.png", "/images/service-truck.png"]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    link.fetchPriority = "high"
    document.head.appendChild(link)
  })
}

// Lazy load non-critical resources
export function lazyLoadResources() {
  if (typeof window === "undefined") return

  // Load non-critical scripts after page load
  window.addEventListener("load", () => {
    // Load analytics scripts
    setTimeout(() => {
      // Additional analytics or tracking scripts can be loaded here
    }, 1000)
  })
}

// Optimize images for WebP format
export function getOptimizedImageUrl(src: string, width?: number, quality = 75): string {
  // If it's already a WebP or optimized URL, return as is
  if (src.includes(".webp") || src.includes("w=") || src.includes("q=")) {
    return src
  }

  // For Vercel blob storage URLs
  if (src.includes("blob.vercel-storage.com")) {
    const url = new URL(src)
    if (width) url.searchParams.set("w", width.toString())
    url.searchParams.set("q", quality.toString())
    return url.toString()
  }

  // For other images, return as is (Next.js Image component will optimize)
  return src
}

// Calculate optimal image sizes
export function getResponsiveSizes(breakpoints: { [key: string]: string } = {}) {
  const defaultBreakpoints = {
    sm: "100vw",
    md: "50vw",
    lg: "33vw",
    xl: "25vw",
    ...breakpoints,
  }

  return `(max-width: 640px) ${defaultBreakpoints.sm}, (max-width: 768px) ${defaultBreakpoints.md}, (max-width: 1024px) ${defaultBreakpoints.lg}, ${defaultBreakpoints.xl}`
}

// Reduce DOM size by virtualizing long lists
export function shouldVirtualizeList(itemCount: number, threshold = 50): boolean {
  return itemCount > threshold
}

// Optimize bundle size by code splitting
export function loadComponentAsync<T>(importFn: () => Promise<{ default: T }>, fallback?: React.ComponentType) {
  return React.lazy(importFn)
}

// Monitor Core Web Vitals
export function initWebVitals() {
  if (typeof window === "undefined") return

  // Monitor LCP
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    const lastEntry = entries[entries.length - 1]

    // Send to analytics
    if (window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: "LCP",
        value: Math.round(lastEntry.startTime),
      })
    }
  }).observe({ entryTypes: ["largest-contentful-paint"] })

  // Monitor FID
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    entries.forEach((entry) => {
      if (window.gtag) {
        window.gtag("event", "web_vitals", {
          event_category: "Web Vitals",
          event_label: "FID",
          value: Math.round(entry.processingStart - entry.startTime),
        })
      }
    })
  }).observe({ entryTypes: ["first-input"] })

  // Monitor CLS
  let clsValue = 0
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries()
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
      }
    })

    if (window.gtag) {
      window.gtag("event", "web_vitals", {
        event_category: "Web Vitals",
        event_label: "CLS",
        value: Math.round(clsValue * 1000),
      })
    }
  }).observe({ entryTypes: ["layout-shift"] })
}

// Optimize CSS delivery
export function inlineCriticalCSS() {
  return `
    /* Critical above-the-fold styles */
    .critical-hero{position:relative;padding-top:7rem;padding-bottom:5rem}
    .critical-hero-content{position:relative;z-index:10}
    .critical-hero-title{font-size:2.25rem;font-weight:700;color:white;margin-bottom:1.5rem;line-height:1.2}
    .critical-hero-text{font-size:1.125rem;color:white;margin-bottom:2rem}
    .bg-primary-800{background-color:#0d423a}
    .text-white{color:white}
    .text-accent-500{color:#9adf67}
    .bg-white{background-color:white}
    .bg-accent-500{background-color:#9adf67}
    .text-primary-900{color:#072722}
    .font-bold{font-weight:700}
    @media(min-width:640px){.critical-hero-title{font-size:3rem}}
  `
}
