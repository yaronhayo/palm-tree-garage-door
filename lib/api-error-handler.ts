import { NextResponse } from "next/server"
import { z } from "zod"

export enum ErrorCode {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
}

export interface ApiError {
  code: ErrorCode
  message: string
  details?: Record<string, any>
  status: number
}

export function createApiError(
  code: ErrorCode,
  message: string,
  status: number,
  details?: Record<string, any>,
): ApiError {
  return {
    code,
    message,
    status,
    details,
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error("API Error:", error)

  // Handle ZodError (validation errors)
  if (error instanceof z.ZodError) {
    const formattedErrors = error.errors.reduce(
      (acc, curr) => {
        const path = curr.path.join(".")
        acc[path] = curr.message
        return acc
      },
      {} as Record<string, string>,
    )

    return NextResponse.json(
      createApiError(ErrorCode.VALIDATION_ERROR, "Validation failed", 400, { validationErrors: formattedErrors }),
      { status: 400 },
    )
  }

  // Handle known ApiError
  if ((error as ApiError).code && (error as ApiError).status) {
    const apiError = error as ApiError
    return NextResponse.json(apiError, { status: apiError.status })
  }

  // Handle other errors
  const message = error instanceof Error ? error.message : "An unexpected error occurred"

  return NextResponse.json(createApiError(ErrorCode.INTERNAL_SERVER_ERROR, message, 500), { status: 500 })
}

// Helper functions for common errors
export function badRequest(message: string, details?: Record<string, any>): ApiError {
  return createApiError(ErrorCode.BAD_REQUEST, message, 400, details)
}

export function unauthorized(message = "Unauthorized"): ApiError {
  return createApiError(ErrorCode.UNAUTHORIZED, message, 401)
}

export function forbidden(message = "Forbidden"): ApiError {
  return createApiError(ErrorCode.FORBIDDEN, message, 403)
}

export function notFound(message = "Resource not found"): ApiError {
  return createApiError(ErrorCode.NOT_FOUND, message, 404)
}

export function validationError(details: Record<string, string>): ApiError {
  return createApiError(ErrorCode.VALIDATION_ERROR, "Validation failed", 400, { validationErrors: details })
}

export function internalServerError(message = "Internal server error"): ApiError {
  return createApiError(ErrorCode.INTERNAL_SERVER_ERROR, message, 500)
}

export function serviceUnavailable(message = "Service unavailable"): ApiError {
  return createApiError(ErrorCode.SERVICE_UNAVAILABLE, message, 503)
}

export function rateLimitExceeded(message = "Rate limit exceeded"): ApiError {
  return createApiError(ErrorCode.RATE_LIMIT_EXCEEDED, message, 429)
}
