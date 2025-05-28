"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useServiceAreaTracking } from "@/hooks/useServiceAreaTracking"
import { FORM_TYPES } from "@/lib/analytics"
import { getCurrentEasternTime, formatEasternTime } from "@/lib/date-utils"
import { useRecaptcha } from "@/hooks/useRecaptcha"

interface BookingFormProps {
  prefilledCity?: string
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

export default function BookingForm({ prefilledCity }: BookingFormProps) {
  const router = useRouter()
  const { trackFormWithServiceArea, setServiceArea } = useServiceAreaTracking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
    city: prefilledCity || "",
    zipCode: "",
    isEmergency: false,
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    city: "",
    zipCode: "",
  })

  const { executeRecaptcha, error: recaptchaError } = useRecaptcha()
  const [showRecaptchaMessage, setShowRecaptchaMessage] = useState(false)

  // Only show reCAPTCHA error message after a delay to prevent flashing
  useEffect(() => {
    if (recaptchaError) {
      const timer = setTimeout(() => {
        setShowRecaptchaMessage(true)
      }, 3000) // Show message after 3 seconds if error persists

      return () => clearTimeout(timer)
    } else {
      setShowRecaptchaMessage(false)
    }
  }, [recaptchaError])

  const serviceOptions = [
    { value: "", label: "Select a service" },
    { value: "repair", label: "Garage Door Repair" },
    { value: "installation", label: "New Door Installation" },
    { value: "spring", label: "Spring Replacement" },
    { value: "opener", label: "Opener Installation/Repair" },
    { value: "maintenance", label: "Maintenance" },
    { value: "emergency", label: "Emergency Service" },
    { value: "other", label: "Other" },
  ]

  const timeOptions = [
    { value: "", label: "Select a time" },
    { value: "morning", label: "Morning (8AM - 12PM)" },
    { value: "afternoon", label: "Afternoon (12PM - 4PM)" },
    { value: "evening", label: "Evening (4PM - 8PM)" },
    { value: "asap", label: "As Soon As Possible" },
  ]

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target

    // If city is being changed, update service area tracking
    if (name === "city" && value) {
      setServiceArea(value, formData.zipCode)
    }

    // If zipCode is being changed, update service area tracking
    if (name === "zipCode" && value) {
      setServiceArea(formData.city, value)
    }

    // Check if emergency service is selected
    const isEmergency = name === "service" && value === "emergency"

    setFormData({
      ...formData,
      [name]: value,
      ...(name === "service" ? { isEmergency } : {}),
    })

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  function validateForm(): boolean {
    let isValid = true
    const newErrors = { ...formErrors }

    // Name validation - ensure it contains at least first and last name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    } else if (formData.name.trim().split(" ").length < 2) {
      newErrors.name = "Please enter your full name"
      isValid = false
    }

    // Phone validation - ensure it's a valid format
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    } else {
      // Remove all non-numeric characters and check length
      const cleanPhone = formData.phone.replace(/\D/g, "")
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        newErrors.phone = "Please enter a valid 10-digit phone number"
        isValid = false
      }
    }

    // Email validation with regex
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
        isValid = false
      }
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = "Please select a service"
      isValid = false
    }

    // Date validation - ensure it's not in the past
    if (!formData.date) {
      newErrors.date = "Please select a date"
      isValid = false
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.date = "Please select a future date"
        isValid = false
      }
    }

    // Time validation
    if (!formData.time) {
      newErrors.time = "Please select a time"
      isValid = false
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required"
      isValid = false
    }

    // ZIP code validation - ensure it's 5 digits
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
      isValid = false
    } else {
      const zipRegex = /^\d{5}$/
      if (!zipRegex.test(formData.zipCode)) {
        newErrors.zipCode = "Please enter a valid 5-digit ZIP code"
        isValid = false
      }
    }

    setFormErrors(newErrors)
    return isValid
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setFormStatus(null)

    try {
      // Try to execute reCAPTCHA, but continue even if it fails
      let recaptchaToken = null
      try {
        recaptchaToken = await executeRecaptcha("booking_form")
      } catch (recaptchaError) {
        console.warn("reCAPTCHA execution failed, continuing without verification:", recaptchaError)
      }

      // Track form submission with service area data
      trackFormWithServiceArea(FORM_TYPES.BOOKING, {
        ...formData,
        formLocation: window.location.pathname,
        submissionTime: formatEasternTime(getCurrentEasternTime()),
      })

      // Collect client-side user information with enhanced detection
      const clientUserInfo = typeof window !== "undefined" ? collectClientUserInfo() : {}

      // Get current Eastern Time
      const easternTime = formatEasternTime(getCurrentEasternTime())

      // Prepare form data for submission
      const submissionData = {
        ...formData,
        formType: "booking",
        submissionTime: easternTime,
        timeZone: "America/New_York (Eastern Time)",
      }

      // Submit to our API endpoint
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: submissionData,
          recaptchaToken: recaptchaToken,
          userInfo: {
            ...clientUserInfo,
            submissionTimeEastern: easternTime,
            exactSubmissionTime: new Date().toISOString(),
          },
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Form submission failed")
      }

      setFormStatus({
        success: true,
        message: "Thank you! Your booking request has been received. We'll contact you shortly to confirm.",
      })

      // Reset form after successful submission
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        message: "",
        city: "",
        zipCode: "",
        isEmergency: false,
      })

      // Redirect to thank you page
      setTimeout(() => {
        router.push("/thank-you")
      }, 2000)
    } catch (error) {
      console.error("Form submission error:", error)

      setFormStatus({
        success: false,
        message: "There was an error submitting your request. Please try again or call us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target

    // Validate specific fields on blur for immediate feedback
    switch (name) {
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setFormErrors((prev) => ({
            ...prev,
            email: "Please enter a valid email address",
          }))
        }
        break
      case "phone":
        if (value) {
          const cleanPhone = value.replace(/\D/g, "")
          if (cleanPhone.length < 10 || cleanPhone.length > 11) {
            setFormErrors((prev) => ({
              ...prev,
              phone: "Please enter a valid 10-digit phone number",
            }))
          }
        }
        break
      case "zipCode":
        if (value && !/^\d{5}$/.test(value)) {
          setFormErrors((prev) => ({
            ...prev,
            zipCode: "Please enter a valid 5-digit ZIP code",
          }))
        }
        break
    }
  }

  // Get today's date in YYYY-MM-DD format for min date attribute
  // Use Eastern Time for the date
  const today = getCurrentEasternTime().toISOString().split("T")[0]

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">Schedule Your Service</h2>

      {recaptchaError && showRecaptchaMessage && (
        <div className="p-3 mb-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-700">
            <span className="font-medium">Note:</span> Security verification is currently unavailable. Your form will
            still be submitted.
          </p>
        </div>
      )}

      {formStatus ? (
        <div
          className={cn(
            "p-4 rounded-md mb-6",
            formStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800",
          )}
        >
          <p className="font-medium">{formStatus.message}</p>
          {formStatus.success && (
            <button
              onClick={() => setFormStatus(null)}
              className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Book Another Service
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" name="booking-form" id="booking-form">
          <div>
            <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="booking-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={cn(
                "w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500",
                formErrors.name ? "border-red-500" : "border-gray-300",
              )}
              placeholder="Your full name"
              autoComplete="name"
            />
            {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="booking-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleInputBlur}
                className={cn(
                  "w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500",
                  formErrors.phone ? "border-red-500" : "border-gray-300",
                )}
                placeholder="(321) 123-4567"
                autoComplete="tel"
              />
              {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
            </div>

            <div>
              <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="booking-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleInputBlur}
                className={cn(
                  "w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500",
                  formErrors.email ? "border-red-500" : "border-gray-300",
                )}
                placeholder="your@email.com"
                autoComplete="email"
              />
              {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-city" className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="booking-city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500",
                  formErrors.city ? "border-red-500" : "border-gray-300",
                )}
                placeholder="Your city"
                autoComplete="address-level2"
              />
              {formErrors.city && <p className="mt-1 text-sm text-red-500">{formErrors.city}</p>}
            </div>

            <div>
              <label htmlFor="booking-zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="booking-zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                onBlur={handleInputBlur}
                className={cn(
                  "w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500",
                  formErrors.zipCode ? "border-red-500" : "border-gray-300",
                )}
                placeholder="33445"
                autoComplete="postal-code"
              />
              {formErrors.zipCode && <p className="mt-1 text-sm text-red-500">{formErrors.zipCode}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="booking-service" className="block text-sm font-medium text-gray-700 mb-1">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              id="booking-service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={cn(
                "w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500",
                formErrors.service ? "border-red-500" : "border-gray-300",
              )}
            >
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formErrors.service && <p className="mt-1 text-sm text-red-500">{formErrors.service}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="booking-date" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="booking-date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 pl-10",
                    formErrors.date ? "border-red-500" : "border-gray-300",
                  )}
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              {formErrors.date && <p className="mt-1 text-sm text-red-500">{formErrors.date}</p>}
            </div>

            <div>
              <label htmlFor="booking-time" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="booking-time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={cn(
                    "w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 pl-10",
                    formErrors.time ? "border-red-500" : "border-gray-300",
                  )}
                >
                  {timeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              {formErrors.time && <p className="mt-1 text-sm text-red-500">{formErrors.time}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="booking-message" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details
            </label>
            <textarea
              id="booking-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              placeholder="Please provide any additional details about your garage door issue..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center"
            id="booking-submit"
            name="booking-submit"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                Schedule Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By submitting this form, you agree to our terms and privacy policy. We'll contact you shortly to confirm
            your appointment.
          </p>
        </form>
      )}
    </div>
  )
}
