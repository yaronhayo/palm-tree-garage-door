"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface OptimizedHeroImageProps {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export default function OptimizedHeroImage({ src, alt, priority = true, className = "" }: OptimizedHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Reset loaded state when src changes
    setIsLoaded(false)
  }, [src])

  return (
    <div className="relative w-full h-full">
      {/* Low quality placeholder */}
      {!isLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={() => setIsLoaded(true)}
        style={{ objectFit: "cover" }}
      />
    </div>
  )
}
