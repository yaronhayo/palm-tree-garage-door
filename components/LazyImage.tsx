"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { useInView } from "framer-motion"
import { useRef } from "react"

type LazyImageProps = ImageProps & {
  threshold?: number
  once?: boolean
  fetchPriority?: "high" | "low" | "auto"
}

export default function LazyImage({ threshold = 0.1, once = true, fetchPriority = "auto", ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const [shouldLoad, setShouldLoad] = useState(false)

  // Only load the image when it's in view
  useEffect(() => {
    if (isInView && !shouldLoad) {
      setShouldLoad(true)
    }
  }, [isInView, shouldLoad])

  // Determine if this image is likely to be an LCP candidate
  const isLcpCandidate = props.priority || fetchPriority === "high"

  // Pre-calculate dimensions to prevent layout shifts
  const width = typeof props.width === "number" ? props.width : undefined
  const height = typeof props.height === "number" ? props.height : undefined
  const aspectRatio = width && height ? width / height : undefined

  return (
    <div
      ref={ref}
      className={`relative ${props.className || ""} overflow-hidden`}
      style={{
        height: props.height || "auto",
        width: props.width || "auto",
        // Set aspect ratio to prevent layout shifts
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
      }}
      aria-busy={!isLoaded}
    >
      {shouldLoad ? (
        <Image
          {...props}
          fetchPriority={fetchPriority}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          loading={isLcpCandidate ? "eager" : "lazy"}
          // Ensure sizes is set for responsive images
          sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        />
      ) : (
        <div
          className="bg-gray-200 animate-pulse w-full h-full"
          style={{
            aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
