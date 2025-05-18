"use client"

import { useState, useEffect } from "react"
import { useAccessibility } from "@/contexts/AccessibilityContext"
import { Button } from "@/components/ui/Button"
import { Accessibility, Eye, Move, Type, X, ChevronUp } from "lucide-react"

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const { highContrast, toggleHighContrast, reducedMotion, toggleReducedMotion, fontSize, setFontSize } =
    useAccessibility()

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Remember state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("accessibilityControlsState")
    if (savedState) {
      const { isOpen: savedIsOpen, isMinimized: savedIsMinimized } = JSON.parse(savedState)
      setIsOpen(savedIsOpen)
      setIsMinimized(savedIsMinimized)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("accessibilityControlsState", JSON.stringify({ isOpen, isMinimized }))
  }, [isOpen, isMinimized])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Main toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          aria-expanded={isOpen}
          aria-label="Open accessibility options"
        >
          <Accessibility className="h-6 w-6" aria-hidden="true" />
        </button>
      )}

      {/* Controls panel */}
      {isOpen && (
        <div
          className={`bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ${
            isMinimized ? "w-auto p-2" : "w-64 p-4"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            {!isMinimized && <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>}

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                aria-label={isMinimized ? "Expand accessibility panel" : "Minimize accessibility panel"}
              >
                <ChevronUp className={`h-5 w-5 transform transition-transform ${isMinimized ? "rotate-180" : ""}`} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                aria-label="Close accessibility panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Controls */}
          {!isMinimized && (
            <div className="space-y-4">
              {/* High contrast toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-gray-600 mr-2" aria-hidden="true" />
                  <span>High Contrast</span>
                </div>
                <button
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    highContrast ? "bg-primary-600" : "bg-gray-200"
                  }`}
                  role="switch"
                  aria-checked={highContrast}
                >
                  <span
                    className={`${
                      highContrast ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </button>
              </div>

              {/* Reduced motion toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Move className="h-5 w-5 text-gray-600 mr-2" aria-hidden="true" />
                  <span>Reduce Motion</span>
                </div>
                <button
                  onClick={toggleReducedMotion}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    reducedMotion ? "bg-primary-600" : "bg-gray-200"
                  }`}
                  role="switch"
                  aria-checked={reducedMotion}
                >
                  <span
                    className={`${
                      reducedMotion ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </button>
              </div>

              {/* Font size controls */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Type className="h-5 w-5 text-gray-600 mr-2" aria-hidden="true" />
                  <span>Text Size</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={fontSize === "default" ? "primary" : "outline"}
                    onClick={() => setFontSize("default")}
                    className="flex-1"
                  >
                    A
                  </Button>
                  <Button
                    size="sm"
                    variant={fontSize === "large" ? "primary" : "outline"}
                    onClick={() => setFontSize("large")}
                    className="flex-1"
                  >
                    <span className="text-lg">A</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={fontSize === "larger" ? "primary" : "outline"}
                    onClick={() => setFontSize("larger")}
                    className="flex-1"
                  >
                    <span className="text-xl">A</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
