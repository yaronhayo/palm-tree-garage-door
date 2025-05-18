"use client"

import { useState, useCallback } from "react"
import { z } from "zod"

export type ValidationResult<T> = {
  success: boolean
  data?: T
  errors?: Record<string, string>
}

export function useFormValidation<T extends Record<string, any>>(schema: z.ZodType<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = useCallback(
    (data: Record<string, any>): ValidationResult<T> => {
      try {
        const validatedData = schema.parse(data)
        setErrors({})
        return { success: true, data: validatedData }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors: Record<string, string> = {}
          error.errors.forEach((err) => {
            if (err.path.length > 0) {
              const path = err.path.join(".")
              formattedErrors[path] = err.message
            }
          })
          setErrors(formattedErrors)
          return { success: false, errors: formattedErrors }
        }

        // Unexpected error
        console.error("Validation error:", error)
        return {
          success: false,
          errors: { _form: "An unexpected error occurred during validation" },
        }
      }
    },
    [schema],
  )

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const clearFieldError = useCallback((field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  return {
    errors,
    validate,
    clearErrors,
    clearFieldError,
    hasErrors: Object.keys(errors).length > 0,
  }
}
