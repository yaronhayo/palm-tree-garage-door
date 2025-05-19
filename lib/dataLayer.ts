/**
 * Utility functions for interacting with Google Tag Manager dataLayer
 */

// Safe check for window object
const isBrowser = typeof window !== "undefined"

// Initialize dataLayer if it doesn't exist
export const initDataLayer = () => {
  if (!isBrowser) return

  try {
    window.dataLayer = window.dataLayer || []
  } catch (error) {
    console.error("Error initializing dataLayer:", error)
  }
}

// Push an event to the dataLayer
export const pushToDataLayer = (data: any) => {
  if (!isBrowser) return

  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(data)
  } catch (error) {
    console.error("Error pushing to dataLayer:", error)
  }
}

// Track page view
export const trackPageView = (url: string) => {
  if (!isBrowser) return

  try {
    pushToDataLayer({
      event: "pageview",
      page: url,
    })
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

// Track event
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (!isBrowser) return

  try {
    pushToDataLayer({
      event: "event",
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value,
    })
  } catch (error) {
    console.error("Error tracking event:", error)
  }
}

/**
 * Track a phone call event
 * @param phoneNumber The phone number that was called
 * @param source The source of the call (e.g. button, link, etc.)
 */
export function trackPhoneCall(phoneNumber: string, source: string): void {
  if (!isBrowser) return

  try {
    pushToDataLayer({
      event: "phone_call",
      phoneNumber: phoneNumber,
      source: source,
    })
  } catch (error) {
    console.error("Error tracking phone call:", error)
  }
}

/**
 * Track a form submission event
 * @param formName The name of the form that was submitted
 * @param formData The data that was submitted with the form
 */
export function trackFormSubmission(formName: string, formData: Record<string, any>): void {
  if (!isBrowser) return

  try {
    pushToDataLayer({
      event: "form_submission",
      formName: formName,
      formData: formData,
    })
  } catch (error) {
    console.error("Error tracking form submission:", error)
  }
}

/**
 * Track an engagement event (e.g. click, scroll, etc.)
 * @param category The category of the engagement
 * @param action The action that was performed
 * @param label Optional label for the event
 */
export function trackEngagement(category: string, action: string, label?: string): void {
  if (!isBrowser) return

  try {
    pushToDataLayer({
      event: "engagement",
      engagementCategory: category,
      engagementAction: action,
      engagementLabel: label,
    })
  } catch (error) {
    console.error("Error tracking engagement:", error)
  }
}

/**
 * Track an error event
 * @param message The error message
 * @param details Optional details about the error
 */
export function trackError(message: string, details?: Record<string, any>): void {
  if (!isBrowser) return

  try {
    pushToDataLayer({
      event: "error",
      errorMessage: message,
      errorDetails: details,
    })
  } catch (error) {
    console.error("Error tracking error:", error)
  }
}

// Initialize dataLayer on module import
if (isBrowser) {
  try {
    initDataLayer()
  } catch (error) {
    console.error("Error initializing dataLayer on import:", error)
  }
}
