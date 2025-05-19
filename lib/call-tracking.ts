/**
 * CallRail tracking utilities
 */

// Track when a phone number is clicked
export function trackPhoneCall(phoneNumber: string, source: string) {
  try {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "phone_call",
        phoneNumber,
        callSource: source,
      })
    }
  } catch (error) {
    console.error("Error tracking phone call:", error)
  }
}

// Track when a form with phone number is submitted
export function trackPhoneLeadSubmission(formName: string, phoneNumber?: string) {
  try {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "phone_lead_submission",
        formName,
        phoneNumber: phoneNumber || "not_provided",
      })
    }
  } catch (error) {
    console.error("Error tracking phone lead submission:", error)
  }
}
