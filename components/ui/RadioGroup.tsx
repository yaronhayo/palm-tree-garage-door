"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface RadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  error?: boolean
  className?: string
  orientation?: "horizontal" | "vertical"
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, options, value, onChange, error, className, orientation = "vertical", ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-4", orientation === "horizontal" && "flex space-y-0 space-x-6", className)}
        {...props}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id={`${name}-${option.value}`}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                disabled={option.disabled}
                className={cn(
                  "h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500",
                  error && "border-red-500 focus:ring-red-500",
                )}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor={`${name}-${option.value}`}
                className={cn("font-medium text-gray-700", option.disabled && "text-gray-400", error && "text-red-500")}
              >
                {option.label}
              </label>
              {option.description && (
                <p className={cn("text-gray-500", option.disabled && "text-gray-400")}>{option.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  },
)
RadioGroup.displayName = "RadioGroup"

export { RadioGroup }
