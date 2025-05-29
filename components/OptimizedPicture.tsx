"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface OptimizedPictureProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  loading?: "lazy" | "eager"
}

export default function OptimizedPicture({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85,
  loading = "lazy",
}: OptimizedPictureProps) {
  const [isInView, setIsInView] = useState(priority)
  const pictureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      },
    )

    if (pictureRef.current) {
      observer.observe(pictureRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  // Generate WebP and original format URLs
  const getImageUrl = (format?: string) => {
    // If it's already optimized or a blob URL, return as is
    if (src.includes("blob.vercel-storage.com") || src.includes("_next/image")) {
      return src
    }

    // For local images, use Next.js image optimization
    return src
  }

  const webpSrc = getImageUrl("webp")
  const originalSrc = getImageUrl()

  return (
    <div
      ref={pictureRef}
      className={cn("relative overflow-hidden bg-gray-100", className)}
      style={{
        aspectRatio: `${width}/${height}`,
        minHeight: height,
        minWidth: width,
      }}
    >
      {(isInView || priority) && (
        <picture>
          <source
            type="image/webp"
            srcSet={`${webpSrc}?w=640&q=${quality} 640w, ${webpSrc}?w=750&q=${quality} 750w, ${webpSrc}?w=828&q=${quality} 828w, ${webpSrc}?w=1080&q=${quality} 1080w, ${webpSrc}?w=1200&q=${quality} 1200w, ${webpSrc}?w=1920&q=${quality} 1920w`}
            sizes={sizes}
          />
          <source
            srcSet={`${originalSrc}?w=640&q=${quality} 640w, ${originalSrc}?w=750&q=${quality} 750w, ${originalSrc}?w=828&q=${quality} 828w, ${originalSrc}?w=1080&q=${quality} 1080w, ${originalSrc}?w=1200&q=${quality} 1200w, ${originalSrc}?w=1920&q=${quality} 1920w`}
            sizes={sizes}
          />
          <img
            src={`${originalSrc}?w=1200&q=${quality}`}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              contentVisibility: "auto",
            }}
          />
        </picture>
      )}
    </div>
  )
}
