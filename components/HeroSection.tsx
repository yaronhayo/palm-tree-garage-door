"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Shield, Award, ArrowRight, Phone } from "lucide-react"
import { trackPhoneCall } from "@/lib/analytics"
import QuickContactForm from "./forms/QuickContactForm"
import MobileOptimizedImage from "./MobileOptimizedImage"

export default function HeroSection() {
  const [showBookingForm, setShowBookingForm] = useState(false)

  // Safe tracking function
  const handlePhoneClick = () => {
    try {
      trackPhoneCall("3213669723", "hero_section")
    } catch (error) {
      console.error("Error tracking phone call:", error)
    }
  }

  return (
    <section className="relative pt-28 sm:pt-32 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Use MobileOptimizedImage for better mobile display */}
        <MobileOptimizedImage
          src="/images/service-truck.png"
          alt="Palm Tree Garage Door Repairs service truck in South Florida"
          priority={true}
          objectFit="cover"
          objectPosition="center 40%"
          quality={90}
        />
        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-primary-900/85" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              <span className="text-accent-500">Palm Tree Garage Door:</span> Fast & Reliable Repair in South Florida
            </h1>

            <p className="text-lg sm:text-xl text-white mb-8">
              Palm Tree Garage Door provides 24/7 emergency service with expert technicians. We fix all garage door
              problems quickly and affordably throughout South Florida.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center">
                <div className="bg-accent-500/20 p-2 rounded-full mr-3 flex-shrink-0">
                  <Clock className="h-5 w-5 text-accent-500" />
                </div>
                <span className="text-base sm:text-lg text-white">Same-Day Service Available</span>
              </div>

              <div className="flex items-center">
                <div className="bg-accent-500/20 p-2 rounded-full mr-3 flex-shrink-0">
                  <Shield className="h-5 w-5 text-accent-500" />
                </div>
                <span className="text-base sm:text-lg text-white">All Work Guaranteed by Palm Tree Garage Door</span>
              </div>

              <div className="flex items-center">
                <div className="bg-accent-500/20 p-2 rounded-full mr-3 flex-shrink-0">
                  <Award className="h-5 w-5 text-accent-500" />
                </div>
                <span className="text-base sm:text-lg text-white">Licensed & Insured Technicians</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+13213669723"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
                onClick={handlePhoneClick}
                data-call-tracking="true"
              >
                <Phone className="mr-2 h-5 w-5" />
                <span>Call Palm Tree Now</span>
              </a>

              <Link
                href="/#booking"
                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Book Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right Column - Form */}
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
                  Call Palm Tree Garage Door
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
