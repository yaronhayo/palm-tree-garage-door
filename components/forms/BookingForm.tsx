"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useServiceAreaTracking } from "@/hooks/useServiceAreaTracking"
import { FORM_TYPES } from "@/lib/analytics/ga-config"

interface BookingFormProps {
  prefilledCity?: string
}

export default function BookingForm({ prefilledCity }: BookingFormProps) {
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    }

    if (!formData.service) {
      newErrors.service = "Please select a service"
      isValid = false
    }

    if (!formData.date) {
      newErrors.date = "Please select a date"
      isValid = false
    }

    if (!formData.time) {
      newErrors.time = "Please select a time"
      isValid = false
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
      isValid = false
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
      isValid = false
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
      // Track form submission with service area data
      trackFormWithServiceArea(FORM_TYPES.BOOKING, {
        ...formData,
        formLocation: window.location.pathname,
        submissionTime: new Date().toISOString(),
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

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
    } catch (error) {
      setFormStatus({
        success: false,
        message: "There was an error submitting your request. Please try again or call us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-primary-600 mb-6">Schedule Your Service</h2>

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
