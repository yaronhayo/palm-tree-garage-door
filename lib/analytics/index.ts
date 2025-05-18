// Re-export all analytics-related utilities and constants
// This file serves as the main entry point for analytics functionality

import {
  trackPhoneCall,
  trackFormSubmission,
  trackPageView,
  trackEvent,
  trackEngagement,
  trackError,
} from "../dataLayer"
import { FORM_TYPES, EVENT_CATEGORIES, EVENT_ACTIONS } from "./ga-config"

/**
 * Re-export everything from dataLayer for backward compatibility
 */

export * from "../dataLayer"

export const trackPhoneCallConversion = (phoneNumber: string, metadata: Record<string, string> = {}) => {
  try {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "phone_call_conversion",
        phoneNumber,
        ...metadata,
      })
    }
  } catch (error) {
    console.error("Error tracking phone call conversion:", error)
  }
}

export {
  // Functions
  trackPhoneCall,
  trackFormSubmission,
  trackPageView,
  trackEvent,
  trackEngagement,
  trackError,
  // Constants
  FORM_TYPES,
  EVENT_CATEGORIES,
  EVENT_ACTIONS,
}
