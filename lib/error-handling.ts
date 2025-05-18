import { toast } from "@/components/ui/toast"

// Error types
export enum ErrorType {
  VALIDATION = "validation",
  NETWORK = "network",
  AUTHENTICATION = "authentication",
  AUTHORIZATION = "authorization",
  NOT_FOUND = "not_found",
  SERVER = "server",
  UNKNOWN = "unknown",
}

// Error severity levels
export enum ErrorSeverity {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
  CRITICAL = "critical",
}

// Base error interface
export interface AppError {
  type: ErrorType
  message: string
  severity: ErrorSeverity
  code?: string
  details?: Record<string, any>
  originalError?: unknown
}

// Create a standardized error
export function createError(
  type: ErrorType,
  message: string,
  severity: ErrorSeverity = ErrorSeverity.ERROR,
  details?: Record<string, any>,
  originalError?: unknown,
  code?: string,
): AppError {
  return {
    type,
    message,
    severity,
    code,
    details,
    originalError,
  }
}

// Helper functions for common errors
export function createValidationError(message: string, details?: Record<string, string>, code?: string): AppError {
  return createError(ErrorType.VALIDATION, message, ErrorSeverity.WARNING, details, undefined, code)
}

export function createNetworkError(message: string, originalError?: unknown): AppError {
  return createError(
    ErrorType.NETWORK,
    message || "Network error occurred",
    ErrorSeverity.ERROR,
    undefined,
    originalError,
  )
}

export function createAuthenticationError(message: string): AppError {
  return createError(ErrorType.AUTHENTICATION, message || "Authentication required", ErrorSeverity.WARNING)
}

export function createAuthorizationError(message: string): AppError {
  return createError(ErrorType.AUTHORIZATION, message || "Not authorized", ErrorSeverity.WARNING)
}

export function createNotFoundError(message: string, resource?: string): AppError {
  return createError(
    ErrorType.NOT_FOUND,
    message || `Resource not found`,
    ErrorSeverity.WARNING,
    resource ? { resource } : undefined,
  )
}

export function createServerError(message: string, originalError?: unknown): AppError {
  return createError(
    ErrorType.SERVER,
    message || "Server error occurred",
    ErrorSeverity.ERROR,
    undefined,
    originalError,
  )
}

export function createUnknownError(message: string, originalError?: unknown): AppError {
  return createError(
    ErrorType.UNKNOWN,
    message || "An unexpected error occurred",
    ErrorSeverity.ERROR,
    undefined,
    originalError,
  )
}

// Parse error from API response
export async function parseApiError(response: Response): Promise<AppError> {
  try {
    const data = await response.json()

    // If the API returns a structured error
    if (data.code && data.message) {
      return createError(
        mapErrorTypeFromStatusCode(response.status),
        data.message,
        mapSeverityFromStatusCode(response.status),
        data.details,
        undefined,
        data.code,
      )
    }

    // Generic error based on status code
    return createError(
      mapErrorTypeFromStatusCode(response.status),
      data.message || `Error ${response.status}: ${response.statusText}`,
      mapSeverityFromStatusCode(response.status),
    )
  } catch (e) {
    // Couldn't parse JSON
    return createError(
      mapErrorTypeFromStatusCode(response.status),
      `Error ${response.status}: ${response.statusText}`,
      mapSeverityFromStatusCode(response.status),
    )
  }
}

// Map HTTP status code to error type
function mapErrorTypeFromStatusCode(status: number): ErrorType {
  if (status >= 400 && status < 500) {
    if (status === 400) return ErrorType.VALIDATION
    if (status === 401) return ErrorType.AUTHENTICATION
    if (status === 403) return ErrorType.AUTHORIZATION
    if (status === 404) return ErrorType.NOT_FOUND
    return ErrorType.VALIDATION
  }
  if (status >= 500) {
    return ErrorType.SERVER
  }
  return ErrorType.UNKNOWN
}

// Map HTTP status code to error severity
function mapSeverityFromStatusCode(status: number): ErrorSeverity {
  if (status >= 400 && status < 500) {
    return ErrorSeverity.WARNING
  }
  if (status >= 500) {
    return ErrorSeverity.ERROR
  }
  return ErrorSeverity.INFO
}

// Handle errors in a standardized way
export function handleError(error: unknown, showToast = true): AppError {
  console.error("Error occurred:", error)

  let appError: AppError

  // Convert to AppError if not already
  if ((error as AppError).type && (error as AppError).message) {
    appError = error as AppError
  } else if (error instanceof Error) {
    appError = createUnknownError(error.message, error)
  } else if (typeof error === "string") {
    appError = createUnknownError(error)
  } else {
    appError = createUnknownError("An unknown error occurred", error)
  }

  // Show toast notification if requested
  if (showToast) {
    const toastType =
      appError.severity === ErrorSeverity.ERROR || appError.severity === ErrorSeverity.CRITICAL
        ? "error"
        : appError.severity === ErrorSeverity.WARNING
          ? "warning"
          : "info"

    toast({
      title: getErrorTitle(appError),
      description: appError.message,
      variant: toastType,
    })
  }

  // Log to monitoring service in production
  if (process.env.NODE_ENV === "production") {
    // This would be replaced with actual error monitoring service
    console.error("Error logged to monitoring service:", appError)
  }

  return appError
}

// Get a user-friendly error title based on error type
function getErrorTitle(error: AppError): string {
  switch (error.type) {
    case ErrorType.VALIDATION:
      return "Validation Error"
    case ErrorType.NETWORK:
      return "Network Error"
    case ErrorType.AUTHENTICATION:
      return "Authentication Required"
    case ErrorType.AUTHORIZATION:
      return "Not Authorized"
    case ErrorType.NOT_FOUND:
      return "Not Found"
    case ErrorType.SERVER:
      return "Server Error"
    case ErrorType.UNKNOWN:
    default:
      return "Error"
  }
}

// Retry a function with exponential backoff
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000,
  factor = 2,
): Promise<T> {
  let attempt = 0
  let delay = initialDelay

  while (true) {
    try {
      return await fn()
    } catch (error) {
      attempt++

      if (attempt >= maxRetries) {
        throw error
      }

      // Calculate next delay with jitter
      const jitter = Math.random() * 0.3 + 0.85 // Random value between 0.85 and 1.15
      delay = Math.min(delay * factor * jitter, 30000) // Cap at 30 seconds

      // Wait before next attempt
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}
