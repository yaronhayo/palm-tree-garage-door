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
  const [isMobile, setIsMobile] = useState(false)

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

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
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

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    setPreferences(necessaryOnly)
    localStorage.setItem("cookieConsent", "true")
    localStorage.setItem("cookiePreferences", JSON.stringify(necessaryOnly))

    // Push consent to dataLayer for GTM
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "cookie_consent_update",
        cookie_consent: necessaryOnly,
      })
    }

    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <>
      <div
        className={`fixed ${
          isMobile
            ? "bottom-0 left-0 right-0 p-2 z-50"
            : "bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-[90%]"
        }`}
      >
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {!showDetails ? (
            <div className="p-3">
              <div className="flex items-start gap-2 mb-2">
                <Cookie className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-semibold text-gray-800">Cookie Notice</h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    We use cookies to improve your experience.{" "}
                    <button
                      onClick={() => setIsPrivacyPolicyOpen(true)}
                      className="text-primary-600 hover:text-primary-800 underline font-medium"
                    >
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowDetails(true)}
                  className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center"
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Customize
                </button>
                <button
                  onClick={acceptNecessaryOnly}
                  className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Necessary Only
                </button>
                <button
                  onClick={acceptAll}
                  className="px-2 py-1 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors flex items-center"
                >
                  Accept All
                  <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1">
                  <Cookie className="h-3.5 w-3.5 text-primary-600" />
                  <h3 className="text-xs font-semibold text-gray-800">Cookie Preferences</h3>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close cookie preferences"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="text-xs text-gray-600">
                Customize your cookie preferences. Necessary cookies are required for basic functionality.
              </p>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Necessary</h4>
                    <p className="text-[10px] text-gray-600">Required for basic functions</p>
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
                      <div className="relative w-7 h-3.5 bg-primary-600 rounded-full shadow-inner"></div>
                      <div className="absolute left-1 top-1 w-1.5 h-1.5 bg-white rounded-full transition"></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Analytics</h4>
                    <p className="text-[10px] text-gray-600">Help us improve our website</p>
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
                        className={`relative w-7 h-3.5 ${preferences.analytics ? "bg-primary-600" : "bg-gray-300"} rounded-full shadow-inner transition-colors`}
                      ></div>
                      <div
                        className={`absolute ${preferences.analytics ? "left-4.5" : "left-1"} top-1 w-1.5 h-1.5 bg-white rounded-full transition-all`}
                      ></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Marketing</h4>
                    <p className="text-[10px] text-gray-600">For relevant advertisements</p>
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
                        className={`relative w-7 h-3.5 ${preferences.marketing ? "bg-primary-600" : "bg-gray-300"} rounded-full shadow-inner transition-colors`}
                      ></div>
                      <div
                        className={`absolute ${preferences.marketing ? "left-4.5" : "left-1"} top-1 w-1.5 h-1.5 bg-white rounded-full transition-all`}
                      ></div>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-md">
                  <div>
                    <h4 className="text-xs font-medium text-gray-800">Preferences</h4>
                    <p className="text-[10px] text-gray-600">Remember your settings</p>
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
                        className={`relative w-7 h-3.5 ${preferences.preferences ? "bg-primary-600" : "bg-gray-300"} rounded-full shadow-inner transition-colors`}
                      ></div>
                      <div
                        className={`absolute ${preferences.preferences ? "left-4.5" : "left-1"} top-1 w-1.5 h-1.5 bg-white rounded-full transition-all`}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePreferences}
                  className="px-2 py-1 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
                >
                  Save
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
