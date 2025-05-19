/**
 * Utility functions for image optimization
 */

// Generate responsive image URLs for different sizes
export function getResponsiveImageUrl(baseUrl: string, widths: number[] = [640, 750, 1080, 1920]): string[] {
  // If it's a Cloudinary URL, use their transformation API
  if (baseUrl.includes("res.cloudinary.com")) {
    return widths.map((width) => {
      // Extract the upload path from the URL
      const uploadIndex = baseUrl.indexOf("/upload/")
      if (uploadIndex === -1) return baseUrl

      const prefix = baseUrl.substring(0, uploadIndex + 8) // Include '/upload/'
      const suffix = baseUrl.substring(uploadIndex + 8)

      // Add width transformation and format
      return `${prefix}w_${width},f_auto,q_auto/${suffix}`
    })
  }

  // For Vercel Blob URLs, we can't modify them
  if (baseUrl.includes("blob.vercel-storage.com")) {
    return [baseUrl]
  }

  // For local images, assume we have different sizes available
  const urlWithoutExt = baseUrl.replace(/\.(jpe?g|png|gif|webp)$/i, "")
  const ext = baseUrl.match(/\.(jpe?g|png|gif|webp)$/i)?.[0] || ".webp"

  return widths.map((width) => `${urlWithoutExt}-${width}w${ext}`)
}

// Generate srcset attribute for responsive images
export function generateSrcSet(baseUrl: string, widths: number[] = [640, 750, 1080, 1920]): string {
  const urls = getResponsiveImageUrl(baseUrl, widths)
  return urls.map((url, index) => `${url} ${widths[index]}w`).join(", ")
}

// Convert image URL to WebP format
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

// Calculate aspect ratio for an image
export function calculateAspectRatio(width: number, height: number): string {
  return `${(height / width) * 100}%`
}
