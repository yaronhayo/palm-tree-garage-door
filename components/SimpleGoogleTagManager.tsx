"use client"

import { useEffect } from "react"

interface SimpleGoogleTagManagerProps {
  gtmId: string
}

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default function SimpleGoogleTagManager({ gtmId }: SimpleGoogleTagManagerProps) {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []

      // Push initial page view without using usePathname/useSearchParams
      window.dataLayer.push({
        event: "page_view",
        page: {
          path: window.location.pathname,
          title: document.title,
          search: window.location.search,
          url: window.location.href,
        },
      })

      // Log GTM initialization
      console.log(`[GTM] Initialized with ID: ${gtmId}`)
    }
  }, [gtmId])

  // Listen for route changes using the router events
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleRouteChange = () => {
      // Push page view event to dataLayer on route change
      window.dataLayer.push({
        event: "page_view",
        page: {
          path: window.location.pathname,
          title: document.title,
          search: window.location.search,
          url: window.location.href,
        },
      })
      console.log(`[GTM] Page view tracked: ${window.location.pathname}`)
    }

    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", handleRouteChange)

    // Listen for pushstate/replacestate (programmatic navigation)
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = (...args) => {
      originalPushState.apply(history, args)
      setTimeout(handleRouteChange, 0)
    }

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args)
      setTimeout(handleRouteChange, 0)
    }

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
    }
  }, [])

  return null
}
