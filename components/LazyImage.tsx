"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

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
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  placeholder = "empty",
  blurDataURL,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imgRef.current || priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsInView(entry.isIntersecting)
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
  }, [priority])

  // For priority images, set isInView to true immediately
  useEffect(() => {
    if (priority) {
      setIsInView(true)
    }
  }, [priority])

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: `${width}/${height}`,
        width: "100%",
        height: "auto",
        background: "#f0f0f0",
      }}
    >
      {(isInView || priority) && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  )
}
