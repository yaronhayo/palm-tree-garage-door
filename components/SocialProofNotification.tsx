"use client"

import { useState, useEffect } from "react"
import { Clock, CheckCircle } from "lucide-react"
import { socialProofExamples, type SocialProofData } from "@/lib/conversion-optimization"

export default function SocialProofNotification() {
  const [visible, setVisible] = useState(false)
  const [currentProof, setCurrentProof] = useState<SocialProofData | null>(null)

  useEffect(() => {
    // Delay first notification by at least 30 seconds
    const initialDelay = Math.max(30000, Math.random() * 45000)

    const initialTimer = setTimeout(() => {
      // Show first notification
      const showNotification = (proof: SocialProofData) => {
        setCurrentProof(proof)
        setVisible(true)

        // Hide after 5 seconds
        setTimeout(() => {
          setVisible(false)
        }, 5000)
      }

      let index = 0

      // Show first notification
      showNotification(socialProofExamples[index])
      index = (index + 1) % socialProofExamples.length

      // Set up interval for subsequent notifications (random between 1-2 minutes)
      const interval = setInterval(() => {
        // Random delay between 60-120 seconds
        const randomDelay = 60000 + Math.random() * 60000

        setTimeout(() => {
          showNotification(socialProofExamples[index])
          index = (index + 1) % socialProofExamples.length
        }, randomDelay)
      }, 120000) // Base interval of 2 minutes

      return () => {
        clearInterval(interval)
      }
    }, initialDelay)

    return () => {
      clearTimeout(initialTimer)
    }
  }, [])

  if (!currentProof) return null

  return (
    <div
      className={`fixed bottom-4 left-4 bg-white shadow-lg rounded-lg p-4 max-w-xs transition-all duration-300 z-50 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-full animate-pulse">
          <CheckCircle className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium">
            {currentProof.name} from {currentProof.location} {currentProof.action}
          </p>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            <span>{currentProof.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
