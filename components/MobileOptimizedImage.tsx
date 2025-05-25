"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface MobileOptimizedImageProps {
  src: string
  mobileSrc?: string
  alt: string
  priority?: boolean
  className?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  objectPosition?: string
  quality?: number
}

export default function MobileOptimizedImage({
  src,
  mobileSrc,
  alt,
  priority = true,
  className = "",
  objectFit = "cover",
  objectPosition = "center",
  quality = 90,
}: MobileOptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on client side
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

  // Use mobile source if provided and on mobile, otherwise use default source
  const imageSrc = isMobile && mobileSrc ? mobileSrc : src

  return (
    <div className="relative w-full h-full">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={() => setIsLoaded(true)}
        sizes={isMobile ? "100vw" : "(max-width: 768px) 100vw, 100vw"}
        style={{
          objectFit: isMobile ? (objectFit === "cover" ? "contain" : objectFit) : objectFit,
          objectPosition: objectPosition,
        }}
      />
    </div>
  )
}
