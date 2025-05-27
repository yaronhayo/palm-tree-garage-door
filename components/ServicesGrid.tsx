"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, X, Phone, Calendar, Wrench, Cog, PenTool, Home, Clock, Shield, Award } from "lucide-react"
import ServiceCard from "./ServiceCard"
import LazyImage from "./LazyImage"

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

const ServicePopup = ({ service, isOpen, onClose }: ServicePopupProps) => {
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
        <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
          {/* Modal Content */}
          <div
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto overflow-hidden"
            style={{ maxWidth: "calc(100vw - 1rem)" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`service-popup-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {/* Close button - Fixed position */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-100 transition-colors touch-target-fix"
              aria-label="Close popup"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
            </button>

            {/* Mobile Header */}
            <div className="md:hidden bg-primary-600 text-white p-3 pr-10 sm:p-4 sm:pr-12">
              <h3 className="text-lg sm:text-xl font-bold">{service.title}</h3>
            </div>

            {/* Content with max height and scrolling */}
            <div className="max-h-[calc(100vh-8rem)] sm:max-h-[80vh] md:max-h-[75vh] overflow-y-auto">
              {/* Two-column layout on desktop, single column on mobile */}
              <div className="grid md:grid-cols-2">
                {/* Left column - Image and quick info */}
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-3 sm:p-4 md:p-6">
                  {/* Hide title on mobile since we show it above */}
                  <div className="hidden md:block space-y-3 mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md">
                      {service.icon || <Wrench className="h-6 w-6 text-primary-600" />}
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
                  <div className="relative rounded-lg overflow-hidden shadow-lg mb-3 sm:mb-5">
                    <LazyImage
                      src={service.image || "/placeholder.png"}
                      alt={`Garage Door ${service.title} service`}
                      width={500}
                      height={300}
                      className="w-full h-40 xs:h-48 sm:h-56 object-contain bg-gray-50"
                    />
                  </div>

                  {/* Quick stats - 1 column on very small screens, 2 columns otherwise */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {service.timeEstimate && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 mb-1" />
                        <p className="text-[10px] sm:text-xs text-gray-600">Service Time</p>
                        <p className="font-semibold text-primary-900 text-xs sm:text-sm">{service.timeEstimate}</p>
                      </div>
                    )}
                    {service.warranty && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                        <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary-600 mb-1" />
                        <p className="text-[10px] sm:text-xs text-gray-600">Warranty</p>
                        <p className="font-semibold text-primary-900 text-xs sm:text-sm">{service.warranty}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right column - Details and CTAs */}
                <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
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
                            <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-accent-100 rounded-full flex items-center justify-center mt-0.5">
                              <Award className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accent-600" />
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {service.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center text-[11px] sm:text-xs md:text-sm text-gray-700"
                          >
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-400 rounded-full mr-1.5 sm:mr-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* CTAs - Full width at the bottom, always visible */}
              <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 sm:p-3 md:p-4 shadow-md">
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <a
                      href="tel:+13213669723"
                      className="flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-2 sm:py-3 sm:px-4 rounded-lg transition-all duration-200 touch-target-fix text-sm sm:text-base"
                      data-call-tracking="true"
                    >
                      <Phone className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Call Now</span>
                    </a>
                    <Link
                      href="/#booking"
                      className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-2 sm:py-3 sm:px-4 rounded-lg transition-all duration-200 touch-target-fix text-sm sm:text-base"
                      onClick={onClose}
                    >
                      <Calendar className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Schedule</span>
                    </Link>
                  </div>
                  <p className="text-center text-[10px] sm:text-xs text-gray-600 mt-1.5 sm:mt-2">
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

export default function ServicesGrid() {
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null)

  // Updated image URLs
  const doorRepairImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/door%20repair-PUqr6QUJAMJ1sWv0i7w7O3ipk8cB6E.webp"
  const springImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9142.JPG-eOeOz7t0rhU5GzYTwLLD8nCYNZW0V9.jpeg"
  const openerImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/opener%203-DABxbeRa6STYMR5Hk9ShFMou3fhuGM.webp"
  const newInstallationImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9143%202.JPG-3jd9oreBWsVddkt5In4v3h9qFDJnwD.jpeg"

  const services = [
    {
      title: "Door Repair",
      description: "Expert solutions for noisy, stuck, or damaged garage doors with same-day service available.",
      longDescription:
        "At Palm Tree Garage Door, our certified technicians specialize in diagnosing and repairing all types of garage door issues. Whether your door is making unusual noises, moving slowly, getting stuck, or has visible damage, we'll identify the root cause and implement a lasting solution. We use only premium parts and back all our work with a comprehensive satisfaction guarantee.",
      benefits: [
        "Same-day emergency service available 24/7",
        "Factory-trained technicians with 15+ years experience",
        "All repairs backed by our industry-leading warranty",
        "Transparent, upfront pricing with no hidden fees",
        "Free safety inspection with every repair",
      ],
      features: [
        "Panel replacement",
        "Track alignment",
        "Cable repair",
        "Roller replacement",
        "Weather seal repair",
        "Hardware tightening",
      ],
      timeEstimate: "1-2 hours",
      warranty: "1 Year Parts & Labor",
      icon: <Wrench className="h-5 w-5 text-primary-900" />,
      image: doorRepairImageUrl,
    },
    {
      title: "Spring Replacement",
      description: "Safe and reliable replacement of broken or worn garage door springs by certified technicians.",
      longDescription:
        "Garage door springs are under extreme tension and can be dangerous if not handled properly. Our certified technicians are specially trained to safely remove damaged springs and install high-quality replacements calibrated to your door's exact specifications. We'll also perform a complete system inspection to ensure optimal performance and safety.",
      benefits: [
        "High-cycle springs rated for 20,000+ cycles",
        "Precision calibration for smooth, balanced operation",
        "Complete safety inspection of entire door system",
        "Professional-grade lubrication of all components",
        "Lifetime warranty available on premium springs",
      ],
      features: [
        "Torsion springs",
        "Extension springs",
        "Spring conversion",
        "Safety cables",
        "Center bearing",
        "End bearing plates",
      ],
      timeEstimate: "1-2 hours",
      warranty: "2 Years Standard",
      icon: <Cog className="h-5 w-5 text-primary-900" />,
      image: springImageUrl,
    },
    {
      title: "Opener Repair",
      description: "Comprehensive diagnostics and repair for all major garage door opener brands and models.",
      longDescription:
        "Is your garage door opener acting up? We service all major opener brands including LiftMaster, Chamberlain, Genie, and Craftsman. From motor issues and circuit board failures to sensor misalignments and remote programming, our expert technicians have the tools and knowledge to get your opener working like new again.",
      benefits: [
        "Expert diagnosis of all opener problems",
        "Same-day service for most opener repairs",
        "WiFi and smartphone integration setup",
        "Battery backup installation available",
        "Free remote programming with service",
      ],
      features: [
        "Motor repair",
        "Circuit board",
        "Photo eye sensors",
        "Remote controls",
        "Wall consoles",
        "Smart home setup",
      ],
      timeEstimate: "1-3 hours",
      warranty: "90 Days - 1 Year",
      icon: <PenTool className="h-5 w-5 text-primary-900" />,
      image: openerImageUrl,
    },
    {
      title: "New Installation",
      description: "Transform your home's appearance and security with our custom garage door installation services.",
      longDescription:
        "A new garage door is one of the best investments you can make in your home. Not only does it enhance curb appeal and increase property value, but modern doors also offer improved security, energy efficiency, and quiet operation. Our design consultants will help you choose the perfect door to complement your home's architecture.",
      benefits: [
        "Free in-home design consultation",
        "Wide selection of styles, materials, and colors",
        "Energy-efficient insulated options available",
        "Professional installation by certified technicians",
        "Complete removal and recycling of old door",
      ],
      features: ["Steel doors", "Wood doors", "Aluminum doors", "Glass panels", "Insulation options", "Custom designs"],
      timeEstimate: "4-6 hours",
      warranty: "Lifetime Limited",
      icon: <Home className="h-5 w-5 text-primary-900" />,
      image: newInstallationImageUrl,
    },
  ]

  const handleOpenPopup = (index: number) => {
    setOpenServiceIndex(index)
  }

  const handleClosePopup = () => {
    setOpenServiceIndex(null)
  }

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Our Garage Door Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            South Florida's most trusted garage door company. We offer comprehensive repair and installation services
            with a commitment to quality, reliability, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
              image={service.image}
              onLearnMore={() => handleOpenPopup(index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#booking"
            className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-8 rounded-md transition-all duration-300 inline-flex items-center group touch-target-fix"
            scroll={true}
            aria-label="Schedule a service appointment"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Your Service
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-all duration-300" />
          </Link>
        </div>

        {/* Service Popups */}
        {services.map((service, index) => (
          <ServicePopup
            key={service.title}
            service={service}
            isOpen={openServiceIndex === index}
            onClose={handleClosePopup}
          />
        ))}
      </div>
    </section>
  )
}
