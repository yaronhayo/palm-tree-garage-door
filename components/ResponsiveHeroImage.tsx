"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ResponsiveHeroImageProps {
  mobileSrc: string
  desktopSrc: string
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

export default function ResponsiveHeroImage({
  mobileSrc,
  desktopSrc,
  alt,
  priority = true,
  className = "",
  width = 1920,
  height = 1080,
  quality = 85,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw",
  placeholder = "blur",
  blurDataURL,
  onLoad,
}: ResponsiveHeroImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleImageLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  const imageSrc = isMobile ? mobileSrc : desktopSrc

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <Image
        src={imageSrc || "/placeholder.svg"}
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
export { ResponsiveHeroImage }
