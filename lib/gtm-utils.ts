/**
 * Google Tag Manager utilities
 */

/**
 * Check if GTM is loaded
 */
export function isGtmLoaded(): boolean {
  if (typeof window === "undefined") return false
  return typeof window.dataLayer !== "undefined"
}

/**
 * Check if dataLayer is initialized
 */
export function isDataLayerInitialized(): boolean {
  if (typeof window === "undefined") return false
  return Array.isArray(window.dataLayer)
}

/**
 * Debug GTM in the console
 */
export function debugGtm(): void {
  if (typeof window === "undefined") return

  console.group("Google Tag Manager Debug")
  console.log("GTM Loaded:", isGtmLoaded())
  console.log("dataLayer Initialized:", isDataLayerInitialized())

  if (isDataLayerInitialized()) {
    console.log("dataLayer Contents:", [...window.dataLayer])
  }

  console.log("GTM ID:", process.env.NEXT_PUBLIC_GTM_ID || "Not set")
  console.groupEnd()
}
