/**
 * Google Analytics configuration constants
 */

// Form types for tracking
export const FORM_TYPES = {
  CONTACT: "contact_form",
  BOOKING: "booking_form",
  QUOTE: "quote_form",
  NEWSLETTER: "newsletter_form",
  LEAD: "lead_form",
}

// Event categories
export const EVENT_CATEGORIES = {
  ENGAGEMENT: "engagement",
  CONVERSION: "conversion",
  NAVIGATION: "navigation",
  CONTENT: "content",
  ERROR: "error",
}

// Event actions
export const EVENT_ACTIONS = {
  CLICK: "click",
  VIEW: "view",
  SUBMIT: "submit",
  DOWNLOAD: "download",
  SCROLL: "scroll",
  PLAY: "play",
  PAUSE: "pause",
  COMPLETE: "complete",
  ERROR: "error",
}

// Custom dimensions
export const CUSTOM_DIMENSIONS = {
  SERVICE_AREA: "service_area",
  USER_TYPE: "user_type",
  DEVICE_CATEGORY: "device_category",
  LEAD_SOURCE: "lead_source",
  CUSTOMER_JOURNEY_STAGE: "customer_journey_stage",
}

// Conversion goals
export const CONVERSION_GOALS = {
  FORM_SUBMISSION: "form_submission",
  PHONE_CALL: "phone_call",
  BOOKING_COMPLETED: "booking_completed",
  QUOTE_REQUESTED: "quote_requested",
  EMAIL_SIGNUP: "email_signup",
}
