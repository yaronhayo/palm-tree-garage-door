"use client"

import Script from "next/script"

export default function CallRailTracking() {
  return (
    <Script
      id="callrail-tracking"
      strategy="lazyOnload"
      src="//cdn.callrail.com/companies/988425603/06b6d7a2f8e273d0c684/12/swap.js"
    />
  )
}
