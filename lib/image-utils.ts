/**
 * Image utilities
 *
 * This file contains all image-related utility functions.
 * It consolidates functionality from multiple image utility files.
 */

// Get image dimensions
export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      })
    }
    img.onerror = reject
    img.src = src
  })
}

// Get image aspect ratio
export function getImageAspectRatio(width: number, height: number): number {
  return width / height
}

// Format image URL with parameters
export function formatImageUrl(url: string, params: Record<string, string | number>): string {
  const urlObj = new URL(url)

  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.append(key, String(value))
  })

  return urlObj.toString()
}

// Get placeholder image URL
export function getPlaceholderImageUrl(width: number, height: number, text?: string): string {
  const baseUrl = "https://via.placeholder.com"
  return `${baseUrl}/${width}x${height}${text ? `?text=${encodeURIComponent(text)}` : ""}`
}

// Get optimized image size based on viewport
export function getOptimizedImageSize(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight

  let width = originalWidth
  let height = originalHeight

  if (width > maxWidth) {
    width = maxWidth
    height = width / aspectRatio
  }

  if (height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  }
}

// Check if image exists
export function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

// Get image file extension
export function getImageFileExtension(url: string): string | null {
  const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/)
  return match ? match[1].toLowerCase() : null
}

// Check if image is SVG
export function isSvgImage(url: string): boolean {
  return url.endsWith(".svg") || url.includes(".svg?")
}

// Convert image to base64
export async function imageToBase64(url: string): Promise<string> {
  if (typeof window === "undefined") {
    return ""
  }

  try {
    const response = await fetch(url)
    const blob = await response.blob()

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error("Error converting image to base64:", error)
    return ""
  }
}
