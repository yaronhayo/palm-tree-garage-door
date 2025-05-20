"use client"

import Link from "next/link"
import { Phone, Calendar, ArrowRight } from "lucide-react"
import { trackPhoneCall } from "@/lib/dataLayer"

export default function CallToAction() {
  const handlePhoneClick = () => {
    trackPhoneCall("3213669723", "call_to_action")
  }

  return (
    <section className="py-16 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Fix Your Garage Door?</h2>
          <p className="text-xl text-white/90 mb-8">
            Our expert technicians are ready to help with any garage door issue. Contact us now for fast, reliable
            service throughout South Florida.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+13213669723"
              className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-8 rounded-md transition-all duration-300 flex items-center justify-center calltrk_numberswap calltrk_dnc"
              onClick={handlePhoneClick}
              data-call-tracking="true"
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>Call (321) 366-9723</span>
            </a>

            <Link
              href="/#booking"
              className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-3 px-8 rounded-md transition-all duration-300 flex items-center justify-center group"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Calendar className="mr-2 h-5 w-5" />
              <span>Book Online</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
