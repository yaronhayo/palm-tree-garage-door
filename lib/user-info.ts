/**
 * User information utilities
 */
import { formatDateTimeET } from "./date-utils"

/**
 * Get basic user information
 */
export function getUserInfo() {
  if (typeof window === "undefined") {
    return {
      userAgent: "Server",
      timestamp: formatDateTimeET(new Date()),
      timezone: "America/New_York",
      language: "en-US",
    }
  }

  return {
    userAgent: navigator.userAgent,
    timestamp: formatDateTimeET(new Date()),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
    referrer: document.referrer || "Direct",
    path: window.location.pathname,
  }
}

/**
 * Get user's geolocation (if permitted)
 */
export function getUserGeolocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      reject(new Error("Geolocation not supported"))
      return
    }

    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

/**
 * Get the user's IP-based location (country/region)
 */
export async function getUserRegion(): Promise<string | null> {
  try {
    const response = await fetch("https://ipapi.co/json/")
    const data = await response.json()
    return data.region || null
  } catch (error) {
    console.error("Error getting user region:", error)
    return null
  }
}
