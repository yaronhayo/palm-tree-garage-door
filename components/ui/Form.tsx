"use client"

import React from "react"
import { cn } from "@/lib/utils"

// Form
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(({ className, onSubmit, children, ...props }, ref) => {
  return (
    <form ref={ref} onSubmit={onSubmit} className={cn("space-y-6", className)} {...props}>
      {children}
    </form>
  )
})
Form.displayName = "Form"

// FormField
export interface FormFieldProps {
  name: string
  label?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
  description?: string
  hideLabel?: boolean
}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, label, error, required, className, children, description, hideLabel = false, ...props }, ref) => {
    const id = `form-field-${name}`

    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {label && (
          <label
            htmlFor={id}
            className={cn("block text-sm font-medium text-gray-700", hideLabel && "sr-only", error && "text-red-500")}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement, {
              id,
              name,
              "aria-invalid": error ? "true" : undefined,
              "aria-describedby": error ? `${id}-error` : description ? `${id}-description` : undefined,
            })
          : children}

        {description && !error && (
          <p id={`${id}-description`} className="text-sm text-gray-500">
            {description}
          </p>
        )}

        {error && (
          <p id={`${id}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  },
)
FormField.displayName = "FormField"

// FormSection
export interface FormSectionProps {
  title?: string
  description?: string
  className?: string
  children: React.ReactNode
}

export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ title, description, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {(title || description) && (
          <div className="space-y-1">
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </div>
        )}
        <div className="space-y-4">{children}</div>
      </div>
    )
  },
)
FormSection.displayName = "FormSection"

// FormActions
export interface FormActionsProps {
  className?: string
  children: React.ReactNode
}

export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center justify-end space-x-4 pt-4", className)} {...props}>
        {children}
      </div>
    )
  },
)
FormActions.displayName = "FormActions"
