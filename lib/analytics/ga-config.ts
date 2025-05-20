/**
 * Google Analytics configuration
 */

/**
 * Google Analytics configuration
 */
export const GA_CONFIG = {
  // Measurement ID
  id: process.env.NEXT_PUBLIC_GTM_ID || "",

  // Debug mode
  debug: process.env.NODE_ENV === "development",

  // Disable analytics in development
  disable: process.env.NODE_ENV === "development" && !process.env.ENABLE_ANALYTICS_IN_DEV,

  // Custom dimensions
  dimensions: {
    userType: "dimension1",
    deviceType: "dimension2",
    pageLoadTime: "dimension3",
  },

  // Custom metrics
  metrics: {
    scrollDepth: "metric1",
    engagement: "metric2",
  },
}

/**
 * Initialize Google Analytics
 */
export function initGA(): void {
  if (typeof window === "undefined" || GA_CONFIG.disable) return

  window.dataLayer = window.dataLayer || []

  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }

  gtag("js", new Date())
  gtag("config", GA_CONFIG.id, {
    debug_mode: GA_CONFIG.debug,
    send_page_view: false, // We'll track page views manually
  })
}
