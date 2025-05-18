import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { GoogleTagManager } from "@/components/GoogleTagManager"
import { CookieConsent } from "@/components/CookieConsent"
import FloatingContactButton from "@/components/FloatingContactButton"
import LocalBusinessSchema from "@/components/schema/LocalBusinessSchema"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { clientEnv } from "@/lib/env-client"
import DiagnosticInfo from "@/components/DiagnosticInfo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Palm Tree Garage Door Repair",
    default: "Palm Tree Garage Door Repair | South Florida's Trusted Experts",
  },
  description:
    "Professional garage door repair and installation services in South Florida. 24/7 emergency service, free estimates, and expert technicians.",
  keywords: [
    "garage door repair",
    "garage door installation",
    "garage door service",
    "South Florida",
    "emergency garage door repair",
    "garage door spring replacement",
    "garage door opener repair",
  ],
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <GoogleTagManager gtmId={clientEnv.GTM_ID} />
          <LocalBusinessSchema />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingContactButton />
          <CookieConsent />
          {process.env.NODE_ENV !== "production" && <DiagnosticInfo />}
        </ErrorBoundary>
      </body>
    </html>
  )
}
