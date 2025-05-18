"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface SkipToContentProps {
  contentId: string
  className?: string
}

export function SkipToContent({ contentId, className = "" }: SkipToContentProps) {
  return (
    <a
      href={`#${contentId}`}
      className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-md ${className}`}
    >
      Skip to main content
    </a>
  )
}

interface VisuallyHiddenProps {
  children: React.ReactNode
}

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="sr-only">{children}</span>
}

interface FocusTrapProps {
  children: React.ReactNode
  isActive: boolean
  onEscape?: () => void
}

export function FocusTrap({ children, isActive, onEscape }: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    // Focus the first element when trap becomes active
    firstElement?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key
      if (e.key === "Escape" && onEscape) {
        e.preventDefault()
        onEscape()
        return
      }

      // Handle Tab key for focus trapping
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // If shift+tab and on first element, go to last element
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          // If tab and on last element, go to first element
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Store previous active element to restore focus later
    const previousActiveElement = document.activeElement as HTMLElement

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      // Restore focus when trap is deactivated
      previousActiveElement?.focus()
    }
  }, [isActive, onEscape])

  return <div ref={containerRef}>{children}</div>
}

interface LiveRegionProps {
  children: React.ReactNode
  ariaLive?: "polite" | "assertive"
  ariaAtomic?: boolean
  className?: string
}

export function LiveRegion({ children, ariaLive = "polite", ariaAtomic = true, className = "" }: LiveRegionProps) {
  return (
    <div aria-live={ariaLive} aria-atomic={ariaAtomic ? "true" : "false"} className={className}>
      {children}
    </div>
  )
}

interface KeyboardOnlyOutlineProps {
  children: React.ReactNode
}

export function KeyboardOnlyOutline({ children }: KeyboardOnlyOutlineProps) {
  const [usingKeyboard, setUsingKeyboard] = useState(false)

  useEffect(() => {
    const handleMouseDown = () => {
      setUsingKeyboard(false)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setUsingKeyboard(true)
      }
    }

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return <div className={usingKeyboard ? "focus-visible:outline-primary-500" : "outline-none"}>{children}</div>
}
