"use client"

import Script from "next/script"

interface ClientScriptProps {
  id: string
  src: string
  strategy: "beforeInteractive" | "afterInteractive" | "lazyOnload"
}

export default function ClientScript({ id, src, strategy }: ClientScriptProps) {
  return (
    <Script
      id={id}
      strategy={strategy}
      src={src}
      onLoad={() => {
        console.log(`${id} script loaded successfully`)
      }}
      onError={(e) => {
        console.error(`Error loading ${id} script:`, e)
      }}
    />
  )
}
