import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, ArrowLeft, Calendar } from "lucide-react"
import GoogleAdsConversion from "@/components/tracking/GoogleAdsConversion"

export const metadata: Metadata = {
  title: "Thank You | Palm Tree Garage Door Repair",
  description: "Thank you for contacting Palm Tree Garage Door Repair. We'll be in touch shortly.",
  robots: "noindex, nofollow",
}

export default function ThankYouPage() {
  const googleAdsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID || ""
  const googleAdsConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || ""

  return (
    <main className="flex flex-col min-h-screen">
      {/* Google Ads Conversion Tracking */}
      {googleAdsConversionId && googleAdsConversionLabel && (
        <GoogleAdsConversion
          conversionId={googleAdsConversionId}
          conversionLabel={googleAdsConversionLabel}
          value={50} // Estimated value of a lead
        />
      )}

      <div className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-center text-primary-600 mb-4">Thank You!</h1>

          <p className="text-lg text-center text-gray-700 mb-8">
            Your request has been received. One of our garage door specialists will contact you shortly to confirm your
            appointment.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-primary-600 mb-4 flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              What to Expect Next
            </h2>

            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-accent-500 text-primary-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  1
                </span>
                <span>You'll receive a confirmation email with your request details.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-accent-500 text-primary-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  2
                </span>
                <span>Our team will call you within 30 minutes during business hours to confirm your appointment.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-accent-500 text-primary-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  3
                </span>
                <span>Our technician will arrive at the scheduled time with all necessary equipment.</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
