/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "blob.v0.dev", "hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config, { dev, isServer }) => {
    // Only apply optimizations for client bundles in production
    if (!dev && !isServer) {
      // Enable terser minification
      config.optimization.minimize = true

      // Use simpler chunk splitting that won't cause SSR issues
      config.optimization.splitChunks = {
        chunks: "all",
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework chunk
          framework: {
            name: "framework",
            chunks: "all",
            // This regex matches packages that are definitely client-side only
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Library chunk for node_modules
          lib: {
            name: "commons",
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            priority: 30,
          },
          // Shared app code
          shared: {
            name: "shared",
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      }
    }

    return config
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
          // Add content security policy for better performance and security
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://res.cloudinary.com https://hebbkx1anhila5yf.public.blob.vercel-storage.com https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com; frame-src 'self'; object-src 'none'",
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
