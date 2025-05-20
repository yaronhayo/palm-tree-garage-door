/**
 * Analytics event tracking
 */

/**
 * Track a page view
 */
export function trackPageView(url: string): void {
  if (typeof window === "undefined") return

  // Track in Vercel Analytics
  if (window.va) {
    window.va("page", { url })
  }

  // Track in Google Analytics
  if (window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GTM_ID, {
      page_path: url,
    })
  }

  // Track in dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page_path: url,
    })
  }
}

/**
 * Track a conversion event
 */
export function trackConversion(action: string, label: string, value?: number): void {
  if (typeof window === "undefined") return

  // Track in Vercel Analytics
  if (window.va) {
    window.va("event", {
      name: action,
      label,
      value: value?.toString(),
    })
  }

  // Track in dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: "conversion",
      conversion_action: action,
      conversion_label: label,
      conversion_value: value,
    })
  }
}

/**
 * Track a form submission
 */
export function trackFormSubmission(formName: string, success = true): void {
  const action = success ? "form_submit_success" : "form_submit_error"

  trackConversion(action, formName)
}

/**
 * Track a button click
 */
export function trackButtonClick(buttonName: string, location: string): void {
  trackConversion("button_click", `${buttonName}_${location}`)
}

/**
 * Track a phone call
 */
export function trackPhoneCall(phoneNumber: string, location: string): void {
  trackConversion("phone_call", location, 1)
}
