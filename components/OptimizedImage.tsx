"use client"

import { useState } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down"
  priority?: boolean
  lazyLoad?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  objectFit = "cover",
  priority = false,
  lazyLoad = false,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [error, setError] = useState(false)

  // Handle image load error
  const handleError = () => {
    if (imgSrc !== "/placeholder.png") {
      console.warn(`Image failed to load: ${imgSrc}, using fallback`)
      setImgSrc("/placeholder.png")
    } else {
      // If even the fallback fails, set error state
      setError(true)
      console.error(`Fallback image also failed to load: /placeholder.png`)
    }
  }

  // If both original and fallback images failed, render a placeholder div
  if (error) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: width, height: height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-400 text-sm">{alt}</span>
      </div>
    )
  }

  // Determine if the image is an external URL
  const isExternalUrl = imgSrc.startsWith("http") || imgSrc.startsWith("https")

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: objectFit as any }}
      priority={priority}
      loading={lazyLoad ? "lazy" : "eager"}
      onError={handleError}
      unoptimized={isExternalUrl} // Skip optimization for external URLs
    />
  )
}
