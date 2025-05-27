"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, CheckCircle, Loader2, Phone } from "lucide-react"
import { trackFormSubmission, FORM_TYPES } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { serviceAreas } from "@/data/service-areas"
import { trackPhoneCall } from "@/lib/analytics"
import { formatEasternTime } from "@/lib/date-utils"
import { useRecaptcha } from "@/hooks/useRecaptcha"

interface QuickContactFormProps {
  showBookingForm: boolean
  setShowBookingForm: (show: boolean) => void
}

// Helper function to find city by zip code
function findCityByZipCode(zipCode: string): { city: string; state: string } | null {
  for (const area of serviceAreas) {
    if (area.zipCodes.includes(zipCode)) {
      return { city: area.city, state: area.state }
    }
  }
  return null
}

// Function to collect client-side user information
function collectClientUserInfo() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    // Add more client-side information as needed
  }
}

export default function QuickContactForm({ showBookingForm, setShowBookingForm }: QuickContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    service: "",
    serviceUrgency: "", // Added new field for service urgency
    zipCode: "",
    city: "",
    state: "",
    street: "", // Combined street field
    unit: "",
    gateCode: "",
    specialInstructions: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [cityLookupStatus, setCityLookupStatus] = useState<"idle" | "found" | "not_found">("idle")
  const [foundCityInfo, setFoundCityInfo] = useState<{ city: string; state: string } | null>(null)
  const [cityConfirmed, setCityConfirmed] = useState(false)

  const [showGateCodeQuestion, setShowGateCodeQuestion] = useState(false)

  const { executeRecaptcha, error: recaptchaError } = useRecaptcha()

  // Enhance form validation for better data quality
  // Add a validateForm function similar to BookingForm

  function validateForm(): boolean {
    let isValid = true
    let errorMessage = ""

    // Name validation
    if (!formData.name.trim()) {
      errorMessage = "Please enter your name"
      isValid = false
    }
    // Email validation
    else if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errorMessage = "Please enter a valid email address"
      isValid = false
    }
    // Phone validation
    else if (!formData.phone.trim()) {
      errorMessage = "Please enter your phone number"
      isValid = false
    } else {
      // Remove all non-numeric characters and check length
      const cleanPhone = formData.phone.replace(/\D/g, "")
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        errorMessage = "Please enter a valid 10-digit phone number"
        isValid = false
      }
    }
    // ZIP code validation if provided
    if (formData.zipCode && !/^\d{5}$/.test(formData.zipCode)) {
      errorMessage = "Please enter a valid 5-digit ZIP code"
      isValid = false
    }

    if (!isValid) {
      setError(errorMessage)
    } else {
      setError(null)
    }

    return isValid
  }

  // Add input formatting for phone numbers
  // Add this function:

  function formatPhoneNumber(value: string): string {
    if (!value) return value

    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, "")

    // Format the phone number as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Inside handleChange, add this special case for phone formatting
    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value)
      setFormData((prev) => ({ ...prev, [name]: formattedPhone }))
      return // Skip the regular setFormData below
    }

    // Reset city lookup if zip code is changed
    if (name === "zipCode" && value !== formData.zipCode) {
      setCityLookupStatus("idle")
      setFoundCityInfo(null)
      setCityConfirmed(false)

      // If zip code is 5 digits, try to look up the city
      if (value.length === 5) {
        const cityInfo = findCityByZipCode(value)
        if (cityInfo) {
          setFoundCityInfo(cityInfo)
          setCityLookupStatus("found")
        } else {
          setCityLookupStatus("not_found")
        }
      }
    }

    // Then keep the regular setFormData for other fields
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCityConfirm = () => {
    if (foundCityInfo) {
      setFormData((prev) => ({
        ...prev,
        city: foundCityInfo.city,
        state: foundCityInfo.state,
      }))
      setCityConfirmed(true)
    }
  }

  const handleCityReject = () => {
    setCityLookupStatus("not_found")
    setCityConfirmed(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Try to execute reCAPTCHA, but continue even if it fails
      let recaptchaToken = null
      try {
        recaptchaToken = await executeRecaptcha("quick_contact_form")
      } catch (recaptchaError) {
        console.warn("reCAPTCHA execution failed, continuing without verification:", recaptchaError)
      }

      // Collect client-side user information
      const clientUserInfo = typeof window !== "undefined" ? collectClientUserInfo() : {}

      // Get exact submission time and convert to Eastern Time
      const submissionDate = new Date()
      const easternTime = formatEasternTime(submissionDate)

      // Prepare form data for submission
      const submissionData = {
        ...formData,
        formattedAddress: getFormattedAddress(),
        submissionTime: easternTime,
        formType: FORM_TYPES.QUICK_CONTACT,
        timeZone: "America/New_York (Eastern Time)",
      }

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: FORM_TYPES.QUICK_CONTACT,
          formData: submissionData,
          recaptchaToken: recaptchaToken,
          userInfo: {
            ...clientUserInfo,
            submissionTimeEastern: easternTime,
            exactSubmissionTime: submissionDate.toISOString(), // Store exact submission time
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Something went wrong")
      }

      // Track form submission
      trackFormSubmission(FORM_TYPES.QUICK_CONTACT, {
        service_type: formData.service || "not_specified",
        service_urgency: formData.serviceUrgency || "not_specified",
      })

      setIsSubmitted(true)
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        service: "",
        serviceUrgency: "",
        zipCode: "",
        city: "",
        state: "",
        street: "",
        unit: "",
        gateCode: "",
        specialInstructions: "",
      })

      // Redirect to thank you page after a delay
      setTimeout(() => {
        router.push("/thank-you")
      }, 2000)
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form when showBookingForm changes
  useEffect(() => {
    if (!showBookingForm) {
      setIsSubmitted(false)
      setError(null)
    }
  }, [showBookingForm])

  const getFormattedAddress = () => {
    const parts = [formData.street].filter(Boolean)
    const unitPart = formData.unit ? `Unit ${formData.unit}` : ""
    const cityStatePart = `${formData.city}, ${formData.state} ${formData.zipCode}`

    return [parts, unitPart, cityStatePart].filter(Boolean).join(", ")
  }

  const handlePhoneClick = () => {
    trackPhoneCall("3213669723", "quick_contact_form")
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-primary-600 mb-2">Schedule Your Service</h2>
      <p className="text-gray-600 mb-6">Tell us about your garage door issue and we'll get back to you quickly.</p>

      <div className="mb-6">
        <a
          href="tel:+13213669723"
          className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center w-full"
          onClick={handlePhoneClick}
          data-call-tracking="true"
        >
          <Phone className="mr-2 h-5 w-5 animate-pulse" />
          Call (321) 366-9723
        </a>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>

      {recaptchaError && (
        <div className="p-3 mb-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-700">
            <span className="font-medium">Note:</span> Security verification is currently unavailable. Your form will
            still be submitted.
          </p>
        </div>
      )}

      {isSubmitted ? (
        <div className="text-center py-6">
          <div className="bg-green-100 text-green-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h4 className="text-lg font-bold text-primary-600 mb-2">Thank You!</h4>
          <p className="text-gray-600">Your message has been sent successfully. We'll contact you shortly.</p>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="quick-name"
              name="name"
              placeholder="Your Name*"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-label="Your Name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="tel"
              id="quick-phone"
              name="phone"
              placeholder="Phone Number*"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-label="Phone Number"
            />

            <input
              type="email"
              id="quick-email"
              name="email"
              placeholder="Email Address*"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-label="Email Address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                id="quick-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                aria-label="Service Needed"
              >
                <option value="">Select Service Needed</option>
                <option value="spring-repair">Spring Repair/Replacement</option>
                <option value="opener-repair">Opener Repair</option>
                <option value="door-off-track">Door Off Track</option>
                <option value="panel-replacement">Panel Replacement</option>
                <option value="new-installation">New Door Installation</option>
                <option value="maintenance">Maintenance/Tune-up</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <select
                id="service-urgency"
                name="serviceUrgency"
                value={formData.serviceUrgency}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                aria-label="When do you need service?"
              >
                <option value="">When do you need service?</option>
                <option value="asap">ASAP</option>
                <option value="today">Today if possible</option>
                <option value="few-days">Within the next few days</option>
                <option value="few-weeks">Within the next few weeks</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>
          </div>

          <div>
            <textarea
              id="quick-message"
              name="message"
              placeholder="Tell us about your garage door issue..."
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              aria-label="Message"
            ></textarea>
          </div>

          {/* ZIP Code Field */}
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <ArrowRight
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                aria-hidden="true"
              />
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                maxLength={5}
                className={cn(
                  "w-full px-4 py-3 pl-10 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900",
                  formData.zipCode && "border-gray-300",
                )}
                placeholder="Enter your 5-digit ZIP code"
                aria-required="true"
                autoComplete="postal-code"
              />
            </div>
          </div>

          {/* City Confirmation */}
          {cityLookupStatus === "found" && foundCityInfo && !cityConfirmed && (
            <div className="p-4 border border-accent-300 bg-accent-50 rounded-lg">
              <p className="text-primary-700 font-medium mb-2">
                We found your city:{" "}
                <span className="font-bold">
                  {foundCityInfo.city}, {foundCityInfo.state}
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-3">Is this correct?</p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleCityConfirm}
                  className="flex items-center px-4 py-2 bg-accent-500 text-primary-900 rounded-md hover:bg-accent-600 transition-all duration-300"
                  id="confirm-city"
                  name="confirm-city"
                >
                  Yes, that's correct
                </button>
                <button
                  type="button"
                  onClick={handleCityReject}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-300"
                  id="reject-city"
                  name="reject-city"
                >
                  No, enter manually
                </button>
              </div>
            </div>
          )}

          {/* Address Fields - Reorganized */}
          {(cityLookupStatus === "not_found" || (cityLookupStatus === "found" && cityConfirmed)) && (
            <>
              {/* Street */}
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Street <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900",
                    formData.street && "border-gray-300",
                  )}
                  placeholder="123 Main Street"
                  aria-required="true"
                  autoComplete="address-line1"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <ArrowRight
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    readOnly={cityConfirmed}
                    className={cn(
                      "w-full px-4 py-3 pl-10 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900",
                      formData.city && "border-gray-300",
                      cityConfirmed ? "bg-gray-100" : "",
                    )}
                    placeholder="Your city"
                    aria-required="true"
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900"
                  aria-required="true"
                  autoComplete="address-level1"
                >
                  <option value="">Select State</option>
                  <option value="FL">Florida</option>
                  <option value="AL">Alabama</option>
                  <option value="GA">Georgia</option>
                  <option value="SC">South Carolina</option>
                  <option value="NC">North Carolina</option>
                  {/* Add more states as needed */}
                </select>
              </div>

              {/* Unit/Apt */}
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit/Apt # <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="unit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Apt 101"
                  aria-required="false"
                  autoComplete="address-line3"
                />
              </div>
            </>
          )}

          {/* Address Preview */}
          {formData.city && formData.street && formData.state && (
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Your address:</p>
              <p className="font-medium text-primary-600">{getFormattedAddress()}</p>
            </div>
          )}

          {/* Gate Code Question */}
          {showGateCodeQuestion && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Access Information</h3>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4" role="region">
                <div className="flex">
                  <ArrowRight className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-blue-700 text-sm">
                    This information helps our technicians access your property efficiently on the day of service.
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="gateCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Gate or Access Code <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <ArrowRight
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    id="gateCode"
                    name="gateCode"
                    value={formData.gateCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter gate code if applicable"
                  />
                </div>

                <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                  Special Instructions <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  id="specialInstructions"
                  name="specialInstructions"
                  rows={3}
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="E.g., 'Call upon arrival', 'Dog in yard', 'Park in driveway', etc."
                  aria-required="false"
                />

                <div className="p-3 mt-4 bg-gray-50 border border-gray-200 rounded-lg" aria-live="polite">
                  <p className="text-sm text-gray-500">
                    Your address: <span className="font-medium text-primary-600">{getFormattedAddress()}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Sending...
              </>
            ) : (
              <>
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      )}
    </div>
  )
}
