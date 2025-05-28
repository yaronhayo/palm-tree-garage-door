import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = url

  // Check if the request is coming from the old domain
  const host = request.headers.get("host") || ""
  const isOldDomain = host.includes("garagedoorspringsrepairfl.com")

  if (isOldDomain) {
    // Create the new URL for the redirect
    const newHost = "palmtreegaragedoor.com" // Replace with your actual domain
    url.host = newHost
    url.protocol = "https"

    // Handle specific paths from old domain that need special mapping
    if (pathname.includes("-springs-repair")) {
      url.pathname = "/services/spring-repair"
    } else if (pathname.includes("-opener-repair")) {
      url.pathname = "/services/opener-repair"
    } else if (pathname.includes("-services")) {
      url.pathname = "/service-areas"
    } else if (pathname === "/our-services" || pathname.includes("services-")) {
      url.pathname = "/services/garage-door-repair"
    } else if (pathname === "/military-discounts") {
      url.pathname = "/#pricing"
    } else if (pathname === "/_frog") {
      url.pathname = "/"
    } else if (pathname === "/") {
      url.pathname = "/"
    } else {
      // Default to homepage for any unmatched paths
      url.pathname = "/"
    }

    return NextResponse.redirect(url, { status: 301 })
  }

  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Get response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Add performance-related headers
  response.headers.set("X-DNS-Prefetch-Control", "on")

  // Cache control for static assets
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|gif|png|webp|svg|ico|css|js|woff|woff2)$/)) {
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  }

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")

  // Allow Googlebot to access Vercel Blob Storage
  const userAgent = request.headers.get("user-agent") || ""
  if (userAgent.includes("Googlebot") && request.nextUrl.pathname.includes("/_vercel/blob")) {
    return NextResponse.next()
  }

  // Add CORS headers for Vercel Blob Storage
  response.headers.set("Cross-Origin-Resource-Policy", "cross-origin")
  response.headers.set("Access-Control-Allow-Origin", "https://hebbkx1anhila5yf.public.blob.vercel-storage.com")

  // Add performance optimization headers
  response.headers.set("Cache-Control", "public, max-age=3600")

  // Add resource hints
  response.headers.set(
    "Link",
    "<https://fonts.googleapis.com>; rel=preconnect, <https://fonts.gstatic.com>; rel=preconnect; crossorigin, <https://res.cloudinary.com>; rel=preconnect; crossorigin",
  )

  return response
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (local images)
     * - public/ (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|public|api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
    // Optional: Match API routes
    "/api/:path*",
  ],
}
