"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/images/default-garage-door.png",
  objectFit = "cover",
  className = "",
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : fallbackSrc)
  const [error, setError] = useState(false)

  // Handle image load error
  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      console.warn(`Image failed to load: ${imgSrc}, using fallback`)
      setImgSrc(fallbackSrc)
    } else {
      // If even the fallback fails, set error state
      setError(true)
      console.error(`Fallback image also failed to load: ${fallbackSrc}`)
    }
  }

  // If both original and fallback images failed, render a placeholder div
  if (error) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: props.width, height: props.height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-400 text-sm">{alt}</span>
      </div>
    )
  }

  // Determine object-fit style
  const objectFitClass =
    objectFit === "cover"
      ? "object-cover"
      : objectFit === "contain"
        ? "object-contain"
        : objectFit === "fill"
          ? "object-fill"
          : objectFit === "none"
            ? "object-none"
            : objectFit === "scale-down"
              ? "object-scale-down"
              : "object-cover"

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      className={`${objectFitClass} ${className}`}
      onError={handleError}
      {...props}
    />
  )
}
