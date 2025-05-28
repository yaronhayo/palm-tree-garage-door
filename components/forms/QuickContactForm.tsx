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
    browser: detectBrowser(navigator.userAgent),
    os: detectOS(navigator.userAgent),
    device: detectDevice(navigator.userAgent),
  }
}

// Detect browser from user agent
function detectBrowser(userAgent: string): string {
  if (!userAgent) return "Unknown browser"

  if (userAgent.includes("Chrome") && !userAgent.includes("Chromium") && !userAgent.includes("Edg")) {
    return "Chrome"
  } else if (userAgent.includes("Firefox") && !userAgent.includes("Seamonkey")) {
    return "Firefox"
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome") && !userAgent.includes("Chromium")) {
    return "Safari"
  } else if (userAgent.includes("Edg")) {
    return "Edge"
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
    return "Internet Explorer"
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera"
  }

  return "Unknown browser"
}

// Detect operating system from user agent
function detectOS(userAgent: string): string {
  if (!userAgent) return "Unknown OS"

  if (userAgent.includes("Windows")) {
    return "Windows"
  } else if (userAgent.includes("Mac OS")) {
    return "macOS"
  } else if (userAgent.includes("Android")) {
    return "Android"
  } else if (userAgent.includes("iOS") || userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    return "iOS"
  } else if (userAgent.includes("Linux")) {
    return "Linux"
  }

  return "Unknown OS"
}

// Detect device from user agent
function detectDevice(userAgent: string): string {
  if (!userAgent) return "Unknown device"

  // iPhone detection
  const iPhoneRegex = /iPhone(?:\s+(\d+))?/i
  const iPhoneMatch = userAgent.match(iPhoneRegex)
  if (iPhoneMatch) {
    // Try to determine iPhone model
    if (userAgent.includes("iPhone14,") || userAgent.includes("iPhone15,")) {
      return "iPhone 13/14 Series"
    } else if (userAgent.includes("iPhone12,") || userAgent.includes("iPhone13,")) {
      return "iPhone 11/12 Series"
    } else if (userAgent.includes("iPhone10,")) {
      return "iPhone X/XS/XR"
    } else {
      return "iPhone"
    }
  }

  // iPad detection
  if (userAgent.includes("iPad")) {
    if (userAgent.includes("iPad Pro")) {
      return "iPad Pro"
    } else if (userAgent.includes("iPad Air")) {
      return "iPad Air"
    } else {
      return "iPad"
    }
  }

  // Mac detection
  if (userAgent.includes("Macintosh")) {
    if (userAgent.includes("MacBook Pro")) {
      return "MacBook Pro"
    } else if (userAgent.includes("MacBook Air")) {
      return "MacBook Air"
    } else if (userAgent.includes("iMac")) {
      return "iMac"
    } else {
      return "Mac"
    }
  }

  // Samsung detection
  const samsungRegex = /SM-[A-Z0-9]+/i
  const samsungMatch = userAgent.match(samsungRegex)
  if (samsungMatch) {
    const model = samsungMatch[0]
    if (model.includes("SM-G") || model.includes("SM-N")) {
      return `Samsung Galaxy (${model})`
    } else {
      return `Samsung (${model})`
    }
  }

  // Google Pixel detection
  if (userAgent.includes("Pixel")) {
    const pixelRegex = /Pixel\s+(\d+)/i
    const pixelMatch = userAgent.match(pixelRegex)
    if (pixelMatch && pixelMatch[1]) {
      return `Google Pixel ${pixelMatch[1]}`
    } else {
      return "Google Pixel"
    }
  }

  // Generic Android detection
  if (userAgent.includes("Android")) {
    return "Android Device"
  }

  // Desktop detection
  if (userAgent.includes("Windows")) {
    return "Windows PC"
  }

  return "Unknown device"
}

// US States data
const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
  { value: "DC", label: "District of Columbia" },
]

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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [cityLookupStatus, setCityLookupStatus] = useState<"idle" | "found" | "not_found">("idle")
  const [foundCityInfo, setFoundCityInfo] = useState<{ city: string; state: string } | null>(null)
  const [cityConfirmed, setCityConfirmed] = useState(false)

  const [showGateCodeQuestion, setShowGateCodeQuestion] = useState(false)

  const { executeRecaptcha, error: recaptchaError } = useRecaptcha()

  // Enhanced form validation for better data quality
  function validateForm(): boolean {
    let isValid = true
    const errors: Record<string, string> = {}

    // Name validation - minimum 2 characters, alphanumeric with spaces
    if (!formData.name.trim()) {
      errors.name = "Please enter your name"
      isValid = false
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
      isValid = false
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      errors.name = "Name contains invalid characters"
      isValid = false
    }

    // Email validation - standard email format
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }

    // Phone validation - must be 10 digits
    if (!formData.phone.trim()) {
      errors.phone = "Please enter your phone number"
      isValid = false
    } else {
      // Remove all non-numeric characters and check length
      const cleanPhone = formData.phone.replace(/\D/g, "")
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        errors.phone = "Please enter a valid 10-digit phone number"
        isValid = false
      }
    }

    // Service validation
    if (!formData.service) {
      errors.service = "Please select a service"
      isValid = false
    }

    // Service urgency validation
    if (!formData.serviceUrgency) {
      errors.serviceUrgency = "Please select when you need service"
      isValid = false
    }

    // ZIP code validation - must be 5 digits
    if (!formData.zipCode) {
      errors.zipCode = "Please enter your ZIP code"
      isValid = false
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      errors.zipCode = "Please enter a valid 5-digit ZIP code"
      isValid = false
    }

    // Address validation - only if we've gone past the ZIP code/city confirmation
    if (cityConfirmed || cityLookupStatus === "not_found") {
      // Street validation
      if (!formData.street.trim()) {
        errors.street = "Please enter your street address"
        isValid = false
      }

      // City validation
      if (!formData.city.trim()) {
        errors.city = "Please enter your city"
        isValid = false
      } else if (!/^[a-zA-Z\s.-]+$/.test(formData.city.trim())) {
        errors.city = "City contains invalid characters"
        isValid = false
      }

      // State validation
      if (!formData.state) {
        errors.state = "Please select your state"
        isValid = false
      }
    }

    setFieldErrors(errors)

    if (!isValid) {
      setError("Please correct the errors in the form")
    } else {
      setError(null)
    }

    return isValid
  }

  // Add input formatting for phone numbers
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

    // Clear the error for this field when the user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }

    // Special case for phone formatting
    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value)
      setFormData((prev) => ({ ...prev, [name]: formattedPhone }))
      return // Skip the regular setFormData below
    }

    // Special case for ZIP code
    if (name === "zipCode") {
      // Only allow digits
      const digitOnly = value.replace(/\D/g, "")

      // Reset city lookup if zip code is changed
      if (digitOnly !== formData.zipCode) {
        setCityLookupStatus("idle")
        setFoundCityInfo(null)
        setCityConfirmed(false)

        // If zip code is 5 digits, try to look up the city
        if (digitOnly.length === 5) {
          const cityInfo = findCityByZipCode(digitOnly)
          if (cityInfo) {
            setFoundCityInfo(cityInfo)
            setCityLookupStatus("found")
          } else {
            setCityLookupStatus("not_found")
          }
        }
      }

      // Update with digits only
      setFormData((prev) => ({ ...prev, [name]: digitOnly }))
      return
    }

    // Special case for name to auto-capitalize
    if (name === "name") {
      const capitalizedName = value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      setFormData((prev) => ({ ...prev, [name]: capitalizedName }))
      return
    }

    // Special case for city to auto-capitalize
    if (name === "city") {
      const capitalizedCity = value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
      setFormData((prev) => ({ ...prev, [name]: capitalizedCity }))
      return
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
      // Scroll to the first error
      if (formRef.current) {
        const firstErrorField = formRef.current.querySelector('[aria-invalid="true"]')
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }
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

      // Collect client-side user information with enhanced detection
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
      setFieldErrors({})
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
              className={cn(
                "w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                fieldErrors.name && "border-red-500 focus:ring-red-500 focus:border-red-500",
              )}
              aria-label="Your Name"
              aria-invalid={fieldErrors.name ? "true" : "false"}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            {fieldErrors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="tel"
                id="quick-phone"
                name="phone"
                placeholder="Phone Number*"
                required
                value={formData.phone}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                  fieldErrors.phone && "border-red-500 focus:ring-red-500 focus:border-red-500",
                )}
                aria-label="Phone Number"
                aria-invalid={fieldErrors.phone ? "true" : "false"}
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              />
              {fieldErrors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-500">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                id="quick-email"
                name="email"
                placeholder="Email Address*"
                required
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                  fieldErrors.email && "border-red-500 focus:ring-red-500 focus:border-red-500",
                )}
                aria-label="Email Address"
                aria-invalid={fieldErrors.email ? "true" : "false"}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
              {fieldErrors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500">
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                id="quick-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                  fieldErrors.service && "border-red-500 focus:ring-red-500 focus:border-red-500",
                )}
                aria-label="Service Needed"
                aria-invalid={fieldErrors.service ? "true" : "false"}
                aria-describedby={fieldErrors.service ? "service-error" : undefined}
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
              {fieldErrors.service && (
                <p id="service-error" className="mt-1 text-sm text-red-500">
                  {fieldErrors.service}
                </p>
              )}
            </div>

            <div>
              <select
                id="service-urgency"
                name="serviceUrgency"
                value={formData.serviceUrgency}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
                  fieldErrors.serviceUrgency && "border-red-500 focus:ring-red-500 focus:border-red-500",
                )}
                aria-label="When do you need service?"
                aria-invalid={fieldErrors.serviceUrgency ? "true" : "false"}
                aria-describedby={fieldErrors.serviceUrgency ? "urgency-error" : undefined}
              >
                <option value="">When do you need service?</option>
                <option value="asap">ASAP</option>
                <option value="today">Today if possible</option>
                <option value="few-days">Within the next few days</option>
                <option value="few-weeks">Within the next few weeks</option>
                <option value="not-sure">Not sure yet</option>
              </select>
              {fieldErrors.serviceUrgency && (
                <p id="urgency-error" className="mt-1 text-sm text-red-500">
                  {fieldErrors.serviceUrgency}
                </p>
              )}
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
                  fieldErrors.zipCode && "border-red-500 focus:ring-red-500 focus:border-red-500",
                )}
                placeholder="Enter your 5-digit ZIP code"
                aria-required="true"
                autoComplete="postal-code"
                aria-invalid={fieldErrors.zipCode ? "true" : "false"}
                aria-describedby={fieldErrors.zipCode ? "zip-error" : undefined}
              />
              {fieldErrors.zipCode && (
                <p id="zip-error" className="mt-1 text-sm text-red-500">
                  {fieldErrors.zipCode}
                </p>
              )}
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
                    fieldErrors.street && "border-red-500 focus:ring-red-500 focus:border-red-500",
                  )}
                  placeholder="123 Main Street"
                  aria-required="true"
                  autoComplete="address-line1"
                  aria-invalid={fieldErrors.street ? "true" : "false"}
                  aria-describedby={fieldErrors.street ? "street-error" : undefined}
                />
                {fieldErrors.street && (
                  <p id="street-error" className="mt-1 text-sm text-red-500">
                    {fieldErrors.street}
                  </p>
                )}
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
                      fieldErrors.city && "border-red-500 focus:ring-red-500 focus:border-red-500",
                    )}
                    placeholder="Your city"
                    aria-required="true"
                    autoComplete="address-level2"
                    aria-invalid={fieldErrors.city ? "true" : "false"}
                    aria-describedby={fieldErrors.city ? "city-error" : undefined}
                  />
                  {fieldErrors.city && (
                    <p id="city-error" className="mt-1 text-sm text-red-500">
                      {fieldErrors.city}
                    </p>
                  )}
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
                  className={cn(
                    "w-full px-4 py-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900",
                    fieldErrors.state && "border-red-500 focus:ring-red-500 focus:border-red-500",
                  )}
                  aria-required="true"
                  autoComplete="address-level1"
                  aria-invalid={fieldErrors.state ? "true" : "false"}
                  aria-describedby={fieldErrors.state ? "state-error" : undefined}
                >
                  <option value="">Select State</option>
                  {US_STATES.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.state && (
                  <p id="state-error" className="mt-1 text-sm text-red-500">
                    {fieldErrors.state}
                  </p>
                )}
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
