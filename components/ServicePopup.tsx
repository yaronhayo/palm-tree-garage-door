"use client"
import Link from "next/link"
import { X, Phone, Calendar } from "lucide-react"

interface ServicePopupProps {
  service: {
    title: string
    description: string
    image: string
    longDescription?: string
    benefits?: string[]
    pricing?: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function ServicePopup({ service, isOpen, onClose }: ServicePopupProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md md:max-w-lg bg-white rounded-lg shadow-xl z-50 overflow-hidden">
        <div className="relative h-48">
          <img
            src={service.image || "/placeholder.svg"}
            alt={`${service.title} service`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/90 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-white transition-colors"
            aria-label="Close popup"
          >
            <X className="h-5 w-5 text-primary-600" />
          </button>
          <div className="absolute bottom-4 left-4">
            <h3 className="text-2xl font-bold text-white">{service.title}</h3>
          </div>
        </div>
        <div className="p-6">
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
