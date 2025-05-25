"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Calendar, Clock, CheckCircle, ArrowRight, Mail, MapPin } from 'lucide-react'
import { trackPhoneCall } from "@/lib/analytics"

export default function BookingSection() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setFormSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        address: "",
        preferredDate: "",
        preferredTime: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

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
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary-600 mb-4">Booking Request Received!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for scheduling with us. We'll contact you shortly to confirm your appointment.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center"
                >
                  <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                  Book Another Service
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Street address, city, state, zip"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Needed*
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select a service</option>
                    <option value="spring-repair">Spring Repair/Replacement</option>
                    <option value="opener-repair">Opener Repair</option>
                    <option value="door-off-track">Door Off Track</option>
                    <option value="panel-replacement">Panel Replacement</option>
                    <option value="new-installation">New Door Installation</option>
                    <option value="maintenance">Maintenance/Tune-up</option>
                    <option value="other">Other (please specify)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select a time</option>
                      <option value="morning">Morning (8am-12pm)</option>
                      <option value="afternoon">Afternoon (12pm-4pm)</option>
                      <option value="evening">Evening (4pm-8pm)</option>
                      <option value="anytime">Anytime</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Please provide any additional details about your garage door issue..."
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-8 rounded-md transition-all duration-300 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-900"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calendar className="mr-2 h-5 w-5" />
                        Schedule Service
                      </>
                    )}
                  </button>
                </div>
              </form>
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
