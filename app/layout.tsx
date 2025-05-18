import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import GoogleTagManager from "@/components/GoogleTagManager"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { getRequiredEnvVar } from "@/lib/env-client"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Palm Tree Garage Door Repair",
    default: "Palm Tree Garage Door Repair | South Florida's Trusted Experts",
  },
  description:
    "Fast, reliable garage door repair in South Florida. 24/7 emergency service, free estimates, and expert technicians. Call now!",
  metadataBase: new URL(process.env.SITE_URL || "https://palmtreegaragedoor.com"),
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D423A",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get GTM ID with fallback
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || getRequiredEnvVar("GTM_ID", "GTM-XXXX")

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <GoogleTagManager gtmId={gtmId} />
          <main>{children}</main>
        </ErrorBoundary>
      </body>
    </html>
  )
}
