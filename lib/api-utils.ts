import { NextResponse } from "next/server"

export type ApiErrorResponse = {
  error: string
  details?: any
  status: number
}

export type ApiSuccessResponse<T> = {
  data: T
  status: number
}

export type ApiResponse<T> = ApiErrorResponse | ApiSuccessResponse<T>

export function createErrorResponse(message: string, status = 400, details?: any): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ error: message, details, status }, { status })
}

export function createSuccessResponse<T>(data: T, status = 200): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ data, status }, { status })
}

export function validateRequiredFields(data: any, requiredFields: string[]): string | null {
  for (const field of requiredFields) {
    if (!data[field]) {
      return `Missing required field: ${field}`
    }
  }
  return null
}

export function sanitizeInput(input: string): string {
  // Basic sanitization - remove HTML tags and trim
  return input.replace(/<[^>]*>?/gm, "").trim()
}

export function sanitizeFormData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {}

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}
