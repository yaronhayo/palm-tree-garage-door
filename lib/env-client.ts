/**
 * Client-side environment utilities
 */

/**
 * Get a public environment variable
 */
export function getPublicEnv(key: string, fallback = ""): string {
  if (typeof window === "undefined") {
    return process.env[`NEXT_PUBLIC_${key}`] || fallback
  }

  return (window as any).__ENV__?.[key] || process.env[`NEXT_PUBLIC_${key}`] || fallback
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development"
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production"
}

/**
 * Get the site URL
 */
export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin
  }

  return process.env.SITE_URL || "https://palmtreegaragedoor.com"
}
