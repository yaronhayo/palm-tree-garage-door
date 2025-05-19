"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function VercelSpeedInsightsScript() {
  useEffect(() => {
    // Clean up function
    return () => {
      // Clean up any listeners if needed
    }
  }, [])

  return (
    <Script
      src="/_vercel/speed-insights/script.js"
      strategy="lazyOnload"
      data-debug={process.env.NODE_ENV === "development" ? "true" : "false"}
    />
  )
}
