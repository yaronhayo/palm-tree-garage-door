"use client"

import { Phone, Clock, ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
// Make sure the import is correct
import { trackPhoneCall } from "@/lib/dataLayer"

export default function EmergencyCallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  const handlePhoneClick = () => {
    trackPhoneCall("3213669723", "emergency_cta")
  }

  return (
    <section ref={ref} className="py-12 bg-gradient-to-r from-primary-700 to-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2"
          >
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-accent-500 mr-3 flex-shrink-0" />
              <h2 className="text-xl font-bold text-white">Need Emergency Garage Door Repair? We're available 24/7</h2>
            </div>

            <div className="flex flex-row gap-3 flex-shrink-0">
              <a
                href="tel:+13213669723"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                onClick={handlePhoneClick}
                data-call-tracking="true"
              >
                <Phone className="mr-2 h-4 w-4" />
                <span>Call Now</span>
              </a>

              <a
                href="#booking"
                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                Book Online
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
