"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string
  description?: string
  error?: boolean
  onChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.checked)
      }
    }

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500",
              error && "border-red-500 focus:ring-red-500",
              className,
            )}
            onChange={handleChange}
            ref={ref}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label htmlFor={props.id} className={cn("font-medium text-gray-700", error && "text-red-500")}>
                {label}
              </label>
            )}
            {description && <p className="text-gray-500">{description}</p>}
          </div>
        )}
      </div>
    )
  },
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
