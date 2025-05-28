import Link from "next/link"
import type { Metadata } from "next"
import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "Page Not Found | Palm Tree Garage Door",
  description: "Sorry, the page you are looking for could not be found.",
}

export default function NotFound() {
  // Get the current URL to display in the message
  const headersList = headers()
  const url = headersList.get("x-url") || "the requested page"

  // Common redirects for frequently accessed old pages
  const commonRedirects = [
    { oldPath: "port-st-lucie-springs-repair", newPath: "/services/spring-repair", label: "Spring Repair Services" },
    { oldPath: "opener-repair", newPath: "/services/opener-repair", label: "Opener Repair" },
    { oldPath: "our-services", newPath: "/services/garage-door-repair", label: "Garage Door Services" },
    { oldPath: "port-st-lucie-services", newPath: "/service-areas", label: "Service Areas" },
    { oldPath: "military-discounts", newPath: "/#pricing", label: "Pricing & Discounts" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-8">
              We're sorry, but the page you were looking for could not be found.
            </p>

            <div className="mb-8 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">
                Our website has recently been updated with a new design and structure. If you were looking for a
                specific page, please use one of the links below or navigate to our homepage.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Popular Pages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/" className="block p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                  Home
                </Link>
                <Link
                  href="/services/garage-door-repair"
                  className="block p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  Garage Door Repair
                </Link>
                <Link
                  href="/services/garage-door-installation"
                  className="block p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  Garage Door Installation
                </Link>
                <Link
                  href="/services/spring-repair"
                  className="block p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                >
                  Spring Replacement
                </Link>
              </div>
            </div>

            {/* Looking for something from our old site? */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Looking for something from our old site?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonRedirects.map((redirect, index) => (
                  <Link
                    key={index}
                    href={redirect.newPath}
                    className="block p-4 bg-gray-100 text-primary rounded-lg hover:bg-gray-200 transition"
                  >
                    {redirect.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/"
              className="inline-block px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
