"use client"

import { useEffect } from "react"
import Head from "next/head"

export default function ResponsiveMetaTags() {
  // Add canonical URL with current path
  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href.split("#")[0] // Remove hash

    // Find existing canonical link or create a new one
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement

    if (!canonicalLink) {
      canonicalLink = document.createElement("link")
      canonicalLink.rel = "canonical"
      document.head.appendChild(canonicalLink)
    }

    // Set the href to the current URL without hash
    canonicalLink.href = currentUrl
  }, [])

  return (
    <Head>
      {/* Mobile viewport optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=5" />

      {/* Mobile browser theme colors */}
      <meta name="theme-color" content="#0D423A" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Geo meta tags for local SEO */}
      <meta name="geo.region" content="US-FL" />
      <meta name="geo.placename" content="South Florida" />
      <meta name="geo.position" content="26.1224386;-80.1373174" />
      <meta name="ICBM" content="26.1224386, -80.1373174" />

      {/* Local business meta tags */}
      <meta name="business:contact_data:street_address" content="South Florida" />
      <meta name="business:contact_data:locality" content="South Florida" />
      <meta name="business:contact_data:region" content="FL" />
      <meta name="business:contact_data:postal_code" content="33301" />
      <meta name="business:contact_data:country_name" content="USA" />
      <meta name="business:contact_data:email" content="palmtreegaragedoor@gmail.com" />
      <meta name="business:contact_data:phone_number" content="+13213669723" />
      <meta name="business:contact_data:website" content="https://palmtreegaragedoor.com" />

      {/* Social media verification */}
      <meta name="facebook-domain-verification" content="your-verification-code" />
      <meta name="google-site-verification" content="your-verification-code" />
    </Head>
  )
}
