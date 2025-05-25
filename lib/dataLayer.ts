// This file is kept for backward compatibility
// All functionality has been moved to lib/analytics.ts

import {
  trackEvent,
  trackPhoneCall,
  trackFormSubmission,
  trackPageView,
  trackConversion,
  trackError,
} from "./analytics"

export { trackEvent, trackPhoneCall, trackFormSubmission, trackPageView, trackConversion, trackError }

// Log a warning in development mode
if (process.env.NODE_ENV === "development") {
  console.warn("Warning: lib/dataLayer.ts is deprecated. Please import from lib/analytics.ts instead.")
}
