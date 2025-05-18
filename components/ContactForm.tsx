"use client"

import type React from "react"

import { useState } from "react"
import { sendContactForm } from "@/lib/actions"
import { isValidEmail, formatPhoneNumber } from "@/lib/utils"
import { CheckCircle, Loader2, AlertTriangle } from "lucide-react"
import { useRecaptcha } from "@/hooks/useRecaptcha"
import { verifyRecaptchaAction } from "@/lib/actions/recaptcha-actions"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  // Initialize reCAPTCHA hook
  const { isLoaded: recaptchaLoaded, error: recaptchaError, getToken } = useRecaptcha()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target

    // Format phone number as user types
    if (name === "phone") {
      setFormData({
        ...formData,
        [name]: formatPhoneNumber(value),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    }

    if (!formData.service) {
      newErrors.service = "Please select a service"
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
      // Get reCAPTCHA token using our server action
      const recaptchaToken = await getToken("contact_form_submit")

      // Verify the token using our server action
      const recaptchaResult = await verifyRecaptchaAction(recaptchaToken, "contact_form_submit")

      // If verification failed and we're not in development mode, show an error
      if (!recaptchaResult.success && process.env.NODE_ENV === "production") {
        throw new Error("Could not verify that you are human. Please try again or refresh the page.")
      }

      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      // Add reCAPTCHA token to form data
      if (recaptchaToken) {
        formDataObj.append("recaptchaToken", recaptchaToken)
      }

      const result = await sendContactForm(formDataObj)
      setFormStatus({
        success: true,
        message: "Thank you! Your message has been sent successfully. We'll be in touch soon.",
      })

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })

      // Push to dataLayer for conversion tracking
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "formSubmission",
          formName: "contactForm",
          formData: {
            service: formData.service,
          },
        })
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "There was an error sending your message. Please try again or call us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show reCAPTCHA error if there is one and we're not in development mode
  const showRecaptchaError = recaptchaError && process.env.NODE_ENV === "production"

  return (
    <form onSubmit={handleSubmit} className="space-y-4" id="contact-form" name="contact-form">
      {formStatus && formStatus.success ? (
        <div className="bg-green-50 p-6 rounded-md text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
          <p className="text-green-700">{formStatus.message}</p>
          <button
            type="button"
            onClick={() => setFormStatus(null)}
            className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            id="contact-reset"
            name="contact-reset"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          {/* reCAPTCHA Error Message */}
          {showRecaptchaError && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-700">
                  There was an issue loading our security verification. Please refresh the page and try again.
                </p>
                <p className="text-yellow-600 text-sm mt-1">Error: {recaptchaError}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete="name"
              />
              {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                  formErrors.phone ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete="tel"
              />
              {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
              autoComplete="email"
            />
            {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="contact-service" className="block text-sm font-medium text-gray-700 mb-1">
              Service Needed <span className="text-red-500">*</span>
            </label>
            <select
              id="contact-service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                formErrors.service ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a service</option>
              <option value="Garage Door Repair">Garage Door Repair</option>
              <option value="New Door Installation">New Door Installation</option>
              <option value="Spring Replacement">Spring Replacement</option>
              <option value="Opener Installation/Repair">Opener Installation/Repair</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Emergency Service">Emergency Service</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.service && <p className="mt-1 text-sm text-red-500">{formErrors.service}</p>}
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || showRecaptchaError}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-md transition-colors disabled:opacity-70 flex items-center justify-center"
            id="contact-submit"
            name="contact-submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>

          {formStatus && !formStatus.success && (
            <div className="p-4 rounded-md bg-red-50 text-red-800">{formStatus.message}</div>
          )}

          <div className="text-center text-xs text-gray-500">
            <p>
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-primary-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                className="text-primary-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </>
      )}
    </form>
  )
}
