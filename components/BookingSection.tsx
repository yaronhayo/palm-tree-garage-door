"use client"

import { useRef } from "react"
import { Clock, CheckCircle } from "lucide-react"
import QuickContactForm from "./forms/QuickContactForm"
import AnimatedSection from "./AnimatedSection"
import AnimatedElement from "./AnimatedElement"

export default function BookingSection() {
  const ref = useRef(null)

  return (
    <AnimatedSection className="py-20 bg-gray-50" id="booking" variant="fade">
      <div className="container mx-auto px-4">
        <AnimatedElement variant="slide-up" delay={0.1}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="h-px w-12 bg-accent-500"></div>
              <span className="mx-4 text-accent-500 font-medium">SCHEDULE SERVICE</span>
              <div className="h-px w-12 bg-accent-500"></div>
            </div>
            <h2 className="text-4xl font-bold mb-4 text-primary-600">Book Your Garage Door Service</h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-700">
              Schedule your service appointment today and our expert technicians will be there to help you with all your
              garage door needs.
            </p>
          </div>
        </AnimatedElement>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedElement className="col-span-1 md:col-span-2" variant="slide-right" delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <QuickContactForm showBookingForm={true} setShowBookingForm={() => {}} />
              </div>
            </AnimatedElement>

            <AnimatedElement className="col-span-1" variant="slide-left" delay={0.3}>
              <div className="bg-primary-600 text-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Clock className="mr-2" /> Same-Day Service
                </h3>
                <p className="text-primary-50">
                  We offer same-day service for most repairs. Call us before noon for same-day service availability.
                </p>
              </div>

              <AnimatedElement variant="slide-left" delay={0.4}>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary-600 flex items-center">
                    <CheckCircle className="mr-2 text-accent-500" /> Our Guarantee
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 text-accent-500 mt-1 h-5 w-5 flex-shrink-0" />
                      <span>Professional, certified technicians</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 text-accent-500 mt-1 h-5 w-5 flex-shrink-0" />
                      <span>Quality parts and workmanship</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 text-accent-500 mt-1 h-5 w-5 flex-shrink-0" />
                      <span>Upfront pricing - no hidden fees</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 text-accent-500 mt-1 h-5 w-5 flex-shrink-0" />
                      <span>Satisfaction guaranteed</span>
                    </li>
                  </ul>
                </div>
              </AnimatedElement>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
