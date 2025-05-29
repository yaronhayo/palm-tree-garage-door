import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Phone } from "lucide-react"

export default function NotFound() {
  return (
    <>
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
            <Link href="/">
              <Button className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-semibold">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>

            <Link href="/#services">
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-primary-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                View Services
              </Button>
            </Link>

            <Link href="tel:+1234567890">
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-primary-900"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-white/60 text-sm">
            <p>Need immediate assistance?</p>
            <p className="font-semibold">Call us at (123) 456-7890</p>
          </div>
        </div>
      </div>
    </>
  )
}

export const metadata = {
  title: "Page Not Found - Palm Tree Garage Door",
  description:
    "The page you're looking for doesn't exist. Return to our homepage for garage door services in South Florida.",
  robots: {
    index: false,
    follow: false,
  },
}
