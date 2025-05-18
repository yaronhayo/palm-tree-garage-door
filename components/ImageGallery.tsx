"use client"

import type React from "react"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import LazyImage from "./LazyImage"

interface ImageGalleryProps {
  images: string[] // Array of image paths or Cloudinary public IDs
  className?: string
  columns?: 1 | 2 | 3 | 4
  gap?: "sm" | "md" | "lg"
  rounded?: boolean
  aspectRatio?: "1:1" | "4:3" | "16:9" | "3:2"
  lightbox?: boolean
  thumbnailQuality?: number
  fullQuality?: number
}

export default function ImageGallery({
  images,
  className = "",
  columns = 3,
  gap = "md",
  rounded = true,
  aspectRatio = "4:3",
  lightbox = true,
  thumbnailQuality = 80,
  fullQuality = 90,
}: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Convert aspect ratio to tailwind class
  const aspectRatioClass =
    aspectRatio === "1:1"
      ? "aspect-square"
      : aspectRatio === "4:3"
        ? "aspect-4/3"
        : aspectRatio === "16:9"
          ? "aspect-video"
          : "aspect-3/2"

  // Convert gap to tailwind class
  const gapClass = gap === "sm" ? "gap-2" : gap === "lg" ? "gap-6" : "gap-4"

  // Convert columns to tailwind class
  const columnsClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : columns === 4
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"

  // Get rounded class
  const roundedClass = rounded ? "rounded-lg overflow-hidden" : ""

  // Open lightbox with specific image
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = "hidden"
  }

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
    // Restore body scrolling
    document.body.style.overflow = "auto"
  }

  // Navigate to next image
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  // Navigate to previous image
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeLightbox()
    } else if (e.key === "ArrowRight") {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    } else if (e.key === "ArrowLeft") {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <>
      <div className={`grid ${columnsClass} ${gapClass} ${className}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${aspectRatioClass} ${roundedClass} overflow-hidden bg-gray-100`}
            onClick={lightbox ? () => openLightbox(index) : undefined}
          >
            <LazyImage
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className={`h-full w-full object-cover transition-transform duration-300 ${
                lightbox ? "cursor-pointer hover:scale-105" : ""
              }`}
              quality={thumbnailQuality}
              blur={true}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative max-h-[90vh] max-w-[90vw]">
            <LazyImage
              src={images[currentImageIndex]}
              alt={`Gallery image ${currentImageIndex + 1}`}
              width={1920}
              height={1080}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              quality={fullQuality}
            />

            <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
