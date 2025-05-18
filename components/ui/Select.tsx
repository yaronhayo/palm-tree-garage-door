"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  options: SelectOption[]
  error?: boolean
  onChange?: (value: string) => void
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value)
      }
    }

    return (
      <div className="relative">
        <select
          className={cn(
            "block w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm transition-colors",
            "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className,
          )}
          onChange={handleChange}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>
    )
  },
)
Select.displayName = "Select"

export { Select }
