"use client"

import { useState } from "react"
import Script from "next/script"

export default function VercelAnalytics() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Handle script load success
  const handleLoad = () => {
    setIsLoaded(true)
    console.log("Vercel Analytics loaded successfully")
  }

  // Handle script load error
  const handleError = (e: Error) => {
    setHasError(true)
    console.error("Error loading Vercel Analytics:", e)
  }

  return (
    <>
      <Script
        id="vercel-analytics"
        src="/_vercel/insights/script.js"
        strategy="lazyOnload"
        onLoad={handleLoad}
        onError={(e) => handleError(e)}
      />
      {/* Hidden debug info - remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div style={{ display: "none" }} data-testid="vercel-analytics-status">
          {isLoaded ? "loaded" : "loading"}
          {hasError ? " (error)" : ""}
        </div>
      )}
    </>
  )
}
