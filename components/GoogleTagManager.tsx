"use client"

import { useEffect } from "react"
import Script from "next/script"
import { clientEnv } from "@/lib/env-client"

interface GoogleTagManagerProps {
  gtmId?: string
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const id = gtmId || clientEnv.GTM_ID

  useEffect(() => {
    if (!id || id === "GTM-XXXX") {
      console.warn("GTM ID not provided or using fallback. Google Tag Manager will not be loaded.")
      return
    }

    try {
      // Initialize dataLayer if it doesn't exist
      window.dataLayer = window.dataLayer || []
    } catch (error) {
      console.error("Error initializing dataLayer:", error)
    }
  }, [id])

  // Don't render anything if GTM ID is missing or is the fallback value
  if (!id || id === "GTM-XXXX") {
    return null
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${id}');
            } catch(e) {
              console.error("Error initializing GTM:", e);
            }
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}
