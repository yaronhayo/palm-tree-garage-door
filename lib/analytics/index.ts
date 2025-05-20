/**
 * Analytics utilities for tracking user interactions
 */
import { trackEvent as trackGtmEvent } from "../dataLayer"

type EventCategory = "engagement" | "conversion" | "navigation" | "form" | "call" | "error"

type EventAction = "click" | "view" | "submit" | "complete" | "error" | "call" | "scroll"

/**
 * Track an event in all analytics platforms
 */
export function trackEvent(category: EventCategory, action: EventAction, label: string, value?: number): void {
  // Track in GTM/GA
  trackGtmEvent(category, action, label, value)

  // Track in Vercel Analytics if available
  if (typeof window !== "undefined" && window.va) {
    window.va("event", {
      name: `${action}_${label}`,
      category,
      label,
      value: value?.toString(),
    })
  }
}

/**
 * Track a page view
 */
export function trackPageView(url: string): void {
  trackEvent("navigation", "view", url)
}

/**
 * Track a form submission
 */
export function trackFormSubmission(formName: string, success = true): void {
  trackEvent("form", success ? "submit" : "error", formName)
}

/**
 * Track a phone call
 */
export function trackPhoneCall(phoneNumber: string, location: string): void {
  trackEvent("call", "call", location, 1)
}

/**
 * Track an error
 */
export function trackError(errorType: string, errorMessage: string): void {
  trackEvent("error", "error", errorType, 1)

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error(`[Analytics Error]: ${errorType} - ${errorMessage}`)
  }
}
