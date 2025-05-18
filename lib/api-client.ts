import { handleError, retryWithBackoff } from "@/lib/error-handling"
import type { ApiResponse } from "@/types/common"

interface FetchOptions extends RequestInit {
  retry?: boolean
  maxRetries?: number
  retryDelay?: number
  retryFactor?: number
}

const DEFAULT_OPTIONS: FetchOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  retry: true,
  maxRetries: 3,
  retryDelay: 1000,
  retryFactor: 2,
}

async function fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
  const { retry, maxRetries, retryDelay, retryFactor, ...fetchOptions } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  if (retry) {
    return retryWithBackoff(() => fetch(url, fetchOptions), maxRetries, retryDelay, retryFactor)
  }

  return fetch(url, fetchOptions)
}

export async function apiGet<T>(url: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetchWithRetry(url, {
      ...options,
      method: "GET",
    })

    if (!response.ok) {
      throw await response.json()
    }

    const data = await response.json()

    return {
      data,
      status: "success",
    }
  } catch (error) {
    const handledError = handleError(error, false)

    return {
      error: {
        code: handledError.code || "unknown_error",
        message: handledError.message,
        details: handledError.details,
      },
      status: "error",
    }
  }
}

export async function apiPost<T, D = any>(url: string, data: D, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetchWithRetry(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw await response.json()
    }

    const responseData = await response.json()

    return {
      data: responseData,
      status: "success",
    }
  } catch (error) {
    const handledError = handleError(error, false)

    return {
      error: {
        code: handledError.code || "unknown_error",
        message: handledError.message,
        details: handledError.details,
      },
      status: "error",
    }
  }
}

export async function apiPut<T, D = any>(url: string, data: D, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetchWithRetry(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw await response.json()
    }

    const responseData = await response.json()

    return {
      data: responseData,
      status: "success",
    }
  } catch (error) {
    const handledError = handleError(error, false)

    return {
      error: {
        code: handledError.code || "unknown_error",
        message: handledError.message,
        details: handledError.details,
      },
      status: "error",
    }
  }
}

export async function apiDelete<T>(url: string, options: FetchOptions = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetchWithRetry(url, {
      ...options,
      method: "DELETE",
    })

    if (!response.ok) {
      throw await response.json()
    }

    const data = await response.json()

    return {
      data,
      status: "success",
    }
  } catch (error) {
    const handledError = handleError(error, false)

    return {
      error: {
        code: handledError.code || "unknown_error",
        message: handledError.message,
        details: handledError.details,
      },
      status: "error",
    }
  }
}
