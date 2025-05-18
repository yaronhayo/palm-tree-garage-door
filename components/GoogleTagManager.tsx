"use client"

import { useEffect } from "react"
import Script from "next/script"
import { getRequiredEnvVar } from "@/lib/env-client"

interface GoogleTagManagerProps {
  gtmId?: string
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const gtmTrackingId = gtmId || getRequiredEnvVar("NEXT_PUBLIC_GTM_ID", "GTM-XXXX")

  useEffect(() => {
    if (!gtmTrackingId || gtmTrackingId === "GTM-XXXX") {
      console.warn("GTM ID is missing or using fallback value. Google Tag Manager will not work correctly.")
    }
  }, [gtmTrackingId])

  if (!gtmTrackingId || gtmTrackingId === "GTM-XXXX") {
    // Return empty fragment if GTM ID is missing or using fallback
    return null
  }

  return (
    <>
      {/* Google Tag Manager - Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmTrackingId}');
          `,
        }}
      />
      {/* Google Tag Manager - NoScript */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmTrackingId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}
