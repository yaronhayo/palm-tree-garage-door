"use client"

// components/GoogleTagManager.tsx
// This component is responsible for injecting the Google Tag Manager script into the page.

import { useEffect } from "react"

interface GoogleTagManagerProps {
  gtmId: string
}

const GoogleTagManager = ({ gtmId }: GoogleTagManagerProps) => {
  useEffect(() => {
    if (!gtmId) {
      console.warn("GTM ID is missing. Google Tag Manager will not be initialized.")
      return
    }

    const script = document.createElement("script")
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`
    script.async = true
    document.head.insertBefore(script, document.head.firstChild)

    const dataLayerScript = document.createElement("script")
    dataLayerScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `
    document.head.insertBefore(dataLayerScript, document.head.firstChild)
  }, [gtmId])

  return null // This component doesn't render anything visible
}

export default GoogleTagManager
