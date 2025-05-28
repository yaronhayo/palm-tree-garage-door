/**
 * Optimizes image loading and processing
 */

// Define common image sizes for responsive images
export const imageSizes = {
  thumbnail: { width: 100, height: 100 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 900, height: 600 },
  hero: { width: 1200, height: 600 },
  full: { width: 1920, height: 1080 },
}

// Generate srcSet for responsive images
export function generateSrcSet(basePath: string, formats = ["webp", "jpg"]) {
  const widths = [320, 640, 960, 1280, 1920]

  return formats.map((format) => {
    const srcSet = widths.map((width) => `${basePath}?w=${width}&fmt=${format} ${width}w`).join(", ")

    return {
      type: `image/${format}`,
      srcSet,
    }
  })
}

// Generate sizes attribute for responsive images
export function generateSizes(sizes = "100vw") {
  return sizes
}

// Preload critical images
export function preloadCriticalImages(images: string[]) {
  if (typeof window === "undefined") return

  images.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    link.type = "image/webp" // Assume WebP for best performance
    document.head.appendChild(link)
  })
}

// Calculate aspect ratio to prevent layout shifts
export function calculateAspectRatio(width: number, height: number) {
  return (height / width) * 100
}

// Generate blur data URL placeholder
export function generateBlurPlaceholder(width = 10, height = 10, color = "lightgray") {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E`
}

// Optimize image loading based on viewport
export function shouldLazyLoad(priority: boolean, isAboveTheFold: boolean) {
  return !priority && !isAboveTheFold
}

// Get appropriate image quality based on connection
export function getOptimalQuality() {
  if (typeof navigator === "undefined") return 75

  // Check connection type if available
  if ("connection" in navigator) {
    const connection = (navigator as any).connection
    if (connection) {
      const { effectiveType, saveData } = connection

      // Lower quality for slow connections or data saver
      if (saveData) return 60

      // Adjust quality based on connection type
      switch (effectiveType) {
        case "4g":
          return 80
        case "3g":
          return 70
        case "2g":
          return 60
        case "slow-2g":
          return 50
        default:
          return 75
      }
    }
  }

  return 75 // Default quality
}
