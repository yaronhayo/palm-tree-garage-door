"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down"
  priority?: boolean
  lazyLoad?: boolean
  sizes?: string
  decorative?: boolean
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  objectFit = "cover",
  priority = false,
  lazyLoad = true,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  decorative = false,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Reset state when src changes
  useEffect(() => {
    setImgSrc(src)
    setIsLoaded(false)
    setError(false)
  }, [src])

  // Convert image URL to WebP if possible
  const getWebPUrl = (url: string): string => {
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

  // Handle image load error
  const handleError = () => {
    // If WebP failed, try original format
    if (imgSrc !== src && !error) {
      console.warn(`WebP image failed to load: ${imgSrc}, falling back to original format`)
      setImgSrc(src)
      setError(true)
      return
    }

    // If original format also failed, use fallback
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
        style={{ width: width || "100%", height: height || "100%" }}
        role={decorative ? "presentation" : "img"}
        aria-label={!decorative ? alt : undefined}
      >
        <span className="text-gray-400 text-sm">{!decorative ? alt : ""}</span>
      </div>
    )
  }

  // Determine if the image is an external URL
  const isExternalUrl = imgSrc.startsWith("http") || imgSrc.startsWith("https")

  // Common props for both fill and fixed size images
  const commonProps = {
    src: getWebPUrl(imgSrc),
    alt: decorative ? "" : alt,
    className: `transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`,
    style: fill ? { objectFit: objectFit as any } : undefined,
    priority: priority,
    loading: !priority && lazyLoad ? "lazy" : undefined,
    onLoad: () => setIsLoaded(true),
    onError: handleError,
    sizes: sizes,
    unoptimized: isExternalUrl, // Skip optimization for external URLs
  }

  return (
    <div className={`relative ${fill ? "w-full h-full" : ""}`}>
      {/* Low quality placeholder */}
      {!isLoaded && (
        <div
          className={`${fill ? "absolute inset-0" : ""} bg-gray-200 animate-pulse`}
          style={!fill ? { width, height } : undefined}
        />
      )}

      {fill ? <Image fill {...commonProps} /> : <Image width={width || 100} height={height || 100} {...commonProps} />}
    </div>
  )
}
