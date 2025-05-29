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

// Optimize font loading with display swap and subset
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | Garage Door Springs Repair FL",
    default: "Garage Door Springs Repair FL | South Florida's Trusted Garage Door Experts",
  },
  description:
    "Garage Door Springs Repair FL provides professional garage door repair and installation services in South Florida. 24/7 emergency service, free estimates, and expert technicians for all garage door needs.",
  keywords: [
    "Garage Door Springs Repair FL",
    "garage door repair South Florida",
    "garage door installation",
    "garage door service",
    "South Florida garage door company",
    "emergency garage door repair",
    "garage door spring replacement",
    "garage door opener repair",
    "Garage Door Springs Repair FL",
    "best garage door company South Florida",
  ],
  authors: [{ name: "Garage Door Springs Repair FL" }],
  creator: "Garage Door Springs Repair FL",
  publisher: "Garage Door Springs Repair FL",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://garagedoorspringsrepairfl.com/",
    siteName: "Garage Door Springs Repair FL",
    title: "Garage Door Springs Repair FL | South Florida's Trusted Garage Door Experts",
    description:
      "Professional garage door repair and installation services in South Florida. 24/7 emergency service by Garage Door Springs Repair FL experts.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Garage Door Springs Repair FL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garage Door Springs Repair FL | South Florida's Trusted Garage Door Experts",
    description:
      "Professional garage door repair and installation services in South Florida by Garage Door Springs Repair FL.",
    images: ["/logo.png"],
    creator: "@garagedoorspringsrepairfl",
  },
  alternates: {
    canonical: "https://garagedoorspringsrepairfl.com",
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

// Critical CSS for above-the-fold content
const criticalCSS = `
  :root{--background:0 0% 100%;--foreground:222.2 84% 4.9%;--primary:164 55% 23%;--primary-foreground:210 40% 98%;--accent:84 67% 64%;--accent-foreground:164 55% 23%;--radius:0.5rem}
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:var(--font-inter),system-ui,-apple-system,sans-serif;background:#fff;color:#020817;line-height:1.5;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  .container{width:100%;max-width:1280px;margin:0 auto;padding:0 1rem}
  .bg-primary-800{background-color:#0d423a}
  .text-white{color:#fff}
  .text-accent-500{color:#9adf67}
  .bg-white{background-color:#fff}
  .bg-accent-500{background-color:#9adf67}
  .text-primary-900{color:#072722}
  .font-bold{font-weight:700}
  h1{font-size:2.25rem;font-weight:700;line-height:1.2;margin-bottom:1.5rem}
  @media(min-width:640px){h1{font-size:3rem}}
  img{max-width:100%;height:auto}
  .hero-section{position:relative;padding-top:7rem;padding-bottom:5rem}
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Use the correct GTM container ID that's already working on the site
  const gtmId = "GTM-WPZNV4T3"

  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <ResponsiveMetaTags />

        {/* Critical CSS inline for immediate rendering */}
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />

        {/* DNS prefetch for additional performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preload critical resources */}
        <link rel="preload" href="/logo.png" as="image" type="image/png" fetchPriority="high" />
        <link
          rel="preload"
          href="/images/service-truck.png"
          as="image"
          type="image/png"
          fetchPriority="high"
          media="(min-width: 768px)"
        />

        {/* Google Tag Manager */}
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ErrorBoundary>
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />

          {/* Defer non-critical components */}
          <div suppressHydrationWarning>
            <CookieConsent />
            <SocialProofPopup />
            <SchemaMarkup page="home" />
            <GoogleTagManager gtmId={gtmId} />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
