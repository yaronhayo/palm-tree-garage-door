/**
 * Google Consent Mode v2 Manager
 * Handles consent state management for Google services
 */

// Define the consent state type based on Google Consent Mode v2
export type ConsentState = {
  ad_storage: "granted" | "denied"
  ad_user_data: "granted" | "denied"
  ad_personalization: "granted" | "denied"
  analytics_storage: "granted" | "denied"
  functionality_storage: "granted" | "denied"
  personalization_storage: "granted" | "denied"
  security_storage: "granted" | "denied"
}

// Default consent state - denied for tracking, granted for functionality
export const defaultConsentState: ConsentState = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted", // Always granted for basic functionality
  personalization_storage: "denied",
  security_storage: "granted", // Always granted for security
}

// Local storage key for consent state
const CONSENT_STORAGE_KEY = "palm_tree_consent_state"

/**
 * Initialize consent mode with default settings
 * This should be called as early as possible in the page load
 */
export function initializeConsentMode(): void {
  if (typeof window === "undefined") return

  // Get stored consent or use default
  const storedConsent = getStoredConsent() || defaultConsentState

  // Initialize gtag consent
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push([
    "consent",
    "default",
    {
      ...defaultConsentState,
      // Override with any stored values
      ...storedConsent,
      // Region detection for GDPR
      region: detectRegion(),
      wait_for_update: 500, // Wait 500ms for consent update
    },
  ])
}

/**
 * Update the consent state based on user preferences
 */
export function updateConsentState(consentState: ConsentState): void {
  if (typeof window === "undefined") return

  // Store consent state
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentState))

  // Update Google consent
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(["consent", "update", consentState])

  // Trigger a custom event for other scripts
  window.dispatchEvent(new CustomEvent("consentUpdated", { detail: consentState }))
}

/**
 * Get the stored consent state from localStorage
 */
export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null

  try {
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!storedConsent) return null
    return JSON.parse(storedConsent) as ConsentState
  } catch (error) {
    console.error("Error retrieving stored consent:", error)
    return null
  }
}

/**
 * Simple region detection for GDPR
 * In production, you might want to use a more sophisticated solution
 */
function detectRegion(): string[] {
  if (typeof window === "undefined") return []

  // List of GDPR countries (EU + EEA)
  const gdprCountries = [
    "AT",
    "BE",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IE",
    "IT",
    "LV",
    "LT",
    "LU",
    "MT",
    "NL",
    "PL",
    "PT",
    "RO",
    "SK",
    "SI",
    "ES",
    "SE",
    "GB",
    "IS",
    "LI",
    "NO",
    "CH",
  ]

  // Try to detect region from timezone
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const isEuropeanTimezone = timezone.startsWith("Europe/")

  // Try to detect region from language
  const language = navigator.language || (navigator as any).userLanguage
  const languageCode = language ? language.split("-")[1] : ""

  const isGdprRegion = isEuropeanTimezone || (languageCode && gdprCountries.includes(languageCode.toUpperCase()))

  return isGdprRegion ? ["GDPR"] : []
}

/**
 * Check if consent has been given for a specific purpose
 */
export function hasConsent(purpose: keyof ConsentState): boolean {
  const consent = getStoredConsent()
  if (!consent) return false
  return consent[purpose] === "granted"
}

/**
 * Reset all consent to default values
 */
export function resetConsent(): void {
  localStorage.removeItem(CONSENT_STORAGE_KEY)
  updateConsentState(defaultConsentState)
}
