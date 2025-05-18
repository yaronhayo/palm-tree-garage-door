"use client"

import { useState, useRef, useEffect } from "react"
import OptimizedImage from "./OptimizedImage"

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
  aspectRatio?: "1:1" | "4:3" | "16:9" | "3:2"
  rounded?: boolean
  initialPosition?: number
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
  aspectRatio = "4:3",
  rounded = true,
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Convert aspect ratio to tailwind class
  const aspectRatioClass =
    aspectRatio === "1:1"
      ? "aspect-square"
      : aspectRatio === "4:3"
        ? "aspect-4/3"
        : aspectRatio === "16:9"
          ? "aspect-video"
          : "aspect-3/2"

  // Get rounded class
  const roundedClass = rounded ? "rounded-lg overflow-hidden" : ""

  // Handle mouse down on slider
  const handleMouseDown = () => {
    setIsDragging(true)
  }

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(position)
  }

  // Handle touch move
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(position)
  }

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className={`relative ${aspectRatioClass} ${roundedClass} ${className} select-none overflow-hidden bg-gray-100`}
    >
      {/* After image (full width) */}
      <div className="absolute inset-0">
        <OptimizedImage src={afterImage} alt={afterLabel} fill className="h-full w-full object-cover" blur={true} />
      </div>

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
        <OptimizedImage
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="h-full w-full object-cover"
          blur={true}
          style={{ width: `${100 / (sliderPosition / 100)}%` }}
        />
      </div>

      {/* Slider */}
      <div className="absolute inset-y-0" style={{ left: `${sliderPosition}%` }}>
        {/* Vertical line */}
        <div className="absolute inset-y-0 left-0 w-0.5 bg-white shadow-md"></div>

        {/* Drag handle */}
        <div
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-full bg-white shadow-lg"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-600"></div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 rounded bg-black bg-opacity-50 px-2 py-1 text-sm text-white">
        {beforeLabel}
      </div>
      <div className="absolute bottom-4 right-4 rounded bg-black bg-opacity-50 px-2 py-1 text-sm text-white">
        {afterLabel}
      </div>
    </div>
  )
}
