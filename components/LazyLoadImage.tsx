"use client"

import { useState, useEffect, useRef } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface LazyLoadImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
  blurEffect?: boolean
  threshold?: number
  rootMargin?: string
  containerClassName?: string
  loadingClassName?: string
}

export default function LazyLoadImage({
  src,
  alt,
  width,
  height,
  fallbackSrc = "/placeholder.svg",
  blurEffect = true,
  threshold = 0.1,
  rootMargin = "200px 0px",
  className = "",
  containerClassName = "",
  loadingClassName = "",
  ...props
}: LazyLoadImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  // Set up intersection observer to detect when image is in viewport
  useEffect(() => {
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true)
          setImgSrc(typeof src === "string" ? src : "")
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [src, threshold, rootMargin])

  // Handle image load success
  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  // Handle image load error
  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`)
    if (typeof fallbackSrc === "string") {
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <div
      ref={imgRef}
      className={cn("relative overflow-hidden", containerClassName)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {/* Show placeholder/skeleton while image is loading */}
      {(!isInView || !isLoaded) && (
        <div
          className={cn("absolute inset-0 bg-gray-200 animate-pulse", blurEffect && "blur-sm", loadingClassName)}
          aria-hidden="true"
        />
      )}

      {/* Only render the image once it's in view */}
      {isInView && imgSrc && (
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={cn("transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", className)}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...props}
        />
      )}
    </div>
  )
}
