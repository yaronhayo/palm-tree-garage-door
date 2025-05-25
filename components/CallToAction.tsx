"use client"

import type React from "react"
import { trackPhoneCall } from "@/lib/analytics"

interface CallToActionProps {
  phoneNumber: string
  buttonText?: string
}

const CallToAction: React.FC<CallToActionProps> = ({ phoneNumber, buttonText = "Call Now" }) => {
  const handleCall = () => {
    trackPhoneCall() // Track the phone call event
    window.location.href = `tel:${phoneNumber}`
  }

  return (
    <button onClick={handleCall} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {buttonText}
    </button>
  )
}

export default CallToAction
