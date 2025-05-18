"use client"

import { useState, useEffect, useRef } from "react"
import { isInViewport } from "@/lib/image-optimization"

interface UseLazyImageOptions {
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
}

export function useLazyImage(options: UseLazyImageOptions = {}) {
  const { rootMargin = "200px 0px", threshold = 0.1, triggerOnce = true } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Check if IntersectionObserver is available
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
              setHasLoaded(true)

              if (triggerOnce) {
                observer.unobserve(entry.target)
              }
            } else if (!triggerOnce) {
              setIsVisible(false)
            }
          })
        },
        { rootMargin, threshold },
      )

      observer.observe(ref.current)

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      }
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      const checkVisibility = () => {
        if (ref.current && isInViewport(ref.current, Number.parseInt(rootMargin))) {
          setIsVisible(true)
          setHasLoaded(true)

          if (triggerOnce) {
            window.removeEventListener("scroll", checkVisibility)
            window.removeEventListener("resize", checkVisibility)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      }

      checkVisibility()
      window.addEventListener("scroll", checkVisibility)
      window.addEventListener("resize", checkVisibility)

      return () => {
        window.removeEventListener("scroll", checkVisibility)
        window.removeEventListener("resize", checkVisibility)
      }
    }
  }, [rootMargin, threshold, triggerOnce])

  return { ref, isVisible, hasLoaded }
}
