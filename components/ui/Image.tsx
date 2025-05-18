"use client"

import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { useState, useEffect, useRef } from "react"

// Define all possible image variants
export type ImageVariant = "standard" | "lazy" | "gallery" | "responsive"

// Base image props
interface BaseImageProps extends Omit<NextImageProps, "src" | "alt"> {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  objectPosition?: string
  quality?: number
  decorative?: boolean
  variant?: ImageVariant
}

// Props specific to lazy loading
interface LazyLoadingProps {
  placeholderSrc?: string
  containerClassName?: string
  blur?: boolean
}

// Props specific to gallery images
interface GalleryProps {
  lightbox?: boolean
  fullSizeUrl?: string
  caption?: string
}

// Props specific to responsive images
interface ResponsiveProps {
  breakpoints?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
}

// Combined props type
export type ImageProps = BaseImageProps & Partial<LazyLoadingProps> & Partial<GalleryProps> & Partial<ResponsiveProps>

export default function Image({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className = "",
  objectFit = "cover",
  objectPosition = "center",
  quality = 80,
  decorative = false,
  variant = "standard",
  placeholderSrc,
  containerClassName,
  blur = false,
  lightbox = false,
  fullSizeUrl,
  caption,
  breakpoints,
  ...restProps
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Refs for lazy loading
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Reset loading state when src changes
  useEffect(() => {
    setImgSrc(src)
    setIsLoading(true)
    setError(false)
    setIsLoaded(false)
  }, [src])

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (variant === "lazy") {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        { rootMargin: "200px 0px", threshold: 0.1 },
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => {
        observer.disconnect()
      }
    }
  }, [variant])

  // Handle image load complete
  const handleLoad = () => {
    setIsLoading(false)
    setIsLoaded(true)
  }

  // Handle image load error
  const handleError = () => {
    console.error(`Failed to load image: ${src}`)
    setError(true)
    setImgSrc(fallbackSrc)
  }

  // Apply blur effect during loading if requested
  const blurClass = isLoading && blur ? "blur-sm" : "blur-0"
  const transitionClass = "transition-all duration-300"

  // Determine appropriate alt text
  const imgAlt = decorative ? "" : alt
  const ariaHidden = decorative ? true : undefined

  // Handle lightbox open/close
  const openLightbox = () => {
    if (variant === "gallery" && lightbox) {
      setIsLightboxOpen(true)
      document.body.style.overflow = "hidden"
    }
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = ""
  }

  // Generate responsive sizes string
  const generateSizes = () => {
    const defaultBreakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 }
    const responsiveBreakpoints = breakpoints || defaultBreakpoints

    return `
      (max-width: ${responsiveBreakpoints.sm}px) 100vw,
      (max-width: ${responsiveBreakpoints.md}px) 50vw,
      (max-width: ${responsiveBreakpoints.lg}px) 33vw,
      25vw
    `
  }

  // Render based on variant
  switch (variant) {
    case "lazy":
      return (
        <div
          ref={containerRef}
          className={`relative overflow-hidden ${containerClassName || ""}`}
          aria-hidden={ariaHidden}
        >
          {/* Low quality placeholder */}
          {blur && !isLoaded && (
            <div className="absolute inset-0 blur-md scale-105">
              <NextImage
                src={placeholderSrc || fallbackSrc}
                alt=""
                fill={true}
                className={className}
                style={{
                  objectFit,
                  objectPosition,
                }}
                quality={10}
              />
            </div>
          )}

          {/* Main image - only load when in viewport */}
          {isVisible && (
            <NextImage
              src={imgSrc}
              alt={imgAlt}
              fill={true}
              className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
              style={{
                objectFit,
                objectPosition,
              }}
              quality={quality}
              onLoad={handleLoad}
              onError={handleError}
              {...restProps}
            />
          )}

          {/* Loading indicator */}
          {isLoading && isVisible && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20"
              aria-hidden="true"
            >
              <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"
                role="status"
              >
                <span className="sr-only">Loading image...</span>
              </div>
            </div>
          )}
        </div>
      )

    case "gallery":
      return (
        <>
          {/* Gallery thumbnail */}
          <div
            className={`relative overflow-hidden ${className} ${lightbox ? "cursor-pointer" : ""}`}
            onClick={lightbox ? openLightbox : undefined}
            aria-hidden={ariaHidden}
            role={lightbox ? "button" : undefined}
            tabIndex={lightbox ? 0 : undefined}
            onKeyDown={lightbox ? (e) => e.key === "Enter" && openLightbox() : undefined}
            aria-label={lightbox ? `View larger image: ${alt}` : undefined}
          >
            <NextImage
              src={imgSrc}
              alt={imgAlt}
              width={typeof restProps.width === "number" ? restProps.width : undefined}
              height={typeof restProps.height === "number" ? restProps.height : undefined}
              className={`${transitionClass} ${lightbox ? "hover:scale-105" : ""}`}
              style={{
                objectFit,
                objectPosition,
              }}
              onLoad={handleLoad}
              onError={handleError}
              {...restProps}
            />
          </div>

          {/* Lightbox */}
          {isLightboxOpen && lightbox && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
              onClick={closeLightbox}
              onKeyDown={(e) => e.key === "Escape" && closeLightbox()}
              tabIndex={0}
              role="dialog"
              aria-modal="true"
              aria-label={`Image: ${alt}`}
            >
              <button
                className="absolute right-4 top-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70"
                onClick={(e) => {
                  e.stopPropagation()
                  closeLightbox()
                }}
                aria-label="Close lightbox"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="relative max-h-[90vh] max-w-[90vw]">
                <NextImage
                  src={fullSizeUrl || imgSrc}
                  alt={imgAlt}
                  width={1200}
                  height={800}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                  quality={quality}
                />

                {caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center text-white">
                    {caption}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )

    case "responsive":
      return (
        <div className={`relative overflow-hidden ${className}`} aria-hidden={ariaHidden}>
          <NextImage
            src={imgSrc}
            alt={imgAlt}
            width={typeof restProps.width === "number" ? restProps.width : undefined}
            height={typeof restProps.height === "number" ? restProps.height : undefined}
            className={`${blurClass} ${transitionClass}`}
            style={{
              objectFit,
              objectPosition,
            }}
            onLoad={handleLoad}
            onError={handleError}
            sizes={generateSizes()}
            {...restProps}
          />

          {isLoading && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20"
              aria-hidden="true"
            >
              <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"
                role="status"
              >
                <span className="sr-only">Loading image...</span>
              </div>
            </div>
          )}
        </div>
      )

    default:
      // Standard image
      return (
        <div className={`relative overflow-hidden ${className}`} aria-hidden={ariaHidden}>
          <NextImage
            src={imgSrc}
            alt={imgAlt}
            width={typeof restProps.width === "number" ? restProps.width : undefined}
            height={typeof restProps.height === "number" ? restProps.height : undefined}
            className={`${blurClass} ${transitionClass}`}
            style={{
              objectFit,
              objectPosition,
            }}
            onLoad={handleLoad}
            onError={handleError}
            {...restProps}
          />

          {isLoading && blur && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-20"
              aria-hidden="true"
            >
              <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"
                role="status"
              >
                <span className="sr-only">Loading image...</span>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100" aria-hidden="true">
              <div className="text-sm text-gray-500">Image failed to load</div>
            </div>
          )}
        </div>
      )
  }
}
