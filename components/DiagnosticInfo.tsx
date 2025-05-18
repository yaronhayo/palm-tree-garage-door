"use client"

import { useState, useEffect } from "react"

export default function DiagnosticInfo() {
  const [info, setInfo] = useState<Record<string, any>>({
    loading: true,
  })

  useEffect(() => {
    try {
      // Only collect safe diagnostic information
      const diagnosticInfo = {
        loading: false,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        environment: {
          nodeEnv: process.env.NODE_ENV,
          // Only include safe public variables
          publicVars: Object.keys(process.env).filter(
            (key) =>
              key.startsWith("NEXT_PUBLIC_") &&
              !key.includes("KEY") &&
              !key.includes("SECRET") &&
              !key.includes("TOKEN") &&
              !key.includes("PASSWORD"),
          ).length,
        },
      }

      setInfo(diagnosticInfo)
    } catch (error) {
      setInfo({
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }, [])

  // Only render in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs overflow-auto max-h-60">
      <h3 className="font-bold mb-2">Diagnostic Info</h3>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
  )
}
