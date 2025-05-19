import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CookieConsent } from "@/components/CookieConsent"
import FloatingContactButton from "@/components/FloatingContactButton"
import { SocialProofPopup } from "@/components/SocialProofPopup"

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
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Palm Tree Garage Door Repair",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo.png"],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D423A",
}

// Simple error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return <>{children}</>
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
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingContactButton />
          <CookieConsent />
          <SocialProofPopup />
        </ErrorBoundary>
      </body>
    </html>
  )
}
