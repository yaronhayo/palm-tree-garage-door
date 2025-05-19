"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"
import { useInView } from "framer-motion"
import { useRef } from "react"

type LazyImageProps = ImageProps & {
  threshold?: number
  once?: boolean
}

export default function LazyImage({ threshold = 0.1, once = true, ...props }: LazyImageProps) {
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

  return (
    <div
      ref={ref}
      className={`relative ${props.className || ""} overflow-hidden`}
      style={{
        height: props.height || "auto",
        width: props.width || "auto",
      }}
    >
      {shouldLoad ? (
        <Image
          {...props}
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      ) : (
        <div
          className="bg-gray-200 animate-pulse"
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      )}
    </div>
  )
}
