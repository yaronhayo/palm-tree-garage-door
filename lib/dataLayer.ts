/**
 * Google Tag Manager dataLayer utilities
 */

/**
 * Initialize the dataLayer
 */
export function initDataLayer(): void {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || []
  }
}

/**
 * Push an event to the dataLayer
 */
export function trackEvent(category: string, action: string, label: string, value?: number): void {
  if (typeof window === "undefined" || !window.dataLayer) return

  window.dataLayer.push({
    event: "custom_event",
    event_category: category,
    event_action: action,
    event_label: label,
    event_value: value,
  })
}

/**
 * Track a phone call in the dataLayer
 * @param phoneNumber The phone number that was called
 * @param source The source of the call (e.g. button, link, etc.)
 */
export function trackPhoneCall(phoneNumber: string, source: string): void {
  if (typeof window === "undefined" || !window.dataLayer) return

  window.dataLayer.push({
    event: "phone_call",
    phoneNumber: phoneNumber,
    source: source,
  })
}

/**
 * Push ecommerce data to the dataLayer
 */
export function trackEcommerce(
  action: "view_item" | "add_to_cart" | "begin_checkout" | "purchase",
  data: Record<string, any>,
): void {
  if (typeof window === "undefined" || !window.dataLayer) return

  window.dataLayer.push({ ecommerce: null }) // Clear previous ecommerce object

  window.dataLayer.push({
    event: action,
    ecommerce: data,
  })
}

/**
 * Set user data in the dataLayer
 */
export function setUserData(data: Record<string, any>): void {
  if (typeof window === "undefined" || !window.dataLayer) return

  window.dataLayer.push({
    event: "user_data",
    user: data,
  })
}

/**
 * Track a form submission event
 * @param formName The name of the form that was submitted
 * @param formData The data that was submitted with the form
 */
export function trackFormSubmission(formName: string, formData: Record<string, any>): void {
  if (typeof window === "undefined" || !window.dataLayer) return

  window.dataLayer.push({
    event: "form_submission",
    formName: formName,
    formData: formData,
  })
}

/**
 * Track an engagement event (e.g. click, scroll, etc.)
 * @param category The category of the engagement
 * @param action The action that was performed
 * @param label Optional label for the event
 */
export function trackEngagement(category: string, action: string, label?: string): void {
  if (typeof window === "undefined" || !window.dataLayer) return

  window.dataLayer.push({
    event: "engagement",
    engagementCategory: category,
    engagementAction: action,
    engagementLabel: label,
  })
}

/**
 * Track an error event
 * @param message The error message
 * @param details Optional details about the error
 */
export function trackError(message: string, details?: Record<string, any>): void {
  if (typeof window === "undefined" || !window.dataLayer) return

  window.dataLayer.push({
    event: "error",
    errorMessage: message,
    errorDetails: details,
  })
}

/**
 * Track a page view
 * @param url The URL of the page being viewed
 */
export function trackPageView(url: string): void {
  if (typeof window === "undefined" || !window.dataLayer) return

  window.dataLayer.push({
    event: "pageview",
    page: url,
  })
}
