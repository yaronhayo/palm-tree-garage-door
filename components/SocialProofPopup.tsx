"use client"

import { useState, useEffect, useRef } from "react"
import { X, CheckCircle, Clock, User } from "lucide-react"

type SocialProofData = {
  id: string
  name: string
  location: string
  service: string
  timeAgo: string
}

// Sample data pools for randomization
const firstNames = [
  "Michael",
  "Jennifer",
  "Carlos",
  "Sarah",
  "David",
  "Maria",
  "Robert",
  "Lisa",
  "James",
  "Emily",
  "John",
  "Jessica",
  "Daniel",
  "Amanda",
  "Thomas",
  "Sophia",
]
const lastInitials = ["R.", "L.", "M.", "T.", "S.", "K.", "W.", "B.", "G.", "H.", "P.", "D.", "F.", "J."]
const locations = [
  "Coral Springs",
  "Plantation",
  "Delray Beach",
  "Boca Raton",
  "Fort Lauderdale",
  "Pompano Beach",
  "Deerfield Beach",
  "Hollywood",
  "Davie",
  "Sunrise",
  "Tamarac",
  "Margate",
  "Coconut Creek",
  "Parkland",
]
const services = [
  "Spring Replacement",
  "Garage Door Installation",
  "Opener Repair",
  "Emergency Service",
  "Panel Replacement",
  "Track Repair",
  "Maintenance Service",
  "Cable Replacement",
  "Remote Programming",
  "Sensor Alignment",
  "Door Alignment",
  "Noise Reduction Service",
]
const timeAgo = [
  "Just now",
  "2 minutes ago",
  "5 minutes ago",
  "10 minutes ago",
  "15 minutes ago",
  "30 minutes ago",
  "1 hour ago",
  "2 hours ago",
  "Today",
  "This morning",
]

// Generate a random social proof
const generateRandomProof = (): SocialProofData => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastInitial = lastInitials[Math.floor(Math.random() * lastInitials.length)]
  const location = locations[Math.floor(Math.random() * locations.length)]
  const service = services[Math.floor(Math.random() * services.length)]
  const time = timeAgo[Math.floor(Math.random() * timeAgo.length)]

  return {
    id: `${firstName}-${lastInitial}-${location}-${service}`.replace(/\s+/g, "-").toLowerCase(),
    name: `${firstName} ${lastInitial}`,
    location,
    service,
    timeAgo: time,
  }
}

export function SocialProofPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentProof, setCurrentProof] = useState<SocialProofData | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const shownProofsRef = useRef<Set<string>>(new Set())
  const [isDismissed, setIsDismissed] = useState<boolean>(false)

  // Check if notifications were previously dismissed in this session
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem("socialProofDismissed")
      if (dismissed === "true") {
        setIsDismissed(true)
      }
    } catch (e) {
      console.error("Error accessing sessionStorage:", e)
    }
  }, [])

  // Get a unique social proof that hasn't been shown in this session
  const getUniqueProof = (): SocialProofData => {
    // Try to get session storage data
    let sessionShownProofs: string[] = []
    try {
      const storedProofs = sessionStorage.getItem("shownSocialProofs")
      if (storedProofs) {
        sessionShownProofs = JSON.parse(storedProofs)
        // Add to our ref for faster lookups
        sessionShownProofs.forEach((id) => shownProofsRef.current.add(id))
      }
    } catch (e) {
      console.error("Error accessing sessionStorage:", e)
    }

    // Generate proofs until we find one that hasn't been shown
    let attempts = 0
    let proof: SocialProofData

    do {
      proof = generateRandomProof()
      attempts++
      // Prevent infinite loop if we've shown all possible combinations
      if (attempts > 50) {
        // Reset if we've tried too many times
        shownProofsRef.current.clear()
        try {
          sessionStorage.setItem("shownSocialProofs", JSON.stringify([]))
        } catch (e) {
          console.error("Error writing to sessionStorage:", e)
        }
        break
      }
    } while (shownProofsRef.current.has(proof.id))

    // Add to our tracking sets
    shownProofsRef.current.add(proof.id)
    try {
      sessionStorage.setItem("shownSocialProofs", JSON.stringify([...sessionShownProofs, proof.id]))
    } catch (e) {
      console.error("Error writing to sessionStorage:", e)
    }

    return proof
  }

  useEffect(() => {
    // Don't show popups if they've been dismissed
    if (isDismissed) return

    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      const newProof = getUniqueProof()
      setCurrentProof(newProof)
      setIsVisible(true)
    }, 15000)

    return () => {
      clearTimeout(timer)
    }
  }, [isDismissed])

  useEffect(() => {
    let hideTimer: NodeJS.Timeout | null = null

    // Auto-hide after 3 seconds if not hovering
    if (isVisible && !isHovering) {
      hideTimer = setTimeout(() => {
        setIsVisible(false)
      }, 3000) // Updated to 3 seconds
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [isVisible, isHovering])

  // Show next notification after current one is hidden
  useEffect(() => {
    // Don't show more popups if they've been dismissed
    if (isDismissed) return

    if (!isVisible) {
      const nextTimer = setTimeout(() => {
        // Only show next if we've shown at least one before
        if (currentProof) {
          const newProof = getUniqueProof()
          setCurrentProof(newProof)
          setIsVisible(true)
        }
      }, 15000) // 15 seconds

      return () => clearTimeout(nextTimer)
    }
  }, [isVisible, currentProof, isDismissed])

  // Close the popup and prevent further notifications this session
  const handleClose = () => {
    setIsVisible(false)
    setIsDismissed(true)
    try {
      sessionStorage.setItem("socialProofDismissed", "true")
    } catch (e) {
      console.error("Error writing to sessionStorage:", e)
    }
  }

  // Handle mouse events for hover detection
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    // Hide after leaving unless user closed it
    setTimeout(() => {
      setIsVisible(false)
    }, 3000) // Updated to 3 seconds
  }

  if (!currentProof) return null

  return (
    <div
      ref={popupRef}
      className={`fixed bottom-4 left-4 z-40 max-w-[280px] sm:max-w-[320px] transform transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-white rounded-lg shadow-lg border border-green-100 overflow-hidden">
        <div className="flex items-start p-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-50 text-green-600 flex-shrink-0">
            <User className="h-5 w-5" />
          </div>

          <div className="ml-3 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">{currentProof.name}</p>
                <p className="text-xs text-gray-600">{currentProof.location}</p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-1">
              <div className="flex items-center">
                <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1" />
                <p className="text-xs text-gray-700">
                  Booked <span className="font-medium">{currentProof.service}</span>
                </p>
              </div>
              <div className="flex items-center mt-0.5">
                <Clock className="h-3.5 w-3.5 text-gray-400 mr-1" />
                <p className="text-xs text-gray-500">{currentProof.timeAgo}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 px-3 py-2 border-t border-green-100">
          <p className="text-xs text-green-800 font-medium">People in your area are booking services now!</p>
        </div>
      </div>
    </div>
  )
}
