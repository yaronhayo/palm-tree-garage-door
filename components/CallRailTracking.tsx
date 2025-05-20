"use client"

import { useEffect } from "react"
import Script from "next/script"
import { getEnvVar } from "@/lib/env-client"

export default function CallRailTracking() {
  const accountId = getEnvVar("NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID")

  // Ensure phone numbers are properly marked for DNI
  useEffect(() => {
    // This runs after the CallRail script has loaded
    const markPhoneNumbersForDNI = () => {
      if (typeof window !== "undefined") {
        // Find all elements with data-call-tracking="true" attribute
        const phoneElements = document.querySelectorAll('[data-call-tracking="true"]')

        // Add the necessary class for CallRail to identify these elements
        phoneElements.forEach((element) => {
          element.classList.add("calltrk_numberswap")
          element.classList.add("calltrk_dnc")
        })

        // Log the number of elements marked for tracking in development
        if (process.env.NODE_ENV === "development") {
          console.log(`CallRail: Marked ${phoneElements.length} phone numbers for tracking`)
        }
      }
    }

    // Run once on mount
    markPhoneNumbersForDNI()

    // Also set up a mutation observer to handle dynamically added phone numbers
    if (typeof window !== "undefined" && window.MutationObserver) {
      const observer = new MutationObserver((mutations) => {
        let shouldCheck = false

        mutations.forEach((mutation) => {
          if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            shouldCheck = true
          }
        })

        if (shouldCheck) {
          markPhoneNumbersForDNI()
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      return () => observer.disconnect()
    }
  }, [])

  // If no account ID is available, don't render the script
  if (!accountId) {
    if (process.env.NODE_ENV === "development") {
      console.warn("CallRail: No account ID found. Dynamic Number Insertion will not work.")
    }
    return null
  }

  return (
    <>
      {/* CallRail Config */}
      <Script
        id="callrail-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.CallTrackingConfig = {
              account_id: "${accountId}",
              dni_enabled: true,
              analytics_enabled: true,
              google_analytics_enabled: true,
              google_analytics_send_calls_as: 'event',
              form_capture_enabled: true,
              session_pool_size: 1
            };
          `,
        }}
      />

      {/* CallRail Tracking Script */}
      <Script
        id="callrail-tracking"
        strategy="afterInteractive"
        src={`//cdn.callrail.com/companies/${accountId}/06b6d7a2f8e273d0c684/12/swap.js`}
        onLoad={() => {
          if (process.env.NODE_ENV === "development") {
            console.log("CallRail: Script loaded successfully")
          }
        }}
        onError={() => {
          console.error("CallRail: Failed to load script")
        }}
      />
    </>
  )
}
