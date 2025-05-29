"use client"

import { useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface GoogleTagManagerProps {
  gtmId: string
}

declare global {
  interface Window {
    dataLayer: any[]
  }
}

function GTMInner({ gtmId }: GoogleTagManagerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return

    const pagePath = pathname + (searchParams ? `?${searchParams.toString()}` : "")

    window.dataLayer.push({
      event: "page_view",
      page: {
        path: pathname,
        title: document.title,
        search: searchParams?.toString() || "",
        url: window.location.href,
      },
    })
    console.log(`[GTM] Page view tracked: ${pagePath}`)
  }, [pathname, searchParams])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    })
    console.log(`[GTM] Initialized with ID: ${gtmId}`)
  }, [gtmId])

  return null
}

export default function GoogleTagManager(props: GoogleTagManagerProps) {
  return (
    <Suspense fallback={null}>
      <GTMInner {...props} />
    </Suspense>
  )
}
