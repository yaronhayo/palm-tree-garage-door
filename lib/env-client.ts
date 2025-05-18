/**
 * Safe client-side environment variable access
 * Only exposes variables that start with NEXT_PUBLIC_
 */

type ClientEnv = {
  [key: string]: string | undefined
}

// Cache the environment variables to avoid recalculating on every call
let clientEnvCache: ClientEnv | null = null

export function getClientEnv(): ClientEnv {
  if (clientEnvCache) {
    return clientEnvCache
  }

  // Create a new object with only NEXT_PUBLIC_ variables
  const env: ClientEnv = {}

  try {
    if (typeof process !== "undefined" && process.env) {
      Object.keys(process.env).forEach((key) => {
        if (key.startsWith("NEXT_PUBLIC_")) {
          env[key] = process.env[key]
        }
      })
    }
  } catch (error) {
    console.error("Error accessing environment variables:", error)
    // Return empty object rather than throwing
  }

  clientEnvCache = env
  return env
}

export function getEnvVar(key: string): string | undefined {
  const env = getClientEnv()
  return env[key]
}

export function getRequiredEnvVar(key: string, fallback = ""): string {
  const value = getEnvVar(key)
  if (!value && process.env.NODE_ENV === "production") {
    console.warn(`Required environment variable ${key} is missing`)
    return fallback
  }
  return value || fallback
}
