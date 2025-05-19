"use client"

import { useState } from "react"
import Image from "next/image"
import { generateSrcSet, getWebPUrl, calculateAspectRatio } from "@/lib/image-utils"

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

interface ResponsiveImageGalleryProps {
  images: GalleryImage[]
  className?: string
}

export default function ResponsiveImageGallery({ images, className = "" }: ResponsiveImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
          style={{ paddingBottom: calculateAspectRatio(image.width, image.height) }}
          onClick={() => setSelectedImage(index)}
        >
          <picture>
            <source srcSet={generateSrcSet(getWebPUrl(image.src))} type="image/webp" />
            <source srcSet={generateSrcSet(image.src)} type="image/jpeg" />

            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-opacity duration-300"
              loading="lazy"
            />
          </picture>
        </div>
      ))}

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setSelectedImage(null)}>
            ✕
          </button>

          <div className="relative w-full max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <picture>
              <source
                srcSet={generateSrcSet(getWebPUrl(images[selectedImage].src), [1080, 1920, 2560])}
                type="image/webp"
              />
              <source srcSet={generateSrcSet(images[selectedImage].src, [1080, 1920, 2560])} type="image/jpeg" />

              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                width={1920}
                height={1080}
                className="object-contain mx-auto max-h-[80vh] w-auto"
              />
            </picture>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${selectedImage === index ? "bg-white" : "bg-gray-500"}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(index)
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
