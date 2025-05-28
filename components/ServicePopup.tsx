"use client"

import type React from "react"
import { useEffect } from "react"
import { X, Phone, Calendar, CheckCircle, Clock, Shield } from "lucide-react"
import Image from "next/image"

interface ServicePopupProps {
  service: {
    title: string
    description: string
    image: string
    longDescription?: string
    benefits?: string[]
    icon?: React.ReactNode
    features?: string[]
    timeEstimate?: string
    warranty?: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function ServicePopup({ service, isOpen, onClose }: ServicePopupProps) {
  // Add body overflow control
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isOpen, onClose])

  // Handle booking link click
  const handleBookingClick = () => {
    // Close the popup
    onClose()

    // Small delay to ensure popup is closed before scrolling
    setTimeout(() => {
      // Find the booking section
      const bookingSection = document.getElementById("booking")
      if (bookingSection) {
        // Scroll to the booking section
        bookingSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container - Positioned in the center with padding */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-2 xs:p-3 sm:p-4">
          {/* Modal Content */}
          <div
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`service-popup-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {/* Close button - Fixed position */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors touch-target-fix"
              aria-label="Close popup"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            {/* Mobile Header */}
            <div className="md:hidden bg-primary-600 text-white p-4 pr-12">
              <h3 className="text-xl font-bold">{service.title}</h3>
            </div>

            {/* Content with max height and scrolling */}
            <div className="max-h-[80vh] md:max-h-[75vh] overflow-y-auto overscroll-contain">
              {/* Two-column layout on desktop, single column on mobile */}
              <div className="grid md:grid-cols-2">
                {/* Left column - Image and quick info */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 sm:p-6">
                  {/* Hide title on mobile since we show it above */}
                  <div className="hidden md:block space-y-3 mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md">
                      {service.icon || <CheckCircle className="h-6 w-6 text-primary-600" />}
                    </div>
                    <h3
                      className="text-2xl font-bold text-primary-900"
                      id={`service-popup-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-primary-700">{service.description}</p>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-lg overflow-hidden shadow-lg mb-5">
                    <Image
                      src={service.image || "/placeholder.png"}
                      alt={`Garage Door ${service.title} service`}
                      width={500}
                      height={300}
                      className="w-full h-40 xs:h-48 sm:h-56 object-contain bg-gray-50"
                    />
                  </div>

                  {/* Quick stats - 1 column on very small screens, 2 columns otherwise */}
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                    {service.timeEstimate && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
                        <Clock className="h-4 w-4 text-primary-600 mb-1" />
                        <p className="text-xs text-gray-600">Service Time</p>
                        <p className="font-semibold text-primary-900 text-sm">{service.timeEstimate}</p>
                      </div>
                    )}
                    {service.warranty && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
                        <Shield className="h-4 w-4 text-primary-600 mb-1" />
                        <p className="text-xs text-gray-600">Warranty</p>
                        <p className="font-semibold text-primary-900 text-sm">{service.warranty}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right column - Details and CTAs */}
                <div className="p-4 sm:p-6 space-y-4">
                  {/* Only show description on mobile since we show it in the left column on desktop */}
                  <div className="md:hidden">
                    <p className="text-gray-700">{service.description}</p>
                  </div>

                  {/* Long description */}
                  <div>
                    <h4 className="text-lg font-bold text-primary-900 mb-2">About This Service</h4>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {service.longDescription || service.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  {service.benefits && service.benefits.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-primary-900 mb-2">Why Choose Our Service</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 bg-accent-100 rounded-full flex items-center justify-center mt-0.5">
                              <CheckCircle className="h-3 w-3 text-accent-600" />
                            </div>
                            <span className="ml-2 text-gray-700 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold text-primary-900 mb-2">Service Features</h4>
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs sm:text-sm text-gray-700">
                            <div className="w-2 h-2 bg-primary-400 rounded-full mr-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTAs - Full width at the bottom, always visible */}
              <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 xs:p-3 sm:p-4 shadow-md">
                <div className="container mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3">
                    <a
                      href="tel:+13213669723"
                      className="flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 xs:py-3 px-2 xs:px-4 rounded-lg transition-all duration-200 touch-target-fix"
                      data-call-tracking="true"
                    >
                      <Phone className="mr-1 xs:mr-2 h-4 w-4" />
                      <span className="text-sm xs:text-base">Call Now</span>
                    </a>
                    <button
                      onClick={handleBookingClick}
                      className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 xs:py-3 px-2 xs:px-4 rounded-lg transition-all duration-200 touch-target-fix"
                    >
                      <Calendar className="mr-1 xs:mr-2 h-4 w-4" />
                      <span className="text-sm xs:text-base">Schedule Service</span>
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-600 mt-2">
                    <span className="font-semibold">100% Satisfaction Guaranteed</span> • Licensed & Insured
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
