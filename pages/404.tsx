import Link from "next/link"
import { Home, ArrowLeft, Phone } from "lucide-react"

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white/20 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-white/80 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold rounded-lg transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>

          <Link
            href="/#services"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-white text-white hover:bg-white hover:text-primary-900 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            View Services
          </Link>

          <Link
            href="tel:+1234567890"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-white text-white hover:bg-white hover:text-primary-900 rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Link>
        </div>

        <div className="mt-8 text-white/60 text-sm">
          <p>Need immediate assistance?</p>
          <p className="font-semibold">Call us at (123) 456-7890</p>
        </div>
      </div>
    </div>
  )
}
