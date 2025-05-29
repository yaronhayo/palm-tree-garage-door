/**
 * Performance optimization utilities - Simplified for deployment
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

// Monitor Core Web Vitals - Simplified
export function initWebVitals() {
  if (typeof window === "undefined") return

  // Basic performance monitoring without complex observers
  if (window.gtag) {
    window.addEventListener("load", () => {
      // Simple performance tracking
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navigation) {
        window.gtag("event", "page_load_time", {
          event_category: "Performance",
          value: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        })
      }
    })
  }
}

// Inline critical CSS - Simplified
export function inlineCriticalCSS() {
  return `
    .hero-section{position:relative;padding-top:7rem;padding-bottom:5rem}
    .bg-primary-800{background-color:#0d423a}
    .text-white{color:#ffffff}
    .text-accent-500{color:#9adf67}
    .bg-white{background-color:#ffffff}
    .bg-accent-500{background-color:#9adf67}
    .text-primary-900{color:#072722}
    .font-bold{font-weight:700}
  `
}
