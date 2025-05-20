/**
 * Debugging utilities
 */

// Safe check for browser environment
const isBrowser = typeof window !== "undefined"

/**
 * Check if a script is loaded
 */
export function isScriptLoaded(src: string): boolean {
  if (!isBrowser) return false

  try {
    const scripts = document.getElementsByTagName("script")
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src.includes(src)) {
        return true
      }
    }
    return false
  } catch (error) {
    console.error("Error checking if script is loaded:", error)
    return false
  }
}

/**
 * Log debug information to the console
 */
export function debugLog(message: string, data?: any): void {
  if (!isBrowser) return

  if (process.env.NODE_ENV === "development") {
    console.log(`[DEBUG] ${message}`, data || "")
  }
}

/**
 * Setup error listener
 */
export function setupErrorListener(): () => void {
  if (!isBrowser) return () => {}

  const errorHandler = (event: ErrorEvent) => {
    console.error("[ERROR CAUGHT]", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    })
  }

  window.addEventListener("error", errorHandler)

  return () => {
    window.removeEventListener("error", errorHandler)
  }
}
