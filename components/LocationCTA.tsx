"use client"

import Link from "next/link"
import { Phone } from "lucide-react"
import { trackPhoneCallConversion } from "@/lib/analytics"

interface LocationCTAProps {
  location: string
  service?: string
}

export default function LocationCTA({ location, service = "Garage Door Repair" }: LocationCTAProps) {
  const handlePhoneClick = () => {
    trackPhoneCallConversion("3213669723", {
      location,
      service,
      source: "location_cta",
    })
  }

  return (
    <section className="py-10 bg-primary-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Need {service} in {location}?
        </h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Our expert technicians are ready to help with fast, reliable service. Call now for a free estimate and
          same-day service!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:+13213669723"
            className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold rounded-md transition-colors"
            onClick={handlePhoneClick}
          >
            <Phone className="mr-2 h-5 w-5" />
            Call (321) 366-9723
          </a>
          <Link
            href="/#booking"
            className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-100 text-primary-700 font-bold rounded-md transition-colors"
          >
            Book Online
          </Link>
        </div>
        <p className="mt-4 text-sm text-white/80">
          Serving {location} and surrounding areas • 24/7 Emergency Service Available
        </p>
      </div>
    </section>
  )
}
