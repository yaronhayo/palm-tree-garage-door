/**
 * IMPORTANT: This file is maintained for backward compatibility.
 * All tracking should be configured in Google Tag Manager moving forward.
 * Functions in this file will pass events to dataLayer for GTM to handle.
 */
import { loadScript, isScriptLoaded } from "@/lib/script-loader"
import { trackPageView as trackPageViewEvent } from "@/lib/analytics-events"

// Define GA events and categories directly in this file
export const GA_EVENTS = {
  CLICK: "click",
  SUBMIT: "submit",
  VIEW: "view",
  ERROR: "error",
  PHONE_CALL: "phone_call",
  FORM_SUBMISSION: "form_submission",
  CONVERSION: "conversion",
  NAVIGATION: "navigation",
}

// Define categories here since they're not exported from analytics-events
export const GA_CATEGORIES = {
  FORM: "form",
  ENGAGEMENT: "engagement",
  NAVIGATION: "navigation",
  CONVERSION: "conversion",
  ERROR: "error",
  PHONE_CALL: "phone_call",
}

// Add the missing FORM_TYPES constant
export const FORM_TYPES = {
  CONTACT: "contact",
  BOOKING: "booking",
  QUOTE: "quote",
  NEWSLETTER: "newsletter",
  QUICK_CONTACT: "quick_contact",
  REVIEW: "review",
}

// Use the correct GTM ID
const PLACEHOLDER_GTM_ID = "GTM-MF948JFL"

/**
 * Clean and validate a GTM ID
 * @param gtmId The GTM ID to clean
 * @returns The cleaned GTM ID or a default value
 */
export function cleanGtmId(gtmId: string): string {
  if (!gtmId) return "GTM-MF948JFL" // Return the correct GTM ID if none provided

  // If it's already in the correct format, return it
  const gtmIdPattern = /^GTM-[A-Z0-9]+$/
  if (gtmIdPattern.test(gtmId)) return gtmId

  // If it's the correct GTM ID, return it
  if (gtmId === "GTM-MF948JFL") return gtmId

  // Special case for GTM-AW-11312386644
  if (gtmId === "GTM-AW-11312386644") {
    console.warn("Using correct GTM ID instead of malformed ID: GTM-AW-11312386644")
    return "GTM-MF948JFL"
  }

  // If it contains "AW-", it might be a Google Ads ID mixed with GTM
  if (gtmId.includes("AW-") && gtmId.startsWith("GTM-")) {
    // Extract just the GTM part
    const cleanedId = gtmId.split("AW-")[0].trim()
    if (gtmIdPattern.test(cleanedId)) {
      console.warn(`Fixed malformed GTM ID: ${gtmId} → ${cleanedId}`)
      return cleanedId
    }
  }

  // If we have a fallback GTM ID in another env var, try that
  const fallbackId = process.env.GTM_ID
  if (fallbackId && gtmIdPattern.test(fallbackId)) {
    console.warn(`Using fallback GTM ID: ${fallbackId}`)
    return fallbackId
  }

  // If all else fails, return the correct GTM ID
  console.warn(`Invalid GTM ID format: ${gtmId}. Using correct GTM ID instead.`)
  return "GTM-MF948JFL"
}

/**
 * Check if a GTM ID is a placeholder or development ID
 */
export function isPlaceholderGtmId(gtmId: string): boolean {
  return !gtmId || (gtmId !== "GTM-MF948JFL" && gtmId === PLACEHOLDER_GTM_ID)
}

// Define GA_CONFIG directly in this file instead of importing it
export const GA_CONFIG = {
  // Measurement ID - clean the GTM ID
  id: cleanGtmId(process.env.NEXT_PUBLIC_GTM_ID || "") || cleanGtmId(process.env.GTM_ID || "") || PLACEHOLDER_GTM_ID,

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

// Define initGA function directly in this file
export function initGA(): void {
  if (typeof window === "undefined" || GA_CONFIG.disable) return
  if (isPlaceholderGtmId(GA_CONFIG.id)) {
    console.info("Skipping GA initialization with placeholder GTM ID")
    return
  }

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

// Export the trackPageView function from analytics-events
export { trackPageViewEvent }

// Define the window dataLayer
declare global {
  interface Window {
    dataLayer: any[]
    gtag?: (...args: any[]) => void
    CallTrk?: {
      swap: () => void
    }
    va?: (action: string, data?: any) => void
  }
}

// Types
export interface EventParams {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export interface FormEventParams extends EventParams {
  form_type: string
  form_location?: string
  service_area?: string
  urgency?: string
  service_type?: string
}

/**
 * Initialize Google Tag Manager
 */
export function initGTM(gtmId: string): void {
  if (typeof window === "undefined") return
  if (!gtmId) return

  // Clean up and validate the GTM ID
  const cleanedId = cleanGtmId(gtmId)

  // Skip loading completely if using placeholder ID
  if (isPlaceholderGtmId(cleanedId)) {
    console.info("Skipping GTM loading with placeholder ID")
    return
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []

  // Only load GTM if it's not already loaded
  if (!isScriptLoaded(`https://www.googletagmanager.com/gtm.js?id=${cleanedId}`)) {
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${cleanedId}`, {
      id: "gtm-script",
      strategy: "afterInteractive",
      trackPerformance: true,
    }).catch((error) => {
      console.error("Failed to load GTM:", error)
    })
  }
}

/**
 * Track an event in Google Tag Manager
 */
export function trackEvent(params: EventParams): void {
  if (typeof window === "undefined") return

  const { action, category = "general", label, value, ...customParams } = params

  // Skip tracking if dataLayer isn't initialized
  if (!window.dataLayer) {
    if (process.env.NODE_ENV === "development") {
      console.debug("Skipped tracking event (dataLayer not initialized):", {
        action,
        category,
        label,
        value,
        ...customParams,
      })
    }
    return
  }

  // Track in dataLayer only (GTM will handle the rest)
  window.dataLayer.push({
    event: "customEvent",
    eventAction: action,
    eventCategory: category,
    eventLabel: label,
    eventValue: value,
    ...customParams,
  })

  // Debug logging in development
  if (process.env.NODE_ENV === "development") {
    console.debug("Analytics Event pushed to dataLayer:", {
      action,
      category,
      label,
      value,
      ...customParams,
    })
  }
}

/**
 * Track a conversion event
 */
export function trackConversion(conversionType: string, value?: number, additionalData?: Record<string, any>): void {
  trackEvent({
    action: GA_EVENTS.CONVERSION,
    category: GA_CATEGORIES.CONVERSION,
    label: conversionType,
    value: value,
    ...additionalData,
  })

  // Also track in Vercel Analytics if available
  if (typeof window !== "undefined" && window.va) {
    window.va("event", {
      name: "conversion",
      type: conversionType,
      value: value?.toString(),
    })
  }
}

/**
 * Track a page view in Google Tag Manager
 */
export function trackPageView(path?: string, title?: string): void {
  if (typeof window === "undefined") return

  const currentPath = path || window.location.pathname
  const pageTitle = title || document.title

  // Skip tracking if dataLayer isn't initialized
  if (!window.dataLayer) {
    if (process.env.NODE_ENV === "development") {
      console.debug("Skipped tracking page view (dataLayer not initialized):", {
        path: currentPath,
        title: pageTitle,
      })
    }
    return
  }

  // Track in dataLayer
  window.dataLayer.push({
    event: "pageView",
    page: {
      path: currentPath,
      title: pageTitle,
    },
  })

  // Track in Google Analytics
  if (window.gtag) {
    const gtmId = cleanGtmId(process.env.NEXT_PUBLIC_GTM_ID || "")
    if (gtmId && !isPlaceholderGtmId(gtmId)) {
      window.gtag("config", gtmId, {
        page_path: currentPath,
        page_title: pageTitle,
      })
    }
  }

  // Also call the trackPageView from analytics-events if needed
  trackPageViewEvent(currentPath)
}

/**
 * Track a phone call in Google Tag Manager
 */
export function trackPhoneCall(phoneNumber: string, location: string): void {
  trackEvent({
    action: GA_EVENTS.PHONE_CALL,
    category: GA_CATEGORIES.ENGAGEMENT,
    label: location,
    phone_number: phoneNumber,
  })

  // Track as conversion
  trackConversion("phone_call", 1, { location, phone_number: phoneNumber })
}

/**
 * Track form submission in Google Tag Manager
 */
export function trackFormSubmission(formName: string, additionalData?: Record<string, any>): void {
  trackEvent({
    action: GA_EVENTS.FORM_SUBMISSION,
    category: GA_CATEGORIES.FORM,
    label: formName,
    form_type: formName,
    ...additionalData,
  })

  // Track as conversion
  trackConversion("form_submission", undefined, { form_name: formName, ...additionalData })
}

/**
 * Track navigation in Google Tag Manager
 */
export function trackNavigation(path: string, linkName?: string): void {
  trackEvent({
    action: GA_EVENTS.NAVIGATION,
    category: GA_CATEGORIES.NAVIGATION,
    label: linkName || path,
    path: path,
  })
}

/**
 * Track error in Google Tag Manager
 */
export function trackError(errorMessage: string, errorLocation?: string): void {
  trackEvent({
    action: GA_EVENTS.ERROR,
    category: GA_CATEGORIES.ERROR,
    label: errorLocation || "unknown",
    error_message: errorMessage,
  })
}

/**
 * Track performance metrics
 */
export function trackPerformance(metricName: string, value: number): void {
  if (typeof window === "undefined" || !window.gtag) return

  window.gtag("event", "timing_complete", {
    name: metricName,
    value: Math.round(value),
    event_category: "Performance",
  })
}

// Add CallRail functions that were in the original file
export function initializeCallRail(): void {
  if (typeof window === "undefined" || !window.CallTrk) return

  try {
    window.CallTrk.swap()
  } catch (error) {
    console.error("CallRail initialization error:", error)
  }
}

export function swapPhoneNumbers(): void {
  if (typeof window === "undefined" || !window.CallTrk) return

  try {
    window.CallTrk.swap()
  } catch (error) {
    console.error("CallRail swap error:", error)
  }
}
