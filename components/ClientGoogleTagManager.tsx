"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Dynamically import the SimpleGoogleTagManager component with ssr: false
const SimpleGoogleTagManager = dynamic(() => import("@/components/SimpleGoogleTagManager"), { ssr: false })

interface ClientGoogleTagManagerProps {
  gtmId: string
}

export default function ClientGoogleTagManager({ gtmId }: ClientGoogleTagManagerProps) {
  return (
    <Suspense fallback={null}>
      <SimpleGoogleTagManager gtmId={gtmId} />
    </Suspense>
  )
}
