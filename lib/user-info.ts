/**
 * User information utilities
 */
import type { NextRequest } from "next/server"

interface UserInfo {
  ip?: string
  userAgent?: string
  referer?: string
  country?: string
  city?: string
  region?: string
  timezone?: string
  language?: string
  [key: string]: any
}

/**
 * Get user information from a request
 */
export async function getUserInfo(request: NextRequest): Promise<UserInfo> {
  try {
    const userInfo: UserInfo = {}

    // Get IP address
    userInfo.ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    // Get user agent
    userInfo.userAgent = request.headers.get("user-agent") || "unknown"

    // Get referer
    userInfo.referer = request.headers.get("referer") || "direct"

    // Get language
    userInfo.language = request.headers.get("accept-language") || "unknown"

    // Get geo information from Vercel headers if available
    const country = request.headers.get("x-vercel-ip-country")
    const city = request.headers.get("x-vercel-ip-city")
    const region = request.headers.get("x-vercel-ip-country-region")

    if (country) userInfo.country = country
    if (city) userInfo.city = city
    if (region) userInfo.region = region

    return userInfo
  } catch (error) {
    console.error("Error getting user info:", error)
    return {}
  }
}

/**
 * Sanitize user information for logging (remove sensitive data)
 */
export function sanitizeUserInfo(userInfo: UserInfo): UserInfo {
  const sanitized = { ...userInfo }

  // Mask IP address
  if (sanitized.ip) {
    sanitized.ip = sanitized.ip.split(".").slice(0, 2).join(".") + ".xxx.xxx"
  }

  return sanitized
}
