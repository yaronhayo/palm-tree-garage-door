"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import LazyImage from "./LazyImage"

interface ResponsiveGalleryProps {
  images: string[]
  className?: string
  autoplay?: boolean
  autoplayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  aspectRatio?: "1:1" | "4:3" | "16:9" | "3:2"
  rounded?: boolean
  imageQuality?: number
}

export default function ResponsiveGallery({
  images,
  className = "",
  autoplay = false,
  autoplayInterval = 5000,
  showArrows = true,
  showDots = true,
  aspectRatio = "4:3",
  rounded = true,
  imageQuality = 80,
}: ResponsiveGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Convert aspect ratio to tailwind class
  const aspectRatioClass =
    aspectRatio === "1:1"
      ? "aspect-square"
      : aspectRatio === "4:3"
        ? "aspect-4/3"
        : aspectRatio === "16:9"
          ? "aspect-video"
          : "aspect-3/2"

  // Get rounded class
  const roundedClass = rounded ? "rounded-lg overflow-hidden" : ""

  // Navigate to next image
  const nextImage = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Navigate to previous image
  const prevImage = () => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Navigate to specific image
  const goToImage = (index: number) => {
    if (isTransitioning || index === currentIndex) return

    setIsTransitioning(true)
    setCurrentIndex(index)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Handle autoplay
  useEffect(() => {
    if (autoplay && images.length > 1) {
      autoplayTimerRef.current = setInterval(nextImage, autoplayInterval)
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [autoplay, autoplayInterval, images.length, currentIndex, isTransitioning])

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }
  }

  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    if (autoplay && images.length > 1) {
      autoplayTimerRef.current = setInterval(nextImage, autoplayInterval)
    }
  }

  return (
    <div
      className={`relative ${aspectRatioClass} ${roundedClass} ${className} overflow-hidden bg-gray-100`}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Images */}
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <LazyImage
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="h-full w-full object-cover"
              quality={imageQuality}
              blur={true}
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white opacity-70 transition-opacity hover:opacity-100"
            onClick={prevImage}
            disabled={isTransitioning}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white opacity-70 transition-opacity hover:opacity-100"
            onClick={nextImage}
            disabled={isTransitioning}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Navigation dots */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-4" : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
              onClick={() => goToImage(index)}
              disabled={isTransitioning}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
