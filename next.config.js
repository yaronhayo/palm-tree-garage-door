/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "blob.v0.dev", "hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  // Remove the experimental optimizeCss option that's causing the error
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Redirect configuration for old website URLs
  async redirects() {
    return [
      // Specific redirects for old garagedoorspringsrepairfl.com URLs
      {
        source: "/port-st-lucie-springs-repair",
        destination: "/services/garage-door-spring-replacement",
        permanent: true,
      },
      {
        source: "/port-st-lucie-services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/our-services",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/melbourne-opener-repair",
        destination: "/services/garage-door-opener-repair",
        permanent: true,
      },
      {
        source: "/military-discounts",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/opener-repair",
        destination: "/services/garage-door-opener-repair",
        permanent: true,
      },
      {
        source: "/melbourne-fl-springs-repair",
        destination: "/services/garage-door-spring-replacement",
        permanent: true,
      },
      {
        source: "/port-st-lucie-opener-repair",
        destination: "/services/garage-door-opener-repair",
        permanent: true,
      },
      {
        source: "/services-6",
        destination: "/#services",
        permanent: true,
      },
      {
        source: "/_frog",
        destination: "/",
        permanent: true,
      },

      // Common patterns for location-based service pages
      {
        source: "/:location(.*)-springs-repair",
        destination: "/services/garage-door-spring-replacement",
        permanent: true,
      },
      {
        source: "/:location(.*)-opener-repair",
        destination: "/services/garage-door-opener-repair",
        permanent: true,
      },
      {
        source: "/:location(.*)-services",
        destination: "/#services",
        permanent: true,
      },

      // Other common old URL patterns
      {
        source: "/about-us",
        destination: "/#about",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/#contact",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/#testimonials",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/:path*",
        destination: "/#services",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
