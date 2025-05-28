import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SchemaMarkup from "@/components/SchemaMarkup"
import GoogleTagManager from "@/components/GoogleTagManager"
import { CookieConsent } from "@/components/CookieConsent"
import SocialProofPopup from "@/components/SocialProofPopup"
import ResponsiveMetaTags from "@/components/ResponsiveMetaTags"
import { ErrorBoundary } from "@/components/ErrorBoundary"

// Optimize font loading with display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Palm Tree Garage Door Repair",
    default: "Palm Tree Garage Door Repair | South Florida's Trusted Garage Door Experts",
  },
  description:
    "Palm Tree Garage Door provides professional garage door repair and installation services in South Florida. 24/7 emergency service, free estimates, and expert technicians for all garage door needs.",
  keywords: [
    "Palm Tree Garage Door",
    "garage door repair South Florida",
    "garage door installation",
    "garage door service",
    "South Florida garage door company",
    "emergency garage door repair",
    "garage door spring replacement",
    "garage door opener repair",
    "Palm Tree Garage Door Repair",
    "best garage door company South Florida",
  ],
  authors: [{ name: "Palm Tree Garage Door" }],
  creator: "Palm Tree Garage Door",
  publisher: "Palm Tree Garage Door",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://palmtreegaragedoor.com/",
    siteName: "Palm Tree Garage Door Repair",
    title: "Palm Tree Garage Door Repair | South Florida's Trusted Garage Door Experts",
    description:
      "Professional garage door repair and installation services in South Florida. 24/7 emergency service by Palm Tree Garage Door experts.",
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
    title: "Palm Tree Garage Door Repair | South Florida's Trusted Garage Door Experts",
    description: "Professional garage door repair and installation services in South Florida by Palm Tree Garage Door.",
    images: ["/logo.png"],
    creator: "@palmtreegaragedoor",
  },
  alternates: {
    canonical: "https://palmtreegaragedoor.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D423A",
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || process.env.GTM_ID || "GTM-MF948JFL"

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <ResponsiveMetaTags />

        {/* Preload critical assets */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        <link rel="preload" href="/images/service-truck.png" as="image" type="image/png" />
        <link rel="preload" href="/images/garage-door-repair-service.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical CSS */}
        <link
          rel="preload"
          href={`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`}
          as="style"
        />

        {/* Google Tag Manager - placed as high as possible in the head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Google Tag Manager (noscript) - placed immediately after opening body tag */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ErrorBoundary>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />

          {/* Non-critical UI elements */}
          <CookieConsent />
          <SocialProofPopup />
          <SchemaMarkup page="home" />

          {/* Initialize GoogleTagManager component for dataLayer */}
          <GoogleTagManager gtmId={gtmId} />
        </ErrorBoundary>
      </body>
    </html>
  )
}
