"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedHeroImageProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
  width?: number
  height?: number
  quality?: number
  sizes?: string
  placeholder?: string
  blurDataURL?: string
  onLoad?: () => void
}

export default function OptimizedHeroImage({
  src,
  alt,
  priority = true,
  className,
  width = 1920,
  height = 1080,
  quality = 85,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw",
  placeholder = "blur",
  blurDataURL,
  onLoad,
}: OptimizedHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Preload the image
    const img = new Image()
    img.src = src
    return () => {
      img.onload = null
    }
  }, [src])

  const handleImageLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={cn(
          "w-full h-auto object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={handleImageLoad}
      />
    </div>
  )
}

// For backward compatibility
export { OptimizedHeroImage }
