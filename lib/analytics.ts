"use client"

import { GA_CONFIG, initGA } from "./analytics/ga-config"

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

// Define constants that were previously imported
export const GA_EVENTS = {
  FORM_SUBMISSION: "form_submission",
  PHONE_CALL: "phone_call",
  CLICK: "click",
  VIEW: "view",
  CONVERSION: "conversion",
  ERROR: "error",
  NAVIGATION: "navigation",
}

export const GA_CATEGORIES = {
  FORM: "form",
  ENGAGEMENT: "engagement",
  NAVIGATION: "navigation",
  CONVERSION: "conversion",
  ERROR: "error",
}

export const FORM_TYPES = {
  CONTACT: "contact",
  BOOKING: "booking",
  QUOTE: "quote",
  NEWSLETTER: "newsletter",
  QUICK_CONTACT: "quick_contact",
}

// Core tracking function
export function trackEvent(params: EventParams): void {
  if (typeof window !== "undefined" && window.gtag) {
    const { action, category = "general", label, value, ...customParams } = params

    try {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
        ...customParams,
      })

      // Debug logging in development
      if (process.env.NODE_ENV === "development") {
        console.debug("Analytics Event:", {
          action,
          category,
          label,
          value,
          ...customParams,
        })
      }
    } catch (error) {
      console.error("Error tracking event:", error)
    }
  }
}

// Form tracking
export function trackFormSubmission(formType: string, additionalData?: Record<string, any>): void {
  trackEvent({
    action: GA_EVENTS.FORM_SUBMISSION,
    category: GA_CATEGORIES.FORM,
    label: formType,
    form_type: formType,
    ...additionalData,
  })
}

// Phone call tracking
export function trackPhoneCall(phoneNumber: string, location: string): void {
  trackEvent({
    action: GA_EVENTS.PHONE_CALL,
    category: GA_CATEGORIES.ENGAGEMENT,
    label: location,
    phone_number: phoneNumber,
  })
}

// Navigation tracking
export function trackNavigation(path: string, linkName?: string): void {
  trackEvent({
    action: GA_EVENTS.NAVIGATION,
    category: GA_CATEGORIES.NAVIGATION,
    label: linkName || path,
    path: path,
  })
}

// Page view tracking
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    })
  }
}

// Conversion tracking
export function trackConversion(conversionType: string, value?: number): void {
  trackEvent({
    action: "conversion",
    category: GA_CATEGORIES.CONVERSION,
    label: conversionType,
    value: value,
  })
}

// Error tracking
export function trackError(errorMessage: string, errorLocation?: string): void {
  trackEvent({
    action: "error",
    category: "error",
    label: errorLocation || "unknown",
    error_message: errorMessage,
  })
}

// Performance tracking
export function trackPerformance(metricName: string, value: number): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "timing_complete", {
      name: metricName,
      value: Math.round(value),
      event_category: "Performance",
    })
  }
}

// CallRail functions
export function initializeCallRail(): void {
  if (typeof window !== "undefined" && window.CallTrk) {
    try {
      window.CallTrk.swap()
    } catch (error) {
      console.error("CallRail initialization error:", error)
    }
  }
}

export function swapPhoneNumbers(): void {
  if (typeof window !== "undefined" && window.CallTrk) {
    try {
      window.CallTrk.swap()
    } catch (error) {
      console.error("CallRail swap error:", error)
    }
  }
}

// Export GA_CONFIG
export { GA_CONFIG, initGA }
