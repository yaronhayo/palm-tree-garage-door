"use client"

import { Suspense, type ReactNode } from "react"
import dynamic from "next/dynamic"

interface ClientDynamicImportProps {
  importFn: () => Promise<any>
  fallback: ReactNode
  ssr?: boolean
}

export function ClientDynamicImport({ importFn, fallback, ssr = false }: ClientDynamicImportProps) {
  const DynamicComponent = dynamic(importFn, {
    loading: () => <>{fallback}</>,
    ssr,
  })

  return (
    <Suspense fallback={fallback}>
      <DynamicComponent />
    </Suspense>
  )
}
