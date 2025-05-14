import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { GTM_ID } from "@/lib/gtm"
import { seo } from "@/lib/_SEO"
import LocalBusinessSchema from "@/components/LocalBusinessSchema"
import GTMContainer from "@/components/GTMContainer"

export const metadata: Metadata = {
  ...seo.defaultMetadata,
  title: "Garage Door Repair South Florida | Palm Tree Garage Door",
  description:
    "24/7 emergency garage door repair in South Florida. Fast response, certified technicians, and free estimates. Call now for same-day service!",
  openGraph: {
    ...seo.defaultMetadata.openGraph,
    title: "Garage Door Repair South Florida | Palm Tree Garage Door",
    description:
      "24/7 emergency garage door repair in South Florida. Fast response, certified technicians, and free estimates. Call now for same-day service!",
  },
  twitter: {
    ...seo.defaultMetadata.twitter,
    title: "Garage Door Repair South Florida | Palm Tree Garage Door",
    description:
      "24/7 emergency garage door repair in South Florida. Fast response, certified technicians, and free estimates. Call now for same-day service!",
  },
}

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* Google Tag Manager - No Script */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

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
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      <LocalBusinessSchema />
      <GTMContainer />
      {children}
    </>
  )
}
