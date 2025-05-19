"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, X, Phone, Calendar, Wrench, Cog, PenTool, Home } from "lucide-react"
import ServiceCard from "./ServiceCard"
import OptimizedImage from "./OptimizedImage"

interface ServicePopupProps {
  service: {
    title: string
    description: string
    image: string
    longDescription?: string
    benefits?: string[]
    pricing?: string
    icon?: React.ReactNode
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
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed left-1/2 -translate-x-1/2 top-[5%] sm:top-[10%] w-[95%] sm:w-full max-w-md md:max-w-lg bg-white rounded-lg shadow-xl z-50 overflow-hidden max-h-[90vh] sm:max-h-[80vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`service-popup-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="relative h-36 sm:h-48">
          <OptimizedImage
            src={service.image || "/placeholder.png"}
            alt={`${service.title} service`}
            width={600}
            height={300}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/90 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Close popup"
          >
            <X className="h-6 w-6 text-primary-600" />
          </button>
          <div className="absolute bottom-4 left-4">
            <h3
              className="text-xl sm:text-2xl font-bold text-white"
              id={`service-popup-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {service.title}
            </h3>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <p className="text-gray-700 mb-4">{service.longDescription || service.description}</p>

          {service.benefits && (
            <div className="mb-4">
              <h4 className="font-bold text-primary-600 mb-2">Benefits:</h4>
              <ul className="space-y-1">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent-500 mr-2">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {service.pricing && (
            <div className="mb-6">
              <h4 className="font-bold text-primary-600 mb-1">Pricing:</h4>
              <p className="text-gray-700">{service.pricing}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href="tel:+13213669723"
              className="flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-4 rounded-md transition-colors flex-1"
              data-call-tracking="true"
            >
              <Phone className="mr-2 h-4 w-4" />
              <span>Call Now</span>
            </a>
            <Link
              href="/#booking"
              className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-md transition-colors flex-1"
              onClick={onClose}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span>Book Service</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default function ServicesGrid() {
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null)

  // Use the original image URLs that were working before
  const doorRepairImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9140.JPG-zZvo0fWK5tefuFBOFyW6pc5KGYaHwR.jpeg"
  const springImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9142.JPG-eOeOz7t0rhU5GzYTwLLD8nCYNZW0V9.jpeg"
  const openerImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9144.JPG-VDOOEv8jOfHrKWBdswWIDo5f41V4cb.jpeg"
  const newInstallationImageUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9143%202.JPG-3jd9oreBWsVddkt5In4v3h9qFDJnwD.jpeg"

  const services = [
    {
      title: "Door Repair",
      description: "Fast, reliable repair for all types of garage door issues.",
      longDescription:
        "Our expert technicians provide comprehensive garage door repair services to fix any issue quickly and efficiently. We diagnose the problem accurately and use high-quality parts for lasting repairs.",
      benefits: [
        "Same-day service available for emergency repairs",
        "Experienced technicians with proper tools and parts",
        "All work backed by our satisfaction guarantee",
        "Transparent pricing with no hidden fees",
      ],
      pricing: "Starting at $89 for basic repairs. We provide free estimates for all services.",
      icon: <Wrench className="h-5 w-5 text-primary-900" />,
      image: doorRepairImageUrl,
    },
    {
      title: "Spring Replacement",
      description: "Expert replacement of broken or worn garage door springs.",
      longDescription:
        "Broken garage door springs are dangerous and require professional replacement. Our technicians are trained to safely remove old springs and install new ones that match your door's specifications exactly.",
      benefits: [
        "High-quality springs rated for 10,000+ cycles",
        "Proper tensioning for smooth door operation",
        "Inspection of other components for potential issues",
        "Lubrication of all moving parts included",
      ],
      pricing: "Torsion springs from $175-$250. Extension springs from $150-$200. Includes parts and labor.",
      icon: <Cog className="h-5 w-5 text-primary-900" />,
      image: springImageUrl,
    },
    {
      title: "Opener Repair",
      description: "Troubleshooting and repair of garage door openers.",
      longDescription:
        "We repair all major brands of garage door openers, including Chamberlain, LiftMaster, Genie, and more. From motor issues to sensor alignment, we can diagnose and fix your opener problems.",
      benefits: [
        "Comprehensive diagnosis of opener issues",
        "Repair of motor, circuit board, and sensor problems",
        "Remote programming and keypad setup",
        "Advice on repair vs. replacement options",
      ],
      pricing: "Repairs start at $95. New opener installation from $275-$450 depending on model.",
      icon: <PenTool className="h-5 w-5 text-primary-900" />,
      image: openerImageUrl,
    },
    {
      title: "New Installation",
      description: "Professional installation of new garage doors.",
      longDescription:
        "Transform your home's appearance and improve security with a new garage door. We offer a wide selection of styles, materials, and features to match your home and budget.",
      benefits: [
        "Free in-home consultation and measurement",
        "Wide selection of styles and materials",
        "Professional installation by certified technicians",
        "Removal and disposal of old door included",
      ],
      pricing: "New doors start at $900 installed. Premium options with insulation and windows from $1,200-$3,000.",
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
            We offer comprehensive garage door repair and installation services throughout South Florida. Our expert
            technicians can handle any garage door problem quickly and affordably.
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
            className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-8 rounded-md transition-all duration-300 inline-flex items-center group"
            scroll={true}
            aria-label="Schedule a service appointment"
          >
            Schedule Service
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
