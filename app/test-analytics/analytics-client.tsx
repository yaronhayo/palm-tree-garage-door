"use client"

import { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import client components
const VercelAnalyticsScript = dynamic(() => import("../vercel-analytics"), {
  ssr: false,
})

const VercelSpeedInsightsScript = dynamic(() => import("../vercel-speed-insights"), {
  ssr: false,
})

export default function AnalyticsClient() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <Suspense fallback={null}>
        <VercelAnalyticsScript />
      </Suspense>

      <Suspense fallback={null}>
        <VercelSpeedInsightsScript />
      </Suspense>
    </>
  )
}
