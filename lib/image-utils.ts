/**
 * Image utility functions
 */

/**
 * Get image dimensions from a URL
 */
export async function getImageDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      })
    }
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${url}`))
    }
    img.src = url
  })
}

/**
 * Check if an image exists
 */
export async function imageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok
  } catch (error) {
    return false
  }
}

/**
 * Get a fallback image URL if the primary one fails
 */
export function getFallbackImageUrl(primaryUrl: string, fallbackUrl: string): string {
  return primaryUrl || fallbackUrl || "/placeholder.png"
}

/**
 * Generate a responsive image srcSet
 */
export function generateSrcSet(baseUrl: string, widths: number[]): string {
  return widths
    .map((width) => {
      // This assumes your image service supports width parameters
      // Adjust according to your actual image service
      const url = `${baseUrl}?width=${width}`
      return `${url} ${width}w`
    })
    .join(", ")
}

/**
 * Generate image sizes attribute for responsive images
 */
export function generateSizes(sizes: { breakpoint: number; width: string }[]): string {
  return sizes.map(({ breakpoint, width }) => `(max-width: ${breakpoint}px) ${width}`).join(", ")
}
