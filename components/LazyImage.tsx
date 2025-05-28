"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { getOptimalQuality, calculateAspectRatio, generateBlurPlaceholder } from "@/lib/image-utils"

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty" | "data:image/..."
  blurDataURL?: string
  isAboveTheFold?: boolean
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality,
  placeholder = "empty",
  blurDataURL,
  isAboveTheFold = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)
  const [imgQuality, setImgQuality] = useState(quality || 75)

  // Calculate optimal quality based on network conditions
  useEffect(() => {
    if (!quality) {
      setImgQuality(getOptimalQuality())
    }
  }, [quality])

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!imgRef.current || priority || isAboveTheFold) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "200px", // Load images 200px before they come into view
        threshold: 0.01,
      },
    )

    observer.observe(imgRef.current)

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [priority, isAboveTheFold])

  // Generate blur placeholder if not provided
  const placeholderUrl = blurDataURL || generateBlurPlaceholder(width, height)

  // Calculate aspect ratio to prevent layout shifts
  const aspectRatio = calculateAspectRatio(width, height)

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: `${width}/${height}`,
        width: "100%",
        height: "auto",
        background: "#f0f0f0",
        // Use padding-bottom with aspect ratio to prevent layout shifts
        paddingBottom: `${aspectRatio}%`,
      }}
      data-testid="lazy-image-container"
    >
      {(isInView || priority || isAboveTheFold) && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          priority={priority || isAboveTheFold}
          sizes={sizes}
          quality={imgQuality}
          placeholder={placeholder}
          blurDataURL={placeholderUrl}
          loading={priority || isAboveTheFold ? "eager" : "lazy"}
          fetchPriority={priority || isAboveTheFold ? "high" : "auto"}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          data-testid="lazy-image"
        />
      )}
    </div>
  )
}
