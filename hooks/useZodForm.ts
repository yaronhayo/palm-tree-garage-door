"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { z } from "zod"
import { formatValidationErrors } from "@/lib/form-validation"

export interface UseZodFormOptions<T> {
  schema: z.ZodType<T>
  defaultValues?: Partial<T>
  onSubmit?: (data: T) => void | Promise<void>
  validateOnChange?: boolean
  validateOnBlur?: boolean
}

export interface UseZodFormReturn<T> {
  values: Partial<T>
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
  isDirty: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setFieldValue: (name: string, value: any) => void
  setFieldTouched: (name: string, isTouched: boolean) => void
  setFieldError: (name: string, error: string) => void
  resetForm: () => void
  validateForm: () => boolean
}

export function useZodForm<T extends Record<string, any>>({
  schema,
  defaultValues = {},
  onSubmit,
  validateOnChange = false,
  validateOnBlur = true,
}: UseZodFormOptions<T>): UseZodFormReturn<T> {
  const [values, setValues] = useState<Partial<T>>(defaultValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  // Reset form to default values
  const resetForm = useCallback(() => {
    setValues(defaultValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
    setIsDirty(false)
  }, [defaultValues])

  // Validate the entire form
  const validateForm = useCallback((): boolean => {
    try {
      schema.parse(values)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = formatValidationErrors(error)
        setErrors(formattedErrors)
      }
      return false
    }
  }, [schema, values])

  // Handle input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target

      // Handle different input types
      let parsedValue: any = value
      if (type === "checkbox") {
        parsedValue = (e.target as HTMLInputElement).checked
      } else if (type === "number") {
        parsedValue = value === "" ? "" : Number(value)
      }

      setValues((prev) => ({ ...prev, [name]: parsedValue }))
      setIsDirty(true)

      // Validate on change if enabled
      if (validateOnChange) {
        try {
          const fieldSchema = schema.shape[name as keyof z.ZodType<T>]
          if (fieldSchema) {
            fieldSchema.parse(parsedValue)
            setErrors((prev) => ({ ...prev, [name]: "" }))
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldError = error.errors.find((err) => err.path[0] === name)
            if (fieldError) {
              setErrors((prev) => ({ ...prev, [name]: fieldError.message }))
            }
          }
        }
      }
    },
    [schema, validateOnChange],
  )

  // Handle input blur
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target

      setTouched((prev) => ({ ...prev, [name]: true }))

      // Validate on blur if enabled
      if (validateOnBlur) {
        try {
          const fieldSchema = schema.shape[name as keyof z.ZodType<T>]
          if (fieldSchema) {
            fieldSchema.parse(values[name as keyof Partial<T>])
            setErrors((prev) => ({ ...prev, [name]: "" }))
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            const fieldError = error.errors.find((err) => err.path[0] === name)
            if (fieldError) {
              setErrors((prev) => ({ ...prev, [name]: fieldError.message }))
            }
          }
        }
      }
    },
    [schema, validateOnBlur, values],
  )

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Mark all fields as touched
      const allTouched = Object.keys(schema.shape).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<string, boolean>,
      )
      setTouched(allTouched)

      // Validate the form
      const isValid = validateForm()

      if (isValid && onSubmit) {
        setIsSubmitting(true)
        try {
          await onSubmit(values as T)
        } catch (error) {
          console.error("Form submission error:", error)
        } finally {
          setIsSubmitting(false)
        }
      }
    },
    [onSubmit, schema.shape, validateForm, values],
  )

  // Set a field value programmatically
  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setIsDirty(true)
  }, [])

  // Set a field's touched state programmatically
  const setFieldTouched = useCallback((name: string, isTouched: boolean) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }))
  }, [])

  // Set a field error programmatically
  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }))
  }, [])

  // Determine if the form is valid
  const isValid = Object.keys(errors).length === 0

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    resetForm,
    validateForm,
  }
}
