/**
 * Comprehensive image utilities for the application
 */

// Check if we're in the browser
const isBrowser = typeof window !== "undefined"

/**
 * Convert image URL to WebP format if possible
 */
export function getWebPUrl(url: string): string {
  // If it's already a WebP or SVG, return as is
  if (url.endsWith(".webp") || url.endsWith(".svg")) return url

  // If it's a Cloudinary URL, add WebP format
  if (url.includes("res.cloudinary.com")) {
    return url.replace(/\.(jpe?g|png)/i, ".webp")
  }

  // If it's a Vercel Blob URL, we can't modify it
  if (url.includes("blob.vercel-storage.com")) return url

  // For local images, try to use WebP version if available
  const urlWithoutExt = url.replace(/\.(jpe?g|png|gif)$/i, "")
  return `${urlWithoutExt}.webp`
}

/**
 * Generate responsive image sizes string for Next.js Image component
 */
export function generateImageSizes(mobile = "100vw", tablet = "50vw", desktop = "33vw"): string {
  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`
}

/**
 * Get image dimensions from URL if possible
 * Works with Cloudinary URLs that include dimensions
 */
export function getImageDimensionsFromUrl(url: string): { width: number; height: number } | null {
  // Default dimensions if we can't determine
  const defaultDimensions = { width: 1200, height: 800 }

  try {
    // Check for Cloudinary URLs with dimensions
    if (url.includes("res.cloudinary.com")) {
      const match = url.match(/\/w_(\d+),h_(\d+)\//)
      if (match && match[1] && match[2]) {
        return {
          width: Number.parseInt(match[1], 10),
          height: Number.parseInt(match[2], 10),
        }
      }
    }

    return defaultDimensions
  } catch (error) {
    console.error("Error parsing image dimensions:", error)
    return defaultDimensions
  }
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(imageUrls: string[]): void {
  if (!isBrowser) return

  imageUrls.forEach((url) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = url
    link.type = url.endsWith(".svg") ? "image/svg+xml" : url.endsWith(".webp") ? "image/webp" : "image/png"
    document.head.appendChild(link)
  })
}

/**
 * Check if an image exists
 */
export async function checkImageExists(url: string): Promise<boolean> {
  if (!isBrowser) return true

  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    console.error(`Error checking if image exists: ${url}`, error)
    return false
  }
}

/**
 * Get appropriate image format based on browser support
 */
export function getOptimalImageFormat(): "webp" | "avif" | "original" {
  if (!isBrowser) return "webp"

  // Check for AVIF support
  if (document.createElement("canvas").toDataURL("image/avif").indexOf("data:image/avif") === 0) {
    return "avif"
  }

  // Check for WebP support
  if (document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0) {
    return "webp"
  }

  return "original"
}
