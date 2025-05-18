"use client"

import { useEffect } from "react"
import Script from "next/script"
import { getRequiredEnvVar } from "@/lib/env-client"

interface GoogleAdsConversionProps {
  conversionId?: string
  conversionLabel?: string
  value?: number
  currency?: string
  transactionId?: string
}

export default function GoogleAdsConversion({
  conversionId,
  conversionLabel,
  value = 0,
  currency = "USD",
  transactionId,
}: GoogleAdsConversionProps) {
  // Get conversion ID and label from props or environment variables
  const adsConversionId = conversionId || getRequiredEnvVar("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID", "")
  const adsConversionLabel = conversionLabel || getRequiredEnvVar("NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL", "")

  useEffect(() => {
    // Log warning if conversion ID or label is missing
    if (!adsConversionId || !adsConversionLabel) {
      console.warn("Google Ads conversion tracking is missing required parameters")
      return
    }

    try {
      // Push conversion to dataLayer if available
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "conversion",
          send_to: `${adsConversionId}/${adsConversionLabel}`,
          value: value,
          currency: currency,
          transaction_id: transactionId,
        })

        // Log in development
        if (process.env.NODE_ENV !== "production") {
          console.log("Google Ads conversion tracked:", {
            send_to: `${adsConversionId}/${adsConversionLabel}`,
            value,
            currency,
            transaction_id: transactionId,
          })
        }
      }
    } catch (error) {
      console.error("Error tracking Google Ads conversion:", error)
    }
  }, [adsConversionId, adsConversionLabel, value, currency, transactionId])

  // If conversion ID or label is missing, don't render anything
  if (!adsConversionId || !adsConversionLabel) {
    return null
  }

  return (
    <>
      {/* Google Ads Conversion Tracking Script */}
      <Script
        id="google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${adsConversionId}');
          `,
        }}
      />

      {/* Noscript fallback for users with JavaScript disabled */}
      <noscript>
        <div
          style={{ display: "inline" }}
          dangerouslySetInnerHTML={{
            __html: `
              <img height="1" width="1" style="border-style:none;" alt="" 
              src="//www.googleadservices.com/pagead/conversion/${adsConversionId}/?label=${adsConversionLabel}&amp;guid=ON&amp;script=0"/>
            `,
          }}
        />
      </noscript>
    </>
  )
}
