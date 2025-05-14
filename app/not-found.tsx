import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-primary-900 mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
