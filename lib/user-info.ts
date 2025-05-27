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
  device?: string
  browser?: string
  os?: string
  isVpn?: boolean
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
    const userAgentString = request.headers.get("user-agent") || "unknown"
    userInfo.userAgent = userAgentString

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

    // Try to detect device type from user agent
    userInfo.device = detectDevice(userAgentString)
    userInfo.browser = detectBrowser(userAgentString)
    userInfo.os = detectOS(userAgentString)

    // VPN detection is complex and not always reliable
    // This is a simplified approach that checks for known VPN providers
    userInfo.isVpn = detectVPN(userInfo.ip, userAgentString)

    return userInfo
  } catch (error) {
    console.error("Error getting user info:", error)
    return {}
  }
}

/**
 * Attempt to detect the specific device model from user agent
 */
function detectDevice(userAgent: string): string {
  if (!userAgent || userAgent === "unknown") return "Unknown device"

  // iPhone detection
  const iPhoneRegex = /iPhone(?:\s+(\d+))?/i
  const iPhoneMatch = userAgent.match(iPhoneRegex)
  if (iPhoneMatch) {
    // Try to determine iPhone model
    if (userAgent.includes("iPhone14,") || userAgent.includes("iPhone15,")) {
      return "iPhone 13/14 Series"
    } else if (userAgent.includes("iPhone12,") || userAgent.includes("iPhone13,")) {
      return "iPhone 11/12 Series"
    } else if (userAgent.includes("iPhone10,")) {
      return "iPhone X/XS/XR"
    } else {
      return "iPhone"
    }
  }

  // iPad detection
  if (userAgent.includes("iPad")) {
    if (userAgent.includes("iPad Pro")) {
      return "iPad Pro"
    } else if (userAgent.includes("iPad Air")) {
      return "iPad Air"
    } else {
      return "iPad"
    }
  }

  // Mac detection
  if (userAgent.includes("Macintosh")) {
    if (userAgent.includes("MacBook Pro")) {
      return "MacBook Pro"
    } else if (userAgent.includes("MacBook Air")) {
      return "MacBook Air"
    } else if (userAgent.includes("iMac")) {
      return "iMac"
    } else {
      return "Mac"
    }
  }

  // Samsung detection
  const samsungRegex = /SM-[A-Z0-9]+/i
  const samsungMatch = userAgent.match(samsungRegex)
  if (samsungMatch) {
    const model = samsungMatch[0]
    if (model.includes("SM-G") || model.includes("SM-N")) {
      return `Samsung Galaxy (${model})`
    } else {
      return `Samsung (${model})`
    }
  }

  // Google Pixel detection
  if (userAgent.includes("Pixel")) {
    const pixelRegex = /Pixel\s+(\d+)/i
    const pixelMatch = userAgent.match(pixelRegex)
    if (pixelMatch && pixelMatch[1]) {
      return `Google Pixel ${pixelMatch[1]}`
    } else {
      return "Google Pixel"
    }
  }

  // Generic Android detection
  if (userAgent.includes("Android")) {
    return "Android Device"
  }

  // Desktop detection
  if (userAgent.includes("Windows")) {
    return "Windows PC"
  }

  return "Unknown device"
}

/**
 * Detect browser from user agent
 */
function detectBrowser(userAgent: string): string {
  if (!userAgent || userAgent === "unknown") return "Unknown browser"

  if (userAgent.includes("Chrome") && !userAgent.includes("Chromium") && !userAgent.includes("Edg")) {
    return "Chrome"
  } else if (userAgent.includes("Firefox") && !userAgent.includes("Seamonkey")) {
    return "Firefox"
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome") && !userAgent.includes("Chromium")) {
    return "Safari"
  } else if (userAgent.includes("Edg")) {
    return "Edge"
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
    return "Internet Explorer"
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera"
  }

  return "Unknown browser"
}

/**
 * Detect operating system from user agent
 */
function detectOS(userAgent: string): string {
  if (!userAgent || userAgent === "unknown") return "Unknown OS"

  if (userAgent.includes("Windows")) {
    return "Windows"
  } else if (userAgent.includes("Mac OS")) {
    return "macOS"
  } else if (userAgent.includes("Android")) {
    return "Android"
  } else if (userAgent.includes("iOS") || userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    return "iOS"
  } else if (userAgent.includes("Linux")) {
    return "Linux"
  }

  return "Unknown OS"
}

/**
 * Simple VPN detection (not comprehensive)
 */
function detectVPN(ip: string | undefined, userAgent: string): boolean {
  // This is a simplified approach and not reliable for production
  // A real implementation would use a VPN detection service or database

  // Check for common VPN providers in user agent
  const vpnKeywords = [
    "vpn",
    "proxy",
    "tor",
    "tunnel",
    "nordvpn",
    "expressvpn",
    "privatevpn",
    "cyberghost",
    "surfshark",
    "protonvpn",
    "mullvad",
  ]

  const lowerUserAgent = userAgent.toLowerCase()
  for (const keyword of vpnKeywords) {
    if (lowerUserAgent.includes(keyword)) {
      return true
    }
  }

  // More sophisticated detection would check IP against known VPN ranges
  // or use a third-party service

  return false
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
