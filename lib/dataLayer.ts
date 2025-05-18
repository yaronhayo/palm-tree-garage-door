/**
 * Utility functions for interacting with Google Tag Manager dataLayer
 */

// Define the window with dataLayer property
declare global {
  interface Window {
    dataLayer: any[]
  }
}

/**
 * Push an event to the dataLayer
 */
export function pushToDataLayer(data: any): void {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(data)

      // Log in development for debugging
      if (process.env.NODE_ENV !== "production") {
        console.log("DataLayer push:", data)
      }
    }
  } catch (error) {
    console.error("Error pushing to dataLayer:", error)
    // Don't throw, just log the error
  }
}

/**
 * Track a phone call event
 */
export function trackPhoneCall(phoneNumber: string, location: string): void {
  try {
    pushToDataLayer({
      event: "phone_call",
      phoneNumber,
      location,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking phone call:", error)
    // Don't throw, just log the error
  }
}

/**
 * Track a form submission event
 */
export function trackFormSubmission(formName: string, formData: any): void {
  try {
    pushToDataLayer({
      event: "form_submission",
      formName,
      formData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking form submission:", error)
    // Don't throw, just log the error
  }
}

/**
 * Track a page view event
 */
export function trackPageView(path: string, title: string): void {
  try {
    pushToDataLayer({
      event: "page_view",
      page: {
        path,
        title,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking page view:", error)
    // Don't throw, just log the error
  }
}

/**
 * Track user engagement
 */
export function trackEngagement(engagementType: string, details?: Record<string, any>): void {
  try {
    pushToDataLayer({
      event: "user_engagement",
      engagementType,
      details: details || {},
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking engagement:", error)
    // Don't throw, just log the error
  }
}

/**
 * Track an error event
 */
export function trackError(errorMessage: string, details?: Record<string, any>): void {
  try {
    pushToDataLayer({
      event: "error",
      errorMessage,
      details: details || {},
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking error:", error)
    // Don't throw, just log the error
  }
}

/**
 * Track a generic event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>): void {
  try {
    pushToDataLayer({
      event: eventName,
      ...eventParams,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error(`Error tracking event ${eventName}:`, error)
    // Don't throw, just log the error
  }
}
