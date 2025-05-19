// Safe check for browser environment
const isBrowser = typeof window !== "undefined"

/**
 * Track a custom analytics event
 * @param eventName The name of the event to track
 * @param properties Optional properties to include with the event
 */
export function trackAnalyticsEvent(eventName: string, properties?: Record<string, any>): void {
  if (!isBrowser) return

  try {
    // Check if Vercel Analytics is available
    if (window.va) {
      window.va.track(eventName, properties)
    }
  } catch (error) {
    console.error("Error tracking analytics event:", error)
  }
}

/**
 * Track a page view event
 * @param url The URL of the page being viewed
 */
export function trackPageView(url: string): void {
  if (!isBrowser) return

  try {
    // Check if Vercel Analytics is available
    if (window.va) {
      window.va.track("pageview", { path: url })
    }
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

// Add TypeScript declaration for Vercel Analytics
declare global {
  interface Window {
    va?: {
      track: (eventName: string, properties?: Record<string, any>) => void
    }
  }
}
