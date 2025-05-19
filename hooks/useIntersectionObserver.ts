"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface IntersectionObserverOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverOptions = {},
): [RefObject<T>, boolean] {
  const { root = null, rootMargin = "0px", threshold = 0, once = true } = options
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<T>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!ref.current) return

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsIntersecting(entry.isIntersecting)

        // If once is true and element is intersecting, unobserve it
        if (once && entry.isIntersecting && observerRef.current) {
          observerRef.current.unobserve(entry.target)
        }
      },
      { root, rootMargin, threshold },
    )

    observerRef.current.observe(ref.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [root, rootMargin, threshold, once])

  return [ref, isIntersecting]
}
