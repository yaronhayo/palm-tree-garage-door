"use client"

import { useState } from "react"
import { Phone, X } from "lucide-react"
import { trackPhoneCall } from "@/lib/google-ads-utils"

export default function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-red-600 text-white py-2 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Phone className="w-5 h-5 mr-2 animate-pulse" />
        <span className="font-medium">
          Emergency Garage Door Repair? Call Now:
          <a href="tel:+1234567890" className="underline ml-1 font-bold" onClick={() => trackPhoneCall()}>
            (123) 456-7890
          </a>
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-white hover:text-gray-200"
        aria-label="Close emergency banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
