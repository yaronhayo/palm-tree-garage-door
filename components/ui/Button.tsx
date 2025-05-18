import React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "danger"
export type ButtonSize = "sm" | "md" | "lg" | "icon"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    // Variant styles
    const variantStyles = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500",
      accent: "bg-accent-500 text-primary-900 hover:bg-accent-600 focus-visible:ring-accent-500",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
      ghost: "bg-transparent hover:bg-gray-100 focus-visible:ring-gray-500",
      link: "bg-transparent underline-offset-4 hover:underline text-primary-600 hover:text-primary-700 p-0 focus-visible:ring-primary-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    }

    // Size styles
    const sizeStyles = {
      sm: "text-sm px-3 py-1.5",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
      icon: "h-10 w-10",
    }

    // Width style
    const widthStyle = fullWidth ? "w-full" : ""

    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          widthStyle,
          isLoading && "opacity-70",
          className,
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            {loadingText || children}
            <span className="sr-only">Loading</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }
