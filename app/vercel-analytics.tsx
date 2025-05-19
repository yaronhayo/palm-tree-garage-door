"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function VercelAnalyticsScript() {
  useEffect(() => {
    // Clean up function
    return () => {
      // Clean up any listeners if needed
    }
  }, [])

  return (
    <Script
      src="/_vercel/insights/script.js"
      strategy="lazyOnload"
      data-debug={process.env.NODE_ENV === "development" ? "true" : "false"}
    />
  )
}
