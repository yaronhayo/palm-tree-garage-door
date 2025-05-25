"use client"

import { useState, useEffect } from "react"
import { X, Cookie, ChevronRight, Settings } from "lucide-react"
import { PrivacyPolicyModal } from "./PrivacyPolicyModal"

type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

// Define the component
export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: true,
    marketing: false,
    preferences: true,
  })

  // Check if consent has been given on component mount
  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent")
    if (!consentGiven) {
      // Delay showing the banner for 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Save preferences and hide banner
  const savePreferences = () => {
    localStorage.setItem("cookieConsent", "true")
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences))

    // Push consent to dataLayer for GTM
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "cookie_consent_update",
        cookie_consent: {
          necessary: preferences.necessary,
          analytics: preferences.analytics,
          marketing: preferences.marketing,
          preferences: preferences.preferences,
        },
      })
    }

    setIsVisible(false)
  }

  // Accept all cookies
  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem("cookieConsent", "true")
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted))

    // Push consent to dataLayer for GTM
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "cookie_consent_update",
        cookie_consent: {
          necessary: true,
          analytics: true,
          marketing: true,
          preferences: true,
        },
      })
    }

    setIsVisible(false)
  }

  // Toggle individual preferences
  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return // Can't toggle necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false")
    setIsVisible(false)
    // You might want to disable certain tracking features here
  }

  if (!isVisible) return null

  return (
    <>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-[90%] animate-fade-in-up">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {!showDetails ? (
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <Cookie className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">We value your privacy</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    We use cookies to enhance your browsing experience. By clicking "Accept All", you consent to our use
                    of cookies.{" "}
                    <button
                      onClick={() => setIsPrivacyPolicyOpen(true)}
                      className="text-primary-600 hover:text-primary-800 underline font-medium"
                    >
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Customize
                </button>
                <button
                  onClick={acceptAll}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors flex items-center"
                >
                  Accept All
                  <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1.5">
                  <Cookie className="h-4 w-4 text-primary-600" />
                  <h3 className="text-sm font-semibold text-gray-800">Cookie Preferences</h3>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close cookie preferences"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-gray-600">
                Customize your cookie preferences below. Necessary cookies are required for the website to function
                properly.
              </p>

              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Necessary Cookies</h4>
                    <p className="text-xs text-gray-600">Required for the website to function properly.</p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="sr-only"
                      id="necessary-cookies"
                    />
                    <label htmlFor="necessary-cookies" className="flex items-center cursor-not-allowed">
                      <div className="relative w-8 h-4 bg-primary-600 rounded-full shadow-inner"></div>
                      <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Analytics Cookies</h4>
                    <p className="text-xs text-gray-600">
                      Help us improve our website by collecting anonymous usage information.
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference("analytics")}
                      className="sr-only"
                      id="analytics-cookies"
                    />
                    <label htmlFor="analytics-cookies" className="flex items-center cursor-pointer">
                      <div
                        className={`relative w-8 h-4 ${preferences.analytics ? "bg-primary-600" : "bg-gray-300"} rounded-full shadow-inner transition-colors`}
                      ></div>
                      <div
                        className={`absolute ${preferences.analytics ? "left-5" : "left-1"} top-1 w-2 h-2 bg-white rounded-full transition-all`}
                      ></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Marketing Cookies</h4>
                    <p className="text-xs text-gray-600">
                      Used to track visitors across websites to display relevant advertisements.
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => togglePreference("marketing")}
                      className="sr-only"
                      id="marketing-cookies"
                    />
                    <label htmlFor="marketing-cookies" className="flex items-center cursor-pointer">
                      <div
                        className={`relative w-8 h-4 ${preferences.marketing ? "bg-primary-600" : "bg-gray-300"} rounded-full shadow-inner transition-colors`}
                      ></div>
                      <div
                        className={`absolute ${preferences.marketing ? "left-5" : "left-1"} top-1 w-2 h-2 bg-white rounded-full transition-all`}
                      ></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Preference Cookies</h4>
                    <p className="text-xs text-gray-600">
                      Allow the website to remember choices you make (such as your username or region).
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={() => togglePreference("preferences")}
                      className="sr-only"
                      id="preference-cookies"
                    />
                    <label htmlFor="preference-cookies" className="flex items-center cursor-pointer">
                      <div
                        className={`relative w-8 h-4 ${preferences.preferences ? "bg-primary-600" : "bg-gray-300"} rounded-full shadow-inner transition-colors`}
                      ></div>
                      <div
                        className={`absolute ${preferences.preferences ? "left-5" : "left-1"} top-1 w-2 h-2 bg-white rounded-full transition-all`}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePreferences}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
    </>
  )
}

// Add default export
export default CookieConsent
