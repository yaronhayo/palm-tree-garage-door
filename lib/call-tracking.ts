/**
 * CallRail tracking utilities
 */
import { trackEvent } from "./analytics"

/**
 * Check if CallRail is configured
 */
export function isCallRailConfigured(): boolean {
  if (typeof window === "undefined") return false
  return typeof window.CallTrkSwap !== "undefined"
}

/**
 * Get the visitor's source according to CallRail
 */
export function getCallSource(): string | null {
  if (typeof window === "undefined" || !window.CallTrkSwap) return null

  try {
    // This is a simplified approach - actual implementation depends on CallRail's API
    return window.CallTrkSwap.source || null
  } catch (error) {
    console.error("Error getting CallRail source:", error)
    return null
  }
}

/**
 * Track a phone call in our analytics
 */
export function trackPhoneCall(phoneNumber: string, location: string): void {
  // Track in our analytics
  trackEvent("call", "call", location, 1)

  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Call Tracked] ${phoneNumber} from ${location}`)
  }
}
