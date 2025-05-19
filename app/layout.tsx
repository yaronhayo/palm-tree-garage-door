import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CookieConsent } from "@/components/CookieConsent"
import { Suspense, lazy } from "react"
import SchemaMarkup from "@/components/SchemaMarkup"

// Lazy load non-critical components
const FloatingContactButton = lazy(() => import("@/components/FloatingContactButton"))
const SocialProofPopup = lazy(() =>
  import("@/components/SocialProofPopup").then((mod) => ({
    default: mod.SocialProofPopup,
  })),
)

// Optimize font loading with display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

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
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />

          {/* Lazy load non-critical UI elements */}
          <Suspense fallback={null}>
            <FloatingContactButton />
          </Suspense>

          <Suspense fallback={null}>
            <CookieConsent />
          </Suspense>

          <Suspense fallback={null}>
            <SocialProofPopup />
          </Suspense>

          <Suspense fallback={null}>
            <SchemaMarkup page="home" />
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  )
}
