/**
 * Utility functions for interacting with Google Tag Manager dataLayer
 */

// Type definition for the dataLayer
interface DataLayerEvent {
  event: string
  [key: string]: any
}

// Initialize dataLayer if it doesn't exist
export const initDataLayer = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || []
  }
}

/**
 * Push an event to the dataLayer
 * @param event The event object to push to the dataLayer
 */
export function pushToDataLayer(event: DataLayerEvent): void {
  try {
    if (typeof window === "undefined") return

    if (!window.dataLayer) {
      window.dataLayer = []
    }

    window.dataLayer.push(event)
  } catch (error) {
    console.error("Error pushing to dataLayer:", error)
  }
}

/**
 * Track a phone call event
 * @param phoneNumber The phone number that was called
 * @param source The source of the call (e.g. button, link, etc.)
 */
export function trackPhoneCall(phoneNumber: string, source: string): void {
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
 * Track an engagement event
 * @param element The element that was engaged with
 * @param interactionType The type of interaction (e.g. click, hover, etc.)
 * @param details Optional details about the engagement
 */
export function trackEngagement(element: string, interactionType: string, details?: Record<string, any>): void {
  try {
    pushToDataLayer({
      event: "engagement",
      element: element,
      interactionType: interactionType,
      ...(details && { engagementDetails: details }),
    })
  } catch (error) {
    console.error("Error tracking engagement:", error)
  }
}

/**
 * Track a page view event
 * @param url The URL of the page that was viewed
 */
export function trackPageView(url: string): void {
  try {
    pushToDataLayer({
      event: "pageview",
      pageURL: url,
    })
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

/**
 * Track a generic event
 * @param category The category of the event
 * @param action The action that was performed
 * @param label Optional label for the event
 * @param value Optional value for the event
 */
export function trackEvent(category: string, action: string, label?: string, value?: number): void {
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
 * Track an error event
 * @param message The error message
 * @param details Optional details about the error
 */
export function trackError(message: string, details?: Record<string, any>): void {
  try {
    pushToDataLayer({
      event: "error",
      errorMessage: message,
      ...(details && { errorDetails: details }),
    })
  } catch (error) {
    console.error("Error tracking error:", error)
  }
}

// Initialize dataLayer on module import
if (typeof window !== "undefined") {
  initDataLayer()
}
