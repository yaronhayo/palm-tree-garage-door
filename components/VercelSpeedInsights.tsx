"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

export default function VercelSpeedInsights() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Handle script load success
  const handleLoad = () => {
    setIsLoaded(true)
    if (process.env.NODE_ENV === "development") {
      console.log("Vercel Speed Insights loaded successfully")
    }
  }

  // Handle script load error
  const handleError = (error: Error) => {
    setHasError(true)
    console.error("Error loading Vercel Speed Insights:", error)
  }

  // Log status in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return () => {
        console.log("Vercel Speed Insights unmounted")
      }
    }
  }, [])

  return (
    <>
      <Script
        id="vercel-speed-insights"
        src="/_vercel/speed-insights/script.js"
        strategy="lazyOnload"
        onLoad={handleLoad}
        onError={(e) => handleError(e as Error)}
      />
      {process.env.NODE_ENV === "development" && (
        <div style={{ display: "none" }} data-testid="speed-insights-status">
          {isLoaded ? "loaded" : hasError ? "error" : "loading"}
        </div>
      )}
    </>
  )
}
