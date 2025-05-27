"use client"

import { useState } from "react"
import { Phone, Clock, CheckCircle, Mail, MapPin } from "lucide-react"
import { trackPhoneCall } from "@/lib/analytics"
import QuickContactForm from "./forms/QuickContactForm"

export default function BookingSection() {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handlePhoneClick = () => {
    trackPhoneCall("3213669723", "booking_section")
  }

  return (
    <section id="booking" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Book Your Garage Door Service</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Schedule a service appointment with our expert technicians. We'll get back to you promptly to confirm your
            booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Form */}
          <div className="bg-white rounded-lg shadow-xl p-6 border-l-4 border-accent-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary-600/10 rounded-full -ml-8 -mb-8"></div>
            {typeof QuickContactForm === "function" ? (
              <QuickContactForm showBookingForm={showBookingForm} setShowBookingForm={setShowBookingForm} />
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-700">Contact form is currently unavailable.</p>
                <a
                  href="tel:+13213669723"
                  className="mt-4 inline-block bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md"
                >
                  Call Us
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-primary-600 mb-4 flex items-center">
                <Clock className="mr-2 h-5 w-5 text-accent-500" />
                Fast Response Times
              </h3>
              <p className="text-gray-600 mb-4">
                We understand that garage door issues can disrupt your daily routine. That's why we prioritize quick
                response times and same-day service when possible.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Same-day service for emergency repairs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">24/7 availability for urgent issues</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Prompt scheduling for maintenance appointments</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-primary-600 mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-accent-500" />
                Service Areas
              </h3>
              <p className="text-gray-600 mb-4">
                We proudly serve homeowners and businesses throughout South Florida, including:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 rounded p-2 text-center text-gray-700">Delray Beach</div>
                <div className="bg-gray-50 rounded p-2 text-center text-gray-700">Boca Raton</div>
                <div className="bg-gray-50 rounded p-2 text-center text-gray-700">Coral Springs</div>
                <div className="bg-gray-50 rounded p-2 text-center text-gray-700">Plantation</div>
                <div className="bg-gray-50 rounded p-2 text-center text-gray-700">Fort Lauderdale</div>
                <div className="bg-gray-50 rounded p-2 text-center text-gray-700">Pompano Beach</div>
              </div>
            </div>

            <div className="bg-primary-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Phone className="mr-2 h-5 w-5 text-accent-500" />
                Need Immediate Assistance?
              </h3>
              <p className="mb-6 text-white/90">
                For emergency garage door repairs or immediate assistance, call us directly:
              </p>
              <a
                href="tel:+13213669723"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center w-full"
                onClick={handlePhoneClick}
                data-call-tracking="true"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call (321) 366-9723
              </a>
              <p className="mt-4 text-sm text-white/80 text-center">Available 24/7 for emergency service</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-primary-600 mb-4 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-accent-500" />
                Email Us
              </h3>
              <p className="text-gray-600 mb-4">
                For non-urgent inquiries or to request more information, you can also reach us by email:
              </p>
              <a
                href="mailto:palmtreegaragedoor@gmail.com"
                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
              >
                <Mail className="mr-2 h-5 w-5" />
                palmtreegaragedoor@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
