"use client"

import type React from "react"

// Skeleton types
type SkeletonVariant = "text" | "circle" | "rectangle" | "card" | "image" | "avatar"

interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  className?: string
  count?: number
  animated?: boolean
}

export function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  count = 1,
  animated = true,
}: SkeletonProps) {
  const baseClass = "bg-gray-200 rounded"
  const animationClass = animated ? "animate-pulse" : ""

  // Determine dimensions and styling based on variant
  let variantClass = ""
  let defaultWidth = "100%"
  let defaultHeight = "1rem"

  switch (variant) {
    case "circle":
      variantClass = "rounded-full"
      defaultWidth = "2.5rem"
      defaultHeight = "2.5rem"
      break
    case "rectangle":
      variantClass = "rounded-md"
      defaultHeight = "6rem"
      break
    case "card":
      variantClass = "rounded-lg"
      defaultHeight = "12rem"
      break
    case "image":
      variantClass = "rounded-md"
      defaultHeight = "10rem"
      break
    case "avatar":
      variantClass = "rounded-full"
      defaultWidth = "3rem"
      defaultHeight = "3rem"
      break
    case "text":
    default:
      variantClass = "rounded h-4"
      defaultHeight = "1rem"
  }

  const finalStyle = {
    width: width || defaultWidth,
    height: height || defaultHeight,
  }

  // Render multiple skeletons if count > 1
  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`${baseClass} ${variantClass} ${animationClass} ${className}`}
            style={finalStyle}
            aria-hidden="true"
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseClass} ${variantClass} ${animationClass} ${className}`}
      style={finalStyle}
      aria-hidden="true"
    />
  )
}

// Spinner component
interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "accent" | "white" | "gray"
  className?: string
  label?: string
}

export function Spinner({ size = "md", color = "primary", className = "", label = "Loading..." }: SpinnerProps) {
  // Size classes
  const sizeClass = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
    xl: "h-12 w-12 border-4",
  }[size]

  // Color classes
  const colorClass = {
    primary: "border-primary-600 border-t-transparent",
    accent: "border-accent-500 border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-300 border-t-transparent",
  }[color]

  return (
    <div className={`inline-flex items-center ${className}`} role="status">
      <div className={`animate-spin rounded-full ${sizeClass} ${colorClass}`} aria-hidden="true" />
      {label && <span className="sr-only">{label}</span>}
    </div>
  )
}

// Loading overlay component
interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  spinnerSize?: SpinnerProps["size"]
  spinnerColor?: SpinnerProps["color"]
  label?: string
  className?: string
  blur?: boolean
}

export function LoadingOverlay({
  isLoading,
  children,
  spinnerSize = "lg",
  spinnerColor = "primary",
  label = "Loading...",
  className = "",
  blur = true,
}: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}

      {isLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10 ${blur ? "backdrop-blur-sm" : ""} ${className}`}
          aria-busy="true"
          aria-live="polite"
        >
          <div className="text-center">
            <Spinner size={spinnerSize} color={spinnerColor} label={label} />
            <p className="mt-2 text-sm font-medium text-gray-700">{label}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Content placeholder for sections
interface ContentPlaceholderProps {
  type: "testimonial" | "card" | "text" | "image" | "form" | "custom"
  count?: number
  className?: string
  customContent?: React.ReactNode
}

export function ContentPlaceholder({ type, count = 1, className = "", customContent }: ContentPlaceholderProps) {
  if (type === "custom" && customContent) {
    return <div className={className}>{customContent}</div>
  }

  switch (type) {
    case "testimonial":
      return (
        <div className={`space-y-4 ${className}`}>
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Skeleton variant="avatar" width={40} height={40} />
                <div className="ml-3">
                  <Skeleton variant="text" width={120} height={20} />
                  <Skeleton variant="text" width={80} height={16} className="mt-1" />
                </div>
              </div>
              <Skeleton variant="text" count={3} className="mt-2" />
            </div>
          ))}
        </div>
      )

    case "card":
      return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <Skeleton variant="image" height={160} />
              <div className="p-4">
                <Skeleton variant="text" width="70%" height={24} />
                <Skeleton variant="text" count={2} className="mt-2" />
                <Skeleton variant="text" width="40%" className="mt-4" />
              </div>
            </div>
          ))}
        </div>
      )

    case "text":
      return (
        <div className={`space-y-2 ${className}`}>
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="95%" />
          <Skeleton variant="text" width="85%" />
          <Skeleton variant="text" width="70%" />
        </div>
      )

    case "image":
      return (
        <div className={className}>
          <Skeleton variant="image" height={300} />
        </div>
      )

    case "form":
      return (
        <div className={`space-y-4 ${className}`}>
          <Skeleton variant="text" width="50%" height={24} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="text" width="100%" height={100} />
          <Skeleton variant="text" width="100%" height={48} />
        </div>
      )

    default:
      return <Skeleton count={count} className={className} />
  }
}
