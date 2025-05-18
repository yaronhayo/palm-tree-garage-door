import React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, iconPosition = "left", type, ...props }, ref) => {
    const hasIcon = !!icon

    return (
      <div className="relative">
        {hasIcon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{icon}</div>
        )}

        <input
          type={type}
          className={cn(
            "block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm transition-colors",
            "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            hasIcon && iconPosition === "left" && "pl-10",
            hasIcon && iconPosition === "right" && "pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />

        {hasIcon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">{icon}</div>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
