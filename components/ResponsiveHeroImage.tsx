"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ResponsiveHeroImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export default function ResponsiveHeroImage({ src, alt, className = "", priority = true }: ResponsiveHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Reset loaded state when src changes
  useEffect(() => {
    setIsLoaded(false)
  }, [src])

  // Convert to WebP if possible
  const webpSrc = src.endsWith(".webp") ? src : src.replace(/\.(jpe?g|png|gif)$/i, ".webp")

  // Create responsive image sources
  const imageSources = [
    { src: webpSrc, type: "image/webp" },
    { src, type: "image/jpeg" }, // Fallback to original format
  ]

  return (
    <div className="relative w-full h-full">
      {/* Low quality placeholder */}
      {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

      <picture>
        {imageSources.map((source, index) => (
          <source key={index} srcSet={source.src} type={source.type} />
        ))}

        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          priority={priority}
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
          onLoad={() => setIsLoaded(true)}
          style={{ objectFit: "cover" }}
        />
      </picture>
    </div>
  )
}
