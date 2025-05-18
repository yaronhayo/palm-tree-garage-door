import type React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// Skeleton component for loading states
export interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  rounded?: boolean
  circle?: boolean
  animate?: boolean
}

export function Skeleton({ className, width, height, rounded = true, circle = false, animate = true }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-gray-200",
        rounded && !circle && "rounded",
        circle && "rounded-full",
        animate && "animate-pulse",
        className,
      )}
      style={{
        width: width,
        height: height,
      }}
    />
  )
}

// Spinner component
export interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "white" | "gray"
  className?: string
}

export function Spinner({ size = "md", color = "primary", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  const colorClasses = {
    primary: "text-primary-600",
    white: "text-white",
    gray: "text-gray-500",
  }

  return <Loader2 className={cn("animate-spin", sizeClasses[size], colorClasses[color], className)} />
}

// Loading overlay
export interface LoadingOverlayProps {
  isLoading: boolean
  text?: string
  blur?: boolean
  children: React.ReactNode
}

export function LoadingOverlay({ isLoading, text = "Loading...", blur = true, children }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}

      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 z-10",
            blur && "backdrop-blur-sm",
          )}
        >
          <Spinner size="lg" />
          {text && <p className="mt-2 text-sm font-medium text-gray-700">{text}</p>}
        </div>
      )}
    </div>
  )
}

// Loading button
export interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean
  loadingText?: string
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export function LoadingButton({
  isLoading,
  loadingText,
  children,
  variant = "primary",
  size = "md",
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  }

  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-6 text-base",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size="sm" color={variant === "primary" ? "white" : "primary"} className="mr-2" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

// Loading text
export interface LoadingTextProps {
  isLoading: boolean
  loadingText?: string
  children: React.ReactNode
  className?: string
}

export function LoadingText({ isLoading, loadingText = "Loading...", children, className }: LoadingTextProps) {
  return (
    <div className={className}>
      {isLoading ? (
        <div className="flex items-center">
          <Spinner size="sm" className="mr-2" />
          <span>{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

// Content placeholder
export function ContentPlaceholder() {
  return (
    <div className="space-y-4">
      <Skeleton height={24} width="60%" />
      <Skeleton height={16} width="90%" />
      <Skeleton height={16} width="80%" />
      <Skeleton height={16} width="85%" />
      <Skeleton height={16} width="75%" />
    </div>
  )
}

// Card placeholder
export function CardPlaceholder() {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <Skeleton height={150} className="mb-4" />
      <Skeleton height={24} width="80%" className="mb-2" />
      <Skeleton height={16} width="90%" className="mb-2" />
      <Skeleton height={16} width="60%" className="mb-4" />
      <Skeleton height={36} width="40%" />
    </div>
  )
}

// Image placeholder
export function ImagePlaceholder({ aspectRatio = "4/3", className }: { aspectRatio?: string; className?: string }) {
  return (
    <div
      className={cn("bg-gray-200 animate-pulse flex items-center justify-center", className)}
      style={{ aspectRatio }}
    >
      <svg
        className="w-12 h-12 text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 640 512"
      >
        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
      </svg>
    </div>
  )
}
