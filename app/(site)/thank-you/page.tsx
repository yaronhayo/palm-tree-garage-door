import Link from "next/link"
import { CheckCircle, Calendar, ArrowLeft, Phone, Star } from "lucide-react"

export const metadata = {
  title: "Thank You | Palm Tree Garage Door Repair",
  description: "Thank you for your submission. Our team will contact you shortly to confirm your service appointment.",
}

export default function ThankYouPage() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-[80vh] py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-primary-600 h-3"></div>

          <div className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-10 w-10 text-primary-900" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Thank You for Your Request!</h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We've received your submission and our team will contact you shortly to confirm your service appointment.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-10 max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary-700 mb-2">What Happens Next</h3>
                <p className="text-gray-600">
                  Our team will review your request and contact you within 1-2 hours during business hours to confirm
                  your appointment.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-primary-700 mb-2">Need Immediate Help?</h3>
                <p className="text-gray-600 mb-3">For urgent matters, please call us directly:</p>
                <a
                  href="tel:+13213669723"
                  className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  (321) 366-9723
                </a>
              </div>
            </div>

            <div className="bg-accent-50 border border-accent-200 rounded-xl p-6 mb-10 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent-500 fill-accent-500" />
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-primary-700 mb-2">
                Trusted by Homeowners Across South Florida
              </h3>
              <p className="text-gray-600">
                Join our hundreds of satisfied customers who trust Palm Tree Garage Door for reliable, professional
                service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-md transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Return to Home
              </Link>

              <Link
                href="/#services"
                className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-medium py-3 px-6 rounded-md transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Palm Tree Garage Door. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
