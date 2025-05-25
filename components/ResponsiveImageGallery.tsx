"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

interface ResponsiveImageGalleryProps {
  images: GalleryImage[]
  className?: string
  thumbnailClassName?: string
  modalClassName?: string
}

export default function ResponsiveImageGallery({
  images,
  className,
  thumbnailClassName,
  modalClassName,
}: ResponsiveImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    if (direction === "prev") {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return

    if (e.key === "ArrowLeft") {
      navigateImage("prev")
    } else if (e.key === "ArrowRight") {
      navigateImage("next")
    } else if (e.key === "Escape") {
      closeModal()
    }
  }

  return (
    <>
      <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", className)}>
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:opacity-90 transition-opacity",
              thumbnailClassName,
            )}
            onClick={() => openModal(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className={cn("relative max-w-4xl w-full mx-auto", modalClassName)} onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors z-10"
              onClick={closeModal}
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative">
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                width={images[selectedImage].width}
                height={images[selectedImage].height}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage("prev")
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage("next")
                }}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center text-white mt-4">
              <p className="text-sm">
                {selectedImage + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// For backward compatibility
export { ResponsiveImageGallery }
