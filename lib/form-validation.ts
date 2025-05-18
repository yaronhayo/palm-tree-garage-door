import { z } from "zod"

// Common validation patterns
export const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^$$?([0-9]{3})$$?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  NAME: /^[a-zA-Z\s'-]+$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
}

// Common validation schemas
export const SCHEMAS = {
  // Basic fields
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(PATTERNS.NAME, "Please enter a valid name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(PATTERNS.PHONE, "Please enter a valid phone number"),
  zipCode: z.string().regex(PATTERNS.ZIP_CODE, "Please enter a valid ZIP code"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),

  // Common form schemas
  contactForm: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(PATTERNS.PHONE, "Please enter a valid phone number"),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
  }),

  bookingForm: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(PATTERNS.PHONE, "Please enter a valid phone number"),
    address: z.string().min(5, "Address must be at least 5 characters").max(200, "Address is too long"),
    zipCode: z.string().regex(PATTERNS.ZIP_CODE, "Please enter a valid ZIP code"),
    serviceType: z.string().min(1, "Please select a service type"),
    preferredDate: z.string().min(1, "Please select a preferred date"),
    preferredTime: z.string().min(1, "Please select a preferred time"),
    message: z.string().max(1000, "Message is too long").optional(),
  }),

  newsletterForm: z.object({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long").optional(),
  }),
}

// Format validation errors for display
export function formatValidationErrors(errors: z.ZodError): Record<string, string> {
  return errors.errors.reduce(
    (acc, error) => {
      const path = error.path.join(".")
      acc[path] = error.message
      return acc
    },
    {} as Record<string, string>,
  )
}

// Validate form data against a schema
export function validateFormData<T>(
  schema: z.ZodType<T>,
  data: unknown,
): { success: boolean; data?: T; errors?: Record<string, string> } {
  try {
    const validatedData = schema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: formatValidationErrors(error) }
    }
    throw error
  }
}

// Format phone number for display
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  return phone
}

// Format ZIP code for display
export function formatZipCode(zipCode: string): string {
  const cleaned = zipCode.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{5})(\d{4})?$/)
  if (match) {
    if (match[2]) {
      return `${match[1]}-${match[2]}`
    }
    return match[1]
  }
  return zipCode
}
