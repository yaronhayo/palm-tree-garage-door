"use client"

import { useEffect } from "react"

interface GoogleTagManagerProps {
  gtmId: string
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  // Initialize dataLayer
  useEffect(() => {
    window.dataLayer = window.dataLayer || []
  }, [])

  return null // The actual script is added directly in layout.tsx
}
