"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

// Define all possible image variants
export type ImageVariant = "standard" | "hero" | "responsive" | "gallery" | "lazy"

// Base image props
interface BaseImageProps extends Omit<NextImageProps, "src" | "alt"> {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  containerClassName?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  objectPosition?: string
  quality?: number
  variant?: ImageVariant
}

// Props specific to hero images
interface HeroImageProps {
  mobileSrc?: string
  desktopSrc?: string
  overlayClassName?: string
  overlayOpacity?: number
}

// Props specific to responsive images
interface ResponsiveImageProps {
  breakpoints?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  sizes?: string
}

// Props specific to gallery images
interface GalleryImageProps {
  images?: Array<{
    src: string
    alt: string
    width?: number
    height?: number
  }>
  lightbox?: boolean
  thumbnailClassName?: string
  modalClassName?: string
  aspectRatio?: string
}

// Props specific to lazy loading
interface LazyImageProps {
  threshold?: number
  once?: boolean
  placeholderColor?: string
  showLoadingIndicator?: boolean
}

// Combined props type
export type UnifiedImageProps = BaseImageProps &
  Partial<HeroImageProps> &
  Partial<ResponsiveImageProps> &
  Partial<GalleryImageProps> &
  Partial<LazyImageProps>

export default function UnifiedImage({
  // Base props
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className = "",
  containerClassName = "",
  objectFit = "cover",
  objectPosition = "center",
  quality = 85,
  variant = "standard",

  // Hero props
  mobileSrc,
  desktopSrc,
  overlayClassName,
  overlayOpacity = 0.5,

  // Responsive props
  breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 },
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw",

  // Gallery props
  images = [],
  lightbox = false,
  thumbnailClassName = "",
  modalClassName = "",
  aspectRatio = "aspect-square",

  // Lazy loading props
  threshold = 0.1,
  once = true,
  placeholderColor = "bg-gray-200",
  showLoadingIndicator = true,

  // Next.js Image props
  width: propWidth,
  height: propHeight,
  fill: propFill,
  priority: propPriority,
  placeholder: propPlaceholder,
  ...restProps
}: UnifiedImageProps) {
  // State
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Refs
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const [shouldLoad, setShouldLoad] = useState(variant !== "lazy" || propPriority)

  // Determine width and height based on variant
  const width = propWidth || (variant === "hero" ? 1920 : undefined)
  const height = propHeight || (variant === "hero" ? 1080 : undefined)
  const fill = propFill || variant === "hero"
  const priority = propPriority || variant === "hero"
  const placeholder = propPlaceholder || "blur"

  // Reset loading state when src changes
  useEffect(() => {
    setImgSrc(src)
    setIsLoading(true)
    setError(false)
    setIsLoaded(false)
  }, [src])

  // Check if mobile for responsive images
  useEffect(() => {
    if (variant === "responsive" || (variant === "hero" && mobileSrc)) {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < breakpoints.md)
      }

      // Initial check
      checkMobile()

      // Add event listener for window resize
      window.addEventListener("resize", checkMobile)

      // Cleanup
      return () => window.removeEventListener("resize", checkMobile)
    }
  }, [variant, mobileSrc, breakpoints.md])

  // Only load the image when it's in view for lazy loading
  useEffect(() => {
    if (variant === "lazy" && isInView && !shouldLoad) {
      setShouldLoad(true)
    }
  }, [isInView, shouldLoad, variant])

  // Handle image load complete
  const handleLoad = () => {
    setIsLoading(false)
    setIsLoaded(true)
  }

  // Handle image load error
  const handleError = () => {
    console.error(`Failed to load image: ${imgSrc}`)
    setError(true)
    setImgSrc(fallbackSrc)
  }

  // Determine image source for responsive images
  const getImageSrc = () => {
    if (variant === "responsive" && mobileSrc && isMobile) {
      return mobileSrc
    } else if (variant === "hero" && mobileSrc && isMobile) {
      return mobileSrc
    } else if (variant === "hero" && desktopSrc && !isMobile) {
      return desktopSrc
    }
    return imgSrc
  }

  // Generate responsive sizes string
  const generateSizes = () => {
    return `
      (max-width: ${breakpoints.sm}px) 100vw,
      (max-width: ${breakpoints.md}px) 50vw,
      (max-width: ${breakpoints.lg}px) 33vw,
      25vw
    `
  }

  // Gallery functions
  const openLightbox = (index: number) => {
    if (variant === "gallery" && lightbox) {
      setSelectedImage(index)
      document.body.style.overflow = "hidden"
    }
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null || !images.length) return

    if (direction === "prev") {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
    }
  }

  // Handle keyboard navigation for gallery
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return

    if (e.key === "ArrowLeft") {
      navigateImage("prev")
    } else if (e.key === "ArrowRight") {
      navigateImage("next")
    } else if (e.key === "Escape") {
      closeLightbox()
    }
  }

  // Render based on variant
  switch (variant) {
    case "hero":
      return (
        <div ref={ref} className={cn("relative w-full overflow-hidden", containerClassName)}>
          {/* Hero image */}
          <NextImage
            src={getImageSrc()}
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            priority={priority}
            sizes={sizes}
            placeholder={placeholder}
            className={cn(
              "w-full h-auto transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0",
              className,
            )}
            style={{
              objectFit,
              objectPosition,
            }}
            onLoad={handleLoad}
            onError={handleError}
            fill={fill}
            {...restProps}
          />

          {/* Optional overlay */}
          {overlayClassName && (
            <div className={cn("absolute inset-0", overlayClassName)} style={{ opacity: overlayOpacity }} />
          )}

          {/* Loading indicator */}
          {isLoading && showLoadingIndicator && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent">
                <span className="sr-only">Loading image...</span>
              </div>
            </div>
          )}
        </div>
      )

    case "lazy":
      return (
        <div ref={ref} className={cn("relative overflow-hidden", containerClassName)}>
          {shouldLoad ? (
            <NextImage
              src={imgSrc}
              alt={alt}
              width={propWidth}
              height={propHeight}
              className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
              style={{
                objectFit,
                objectPosition,
              }}
              onLoad={handleLoad}
              onError={handleError}
              {...restProps}
            />
          ) : (
            <div
              className={cn("animate-pulse", placeholderColor)}
              style={{
                aspectRatio: propWidth && propHeight ? `${propWidth}/${propHeight}` : "16/9",
                width: "100%",
                height: propHeight ? `${propHeight}px` : "auto",
              }}
            />
          )}

          {/* Loading indicator */}
          {isLoading && shouldLoad && showLoadingIndicator && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent">
                <span className="sr-only">Loading image...</span>
              </div>
            </div>
          )}
        </div>
      )

    case "gallery":
      return (
        <>
          {/* Gallery grid */}
          <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-4", containerClassName)}>
            {(images.length > 0 ? images : [{ src: imgSrc, alt }]).map((image, index) => (
              <div
                key={index}
                className={cn(
                  "cursor-pointer overflow-hidden rounded-lg border border-gray-200 hover:opacity-90 transition-opacity",
                  aspectRatio,
                  thumbnailClassName,
                )}
                onClick={() => openLightbox(index)}
              >
                <NextImage
                  src={image.src}
                  alt={image.alt}
                  width={image.width || 400}
                  height={image.height || 400}
                  className="w-full h-full object-cover"
                  {...restProps}
                />
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {selectedImage !== null && lightbox && (
            <div
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <div
                className={cn("relative max-w-4xl w-full mx-auto", modalClassName)}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors z-10"
                  onClick={closeLightbox}
                  aria-label="Close gallery"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative">
                  <NextImage
                    src={images.length > 0 ? images[selectedImage].src : imgSrc}
                    alt={images.length > 0 ? images[selectedImage].alt : alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[80vh] object-contain"
                    quality={quality}
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
                    {selectedImage + 1} of {images.length || 1}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )

    case "responsive":
      return (
        <div ref={ref} className={cn("relative overflow-hidden", containerClassName)}>
          <NextImage
            src={getImageSrc()}
            alt={alt}
            width={propWidth}
            height={propHeight}
            className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
            style={{
              objectFit,
              objectPosition,
            }}
            onLoad={handleLoad}
            onError={handleError}
            sizes={sizes || generateSizes()}
            {...restProps}
          />

          {/* Loading indicator */}
          {isLoading && showLoadingIndicator && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent">
                <span className="sr-only">Loading image...</span>
              </div>
            </div>
          )}
        </div>
      )

    default:
      // Standard image
      return (
        <div ref={ref} className={cn("relative overflow-hidden", containerClassName)}>
          <NextImage
            src={imgSrc}
            alt={alt}
            width={propWidth}
            height={propHeight}
            className={cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0", className)}
            style={{
              objectFit,
              objectPosition,
            }}
            onLoad={handleLoad}
            onError={handleError}
            {...restProps}
          />

          {/* Loading indicator */}
          {isLoading && showLoadingIndicator && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent">
                <span className="sr-only">Loading image...</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-sm text-gray-500">Image failed to load</div>
            </div>
          )}
        </div>
      )
  }
}
