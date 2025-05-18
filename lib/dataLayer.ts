/**
 * Data layer utilities for tracking and analytics
 */

// Type definitions for tracking events
type TrackingEvent = {
  event: string
  [key: string]: any
}

// Initialize dataLayer if it doesn't exist
export const initDataLayer = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || []
  }
}

// Push an event to the dataLayer
export const pushToDataLayer = (data: TrackingEvent) => {
  try {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push(data)
    }
  } catch (error) {
    console.error("Error pushing to dataLayer:", error)
  }
}

// Track a phone call
export const trackPhoneCall = (phoneNumber: string, location: string) => {
  try {
    pushToDataLayer({
      event: "phone_call",
      phoneNumber,
      location,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking phone call:", error)
  }
}

// Track form submission
export const trackFormSubmission = (formId: string, formData: any) => {
  try {
    pushToDataLayer({
      event: "form_submission",
      formId,
      formData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking form submission:", error)
  }
}

// Track page view
export const trackPageView = (path: string) => {
  try {
    pushToDataLayer({
      event: "page_view",
      path,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

// Track engagement (clicks, interactions)
export const trackEngagement = (elementId: string, action: string) => {
  try {
    pushToDataLayer({
      event: "engagement",
      elementId,
      action,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking engagement:", error)
  }
}

// Track errors
export const trackError = (errorMessage: string, errorStack?: string, errorComponent?: string) => {
  try {
    pushToDataLayer({
      event: "error",
      errorMessage,
      errorStack,
      errorComponent,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking error:", error)
  }
}

// Track generic events (MISSING EXPORT - ADDING BACK)
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  try {
    pushToDataLayer({
      event: "custom_event",
      event_category: category,
      event_action: action,
      event_label: label,
      event_value: value,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error tracking event:", error)
  }
}

// Form types for backward compatibility
export const FORM_TYPES = {
  CONTACT: "contact",
  BOOKING: "booking",
  NEWSLETTER: "newsletter",
  QUOTE: "quote",
}

// Event categories for backward compatibility
export const EVENT_CATEGORIES = {
  ENGAGEMENT: "engagement",
  CONVERSION: "conversion",
  NAVIGATION: "navigation",
  ERROR: "error",
  FORM: "form",
}

// Event actions for backward compatibility
export const EVENT_ACTIONS = {
  CLICK: "click",
  SUBMIT: "submit",
  VIEW: "view",
  SCROLL: "scroll",
  CALL: "call",
}

// Initialize dataLayer on module import
initDataLayer()
