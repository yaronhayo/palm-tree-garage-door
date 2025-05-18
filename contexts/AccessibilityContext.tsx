"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AccessibilityContextType {
  highContrast: boolean
  toggleHighContrast: () => void
  reducedMotion: boolean
  toggleReducedMotion: () => void
  fontSize: "default" | "large" | "larger"
  setFontSize: (size: "default" | "large" | "larger") => void
  focusVisible: boolean
  setFocusVisible: (visible: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage if available
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState<"default" | "large" | "larger">("default")
  const [focusVisible, setFocusVisible] = useState(true)

  // Load saved preferences on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    // High contrast
    const savedHighContrast = localStorage.getItem("highContrast") === "true"
    setHighContrast(savedHighContrast)
    if (savedHighContrast) {
      document.documentElement.classList.add("high-contrast")
    }

    // Reduced motion
    const savedReducedMotion = localStorage.getItem("reducedMotion") === "true"
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReducedMotion(savedReducedMotion || prefersReducedMotion)
    if (savedReducedMotion || prefersReducedMotion) {
      document.documentElement.classList.add("reduced-motion")
    }

    // Font size
    const savedFontSize = localStorage.getItem("fontSize") as "default" | "large" | "larger"
    if (savedFontSize) {
      setFontSize(savedFontSize)
      document.documentElement.classList.add(`font-size-${savedFontSize}`)
    }
  }, [])

  // Toggle high contrast mode
  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const newValue = !prev
      localStorage.setItem("highContrast", String(newValue))

      if (newValue) {
        document.documentElement.classList.add("high-contrast")
      } else {
        document.documentElement.classList.remove("high-contrast")
      }

      return newValue
    })
  }

  // Toggle reduced motion
  const toggleReducedMotion = () => {
    setReducedMotion((prev) => {
      const newValue = !prev
      localStorage.setItem("reducedMotion", String(newValue))

      if (newValue) {
        document.documentElement.classList.add("reduced-motion")
      } else {
        document.documentElement.classList.remove("reduced-motion")
      }

      return newValue
    })
  }

  // Set font size
  const handleSetFontSize = (size: "default" | "large" | "larger") => {
    setFontSize(size)
    localStorage.setItem("fontSize", size)

    // Remove existing font size classes
    document.documentElement.classList.remove("font-size-default", "font-size-large", "font-size-larger")

    // Add new font size class
    if (size !== "default") {
      document.documentElement.classList.add(`font-size-${size}`)
    }
  }

  // Listen for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        setFocusVisible(true)
        document.body.classList.add("keyboard-navigation")
      }
    }

    const handleMouseDown = () => {
      setFocusVisible(false)
      document.body.classList.remove("keyboard-navigation")
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("mousedown", handleMouseDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        reducedMotion,
        toggleReducedMotion,
        fontSize,
        setFontSize: handleSetFontSize,
        focusVisible,
        setFocusVisible,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
