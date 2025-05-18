"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, CheckCircle } from "lucide-react"
import QuickContactForm from "./forms/QuickContactForm" // Fixed import statement

export default function BookingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-gray-50" id="booking" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <QuickContactForm showBookingForm={true} setShowBookingForm={() => {}} />
            </motion.div>

            <motion.div
              className="col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-primary-600 text-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Clock className="mr-2" /> Same-Day Service
                </h3>
                <p className="text-primary-50">
                  We offer same-day service for most repairs. Call us before noon for same-day service availability.
                </p>
              </div>

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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
