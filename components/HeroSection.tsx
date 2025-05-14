"use client"
import { ArrowRight, Phone } from "lucide-react"
import BookingForm from "@/components/BookingForm"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-600 leading-tight mb-6">
              Garage Door Repair South Florida
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Fast, reliable service from certified technicians. Available 24/7 for all your garage door needs.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="flex-shrink-0 text-accent-500 mr-2">✓</span>
                <span className="text-lg">24/7 Emergency Service</span>
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 text-accent-500 mr-2">✓</span>
                <span className="text-lg">Same-Day Repairs</span>
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 text-accent-500 mr-2">✓</span>
                <span className="text-lg">Licensed & Certified Technicians</span>
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 text-accent-500 mr-2">✓</span>
                <span className="text-lg">All Work Guaranteed with Warranty</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+17722753721"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>

              <a
                href="#lead-form"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition-colors inline-flex items-center justify-center"
              >
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  )
}
