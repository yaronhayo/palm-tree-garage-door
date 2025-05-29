/**
 * Performance configuration and optimization settings
 */

export const performanceConfig = {
  // Image optimization settings
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    quality: 85,
  },

  // Resource hints
  resourceHints: {
    preconnect: [
      "https://res.cloudinary.com",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
    dnsPrefetch: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
  },

  // Critical resources to preload
  criticalResources: [
    { href: "/logo.png", as: "image", type: "image/png" },
    { href: "/images/service-truck.png", as: "image", type: "image/png" },
  ],

  // Lazy loading configuration
  lazyLoading: {
    rootMargin: "50px",
    threshold: 0.01,
  },

  // Performance budgets
  budgets: {
    javascript: 150 * 1024, // 150KB
    css: 50 * 1024, // 50KB
    images: 1000 * 1024, // 1MB total
    fonts: 100 * 1024, // 100KB
  },

  // Cache control headers
  cacheControl: {
    static: "public, max-age=31536000, immutable",
    images: "public, max-age=31536000, immutable",
    json: "public, max-age=3600, stale-while-revalidate=86400",
    html: "public, max-age=0, must-revalidate",
  },
}

// Performance monitoring thresholds
export const performanceThresholds = {
  lcp: 2500, // 2.5s
  fid: 100, // 100ms
  cls: 0.1, // 0.1
  ttfb: 800, // 800ms
  fcp: 1800, // 1.8s
  tbt: 200, // 200ms
}

// Optimization utilities
export function shouldOptimizeImage(size: number): boolean {
  return size > 50 * 1024 // Optimize images larger than 50KB
}

export function getOptimalImageFormat(userAgent?: string): string {
  if (!userAgent) return "webp"

  // Check for AVIF support
  if (userAgent.includes("Chrome") || userAgent.includes("Firefox")) {
    return "avif"
  }

  // Default to WebP
  return "webp"
}

export function calculatePriority(element: string): "high" | "low" | "auto" {
  const highPriorityElements = ["hero-image", "logo", "above-fold"]

  if (highPriorityElements.some((el) => element.includes(el))) {
    return "high"
  }

  return "auto"
}
