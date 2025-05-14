"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle, ArrowLeft, Phone } from "lucide-react"
import StickyHeader from "@/components/StickyHeader"

export default function ThankYouPage() {
  useEffect(() => {
    // Push conversion event to Google Tag Manager
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "conversion",
        conversionId: "lead_submission_complete",
      })
    }
  }, [])

  return (
    <>
      <StickyHeader />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Thank You!</h1>
              <p className="text-xl text-gray-700 mb-6">
                Your request has been received. We'll contact you shortly to discuss your garage door needs.
              </p>

              <div className="bg-primary-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold text-primary-800 mb-2">What happens next?</h2>
                <ol className="text-left space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-accent-500 text-primary-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      1
                    </span>
                    <span>We've sent a confirmation email to your inbox with details of your request.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-accent-500 text-primary-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      2
                    </span>
                    <span>
                      One of our garage door specialists will call you within 1 business hour during normal business
                      hours.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-accent-500 text-primary-900 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      3
                    </span>
                    <span>
                      We'll provide you with a free quote and schedule a service appointment at your convenience.
                    </span>
                  </li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/"
                  className="bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 font-bold py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
                <a
                  href="tel:+13213669723"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: (321) 366-9723
                </a>
              </div>

              <p className="text-sm text-gray-500">
                Need immediate assistance? Call us at (321) 366-9723 for 24/7 emergency service.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
