"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Loader2,
  Calendar,
  MapPin,
  PenToolIcon as Tool,
  Wrench,
  Cog,
  Home,
  HelpCircle,
  Clock,
  AlertTriangle,
  Check,
  X,
  Building,
  KeyRound,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { serviceAreas } from "@/data/service-areas"

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

export default function QuickContactForm({ showBookingForm, setShowBookingForm }: QuickContactFormProps) {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  // City lookup state
  const [cityLookupStatus, setCityLookupStatus] = useState<"idle" | "found" | "not_found">("idle")
  const [foundCityInfo, setFoundCityInfo] = useState<{ city: string; state: string } | null>(null)
  const [cityConfirmed, setCityConfirmed] = useState(false)

  // Gate code question state
  const [showGateCodeQuestion, setShowGateCodeQuestion] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    urgency: "",
    message: "",
    zipCode: "",
    city: "",
    state: "",
    streetNumber: "",
    streetName: "",
    unit: "",
    gateCode: "",
    specialInstructions: "",
  })

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    urgency: "",
    zipCode: "",
    city: "",
    streetNumber: "",
    streetName: "",
  })

  const serviceOptions = [
    {
      value: "door-stuck",
      label: "Door Won't Open/Close",
      icon: <Wrench className="h-5 w-5" aria-hidden="true" />,
      description: "Door is stuck, jammed, or won't move properly",
    },
    {
      value: "broken-spring",
      label: "Broken Spring",
      icon: <Cog className="h-5 w-5" aria-hidden="true" />,
      description: "Door spring is broken or damaged",
    },
    {
      value: "opener-problem",
      label: "Opener Not Working",
      icon: <Tool className="h-5 w-5" aria-hidden="true" />,
      description: "Remote or wall button not operating door",
    },
    {
      value: "new-door",
      label: "Need New Door",
      icon: <Home className="h-5 w-5" aria-hidden="true" />,
      description: "Looking to replace or install a new door",
    },
    {
      value: "other-issue",
      label: "Other Issue",
      icon: <HelpCircle className="h-5 w-5" aria-hidden="true" />,
      description: "Any other garage door related problem",
    },
  ]

  const urgencyOptions = [
    {
      value: "emergency",
      label: "Emergency - ASAP",
      icon: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
      description: "Urgent issue requiring immediate attention",
    },
    {
      value: "today",
      label: "Today if possible",
      icon: <Clock className="h-5 w-5" aria-hidden="true" />,
      description: "Would like service as soon as today",
    },
    {
      value: "this_week",
      label: "This week",
      icon: <Calendar className="h-5 w-5" aria-hidden="true" />,
      description: "Need service sometime this week",
    },
    {
      value: "next_week",
      label: "Next week",
      icon: <Calendar className="h-5 w-5" aria-hidden="true" />,
      description: "Planning for service next week",
    },
    {
      value: "planning",
      label: "Just planning ahead",
      icon: <Calendar className="h-5 w-5" aria-hidden="true" />,
      description: "Getting information for future service",
    },
  ]

  // Reset form when showBookingForm changes
  useEffect(() => {
    if (showBookingForm) {
      setCurrentStep(1)
      setFormStatus(null)
      setCityLookupStatus("idle")
      setFoundCityInfo(null)
      setCityConfirmed(false)
      setShowGateCodeQuestion(false)
    }
  }, [showBookingForm])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target

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

    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  function handleCityConfirm() {
    if (foundCityInfo) {
      setFormData({
        ...formData,
        city: foundCityInfo.city,
        state: foundCityInfo.state,
      })
      setCityConfirmed(true)
    }
  }

  function handleCityReject() {
    setCityLookupStatus("not_found")
    setCityConfirmed(false)
  }

  function validateStep(step: number): boolean {
    let isValid = true
    const newErrors = { ...formErrors }

    if (step === 1) {
      if (!formData.service) {
        newErrors.service = "Please select a service"
        isValid = false
      }
    } else if (step === 2) {
      if (!formData.urgency) {
        newErrors.urgency = "Please select urgency"
        isValid = false
      }
    } else if (step === 3) {
      if (!formData.zipCode.trim()) {
        newErrors.zipCode = "ZIP code is required"
        isValid = false
      } else if (formData.zipCode.length !== 5 || !/^\d+$/.test(formData.zipCode)) {
        newErrors.zipCode = "Please enter a valid 5-digit ZIP code"
        isValid = false
      }

      if (!cityConfirmed && cityLookupStatus === "found") {
        isValid = false
        // No error message needed as the UI will show the confirmation buttons
      }

      if (cityLookupStatus === "not_found" && !formData.city.trim()) {
        newErrors.city = "City is required"
        isValid = false
      }

      if (!formData.streetNumber.trim()) {
        newErrors.streetNumber = "Street number is required"
        isValid = false
      }

      if (!formData.streetName.trim()) {
        newErrors.streetName = "Street name is required"
        isValid = false
      }

      // If we're showing the gate code question, we need to check if we should proceed to the next step
      // or just hide the question and stay on step 3
      if (showGateCodeQuestion) {
        // No validation needed for gate code, just hide the question and proceed
        setShowGateCodeQuestion(false)
        return true
      }
    } else if (step === 4) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required"
        isValid = false
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
        isValid = false
      } else if (!/^[\d\s$$$$\-+]{10,15}$/.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number"
        isValid = false
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email"
        isValid = false
      }
    }

    setFormErrors(newErrors)
    return isValid
  }

  function handleNext() {
    if (validateStep(currentStep)) {
      // If we're on step 3 and have valid address info but haven't shown the gate code question yet
      if (currentStep === 3 && !showGateCodeQuestion && formData.streetNumber && formData.streetName) {
        setShowGateCodeQuestion(true)
        return
      }

      setCurrentStep(currentStep + 1)
    }
  }

  function handleBack() {
    // If we're showing the gate code question, go back to the address form
    if (showGateCodeQuestion) {
      setShowGateCodeQuestion(false)
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  function handleServiceSelect(service: string) {
    setFormData({
      ...formData,
      service,
    })
    setFormErrors({
      ...formErrors,
      service: "",
    })
    // Automatically go to next step after selection
    setTimeout(() => {
      setCurrentStep(2)
    }, 300)
  }

  function handleUrgencySelect(urgency: string) {
    setFormData({
      ...formData,
      urgency,
    })
    setFormErrors({
      ...formErrors,
      urgency: "",
    })
    // Automatically go to next step after selection
    setTimeout(() => {
      setCurrentStep(3)
    }, 300)
  }

  function getFormattedAddress() {
    const parts = [formData.streetNumber, formData.streetName].filter(Boolean).join(" ")

    const unitPart = formData.unit ? `Unit ${formData.unit}` : ""
    const cityStatePart = `${formData.city}, ${formData.state} ${formData.zipCode}`

    return [parts, unitPart, cityStatePart].filter(Boolean).join(", ")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    setIsSubmitting(true)
    setFormStatus(null)

    try {
      // Prepare form data for submission
      const formspreeData = {
        ...formData,
        formattedAddress: getFormattedAddress(),
        submissionTime: new Date().toISOString(),
      }

      // Submit to Formspree
      const response = await fetch("https://formspree.io/f/YOUR_FORMSPREE_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formspreeData),
      })

      if (!response.ok) {
        throw new Error("Form submission failed")
      }

      setFormStatus({
        success: true,
        message: "Thank you! Your request has been received. We'll contact you shortly.",
      })

      // Reset form after successful submission
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

  const progressPercentage = (currentStep / 4) * 100

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-primary-600 mb-2">Schedule Your Service</h2>
      <p className="text-gray-600 mb-6">Tell us about your garage door issue and we'll get back to you quickly.</p>

      {formStatus ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-6 rounded-lg mb-6 text-center",
            formStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800",
          )}
          role="alert"
          aria-live="polite"
        >
          <div className="flex flex-col items-center justify-center">
            {formStatus.success ? (
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" aria-hidden="true" />
            ) : (
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" aria-hidden="true" />
            )}
            <p className="text-lg font-medium mb-2">{formStatus.message}</p>
            {formStatus.success && <p className="text-sm">Redirecting you to our thank you page...</p>}
          </div>
        </motion.div>
      ) : (
        <div>
          {/* Progress Bar */}
          <div
            className="w-full bg-gray-200 rounded-full h-2 mb-6"
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="bg-accent-500 h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="text-sm text-gray-500 mb-4 flex justify-between">
            <span>Step {currentStep} of 4</span>
            <span>
              {currentStep === 1
                ? "Service"
                : currentStep === 2
                  ? "Urgency"
                  : currentStep === 3
                    ? "Location"
                    : "Contact Info"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentStep}-${showGateCodeQuestion ? "gate" : "address"}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700 text-center">What issue are you experiencing?</h3>
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    role="radiogroup"
                    aria-required="true"
                    aria-label="Service selection"
                  >
                    {serviceOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleServiceSelect(option.value)}
                        className={cn(
                          "p-4 rounded-lg border-2 transition-all duration-300 flex flex-col items-center text-center hover:shadow-md",
                          formData.service === option.value
                            ? "border-accent-500 bg-accent-50"
                            : "border-gray-200 hover:border-accent-300 hover:bg-accent-50/50",
                        )}
                        role="radio"
                        aria-checked={formData.service === option.value}
                        aria-label={option.label}
                        id={`service-option-${option.value}`}
                        name={`service-option-${option.value}`}
                      >
                        <div
                          className={cn(
                            "p-3 rounded-full mb-3",
                            formData.service === option.value
                              ? "bg-accent-500 text-white"
                              : "bg-gray-100 text-primary-600",
                          )}
                        >
                          {option.icon}
                        </div>
                        <span
                          className={cn(
                            "font-medium text-primary-600 mb-1",
                            formData.service === option.value ? "text-primary-700" : "",
                          )}
                        >
                          {option.label}
                        </span>
                        <p className="text-sm text-gray-500">{option.description}</p>
                        {formData.service === option.value && (
                          <CheckCircle2 className="mt-2 h-5 w-5 text-accent-500" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>
                  {formErrors.service && (
                    <p className="text-red-500 text-sm mt-1 text-center" role="alert">
                      {formErrors.service}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">How urgent is your request?</h3>
                  <div className="space-y-3" role="radiogroup" aria-required="true" aria-label="Urgency selection">
                    {urgencyOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleUrgencySelect(option.value)}
                        className={cn(
                          "w-full p-3 rounded-lg border-2 transition-all duration-300 text-left hover:shadow-md",
                          formData.urgency === option.value
                            ? "border-accent-500 bg-accent-50"
                            : "border-gray-200 hover:border-accent-300 hover:bg-accent-50/50",
                        )}
                        role="radio"
                        aria-checked={formData.urgency === option.value}
                        aria-label={option.label}
                        id={`urgency-option-${option.value}`}
                        name={`urgency-option-${option.value}`}
                      >
                        <div className="flex items-center w-full">
                          <div
                            className={cn(
                              "p-2 rounded-full mr-3",
                              formData.urgency === option.value
                                ? "bg-accent-500 text-white"
                                : "bg-gray-100 text-primary-600",
                            )}
                          >
                            {option.icon}
                          </div>
                          <span
                            className={cn(
                              "font-medium text-primary-600",
                              formData.urgency === option.value ? "text-primary-700" : "",
                            )}
                          >
                            {option.label}
                          </span>
                          {formData.urgency === option.value && (
                            <CheckCircle2 className="ml-auto h-5 w-5 text-accent-500" aria-hidden="true" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 pl-10">{option.description}</p>
                      </button>
                    ))}
                  </div>
                  {formErrors.urgency && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {formErrors.urgency}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 3 && !showGateCodeQuestion && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Where are you located?</h3>

                  {/* ZIP Code Field - First */}
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin
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
                          formErrors.zipCode ? "border-red-500" : "border-gray-300",
                        )}
                        placeholder="Enter your 5-digit ZIP code"
                        aria-required="true"
                        aria-invalid={!!formErrors.zipCode}
                        aria-describedby={formErrors.zipCode ? "zipCode-error" : undefined}
                        autoComplete="postal-code"
                      />
                    </div>
                    {formErrors.zipCode && (
                      <p id="zipCode-error" className="text-red-500 text-sm mt-1" role="alert">
                        {formErrors.zipCode}
                      </p>
                    )}
                  </div>

                  {/* City Confirmation */}
                  {cityLookupStatus === "found" && foundCityInfo && !cityConfirmed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-4 border border-accent-300 bg-accent-50 rounded-lg"
                      role="region"
                      aria-live="polite"
                    >
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
                          <Check className="mr-1 h-4 w-4" aria-hidden="true" /> Yes, that's correct
                        </button>
                        <button
                          type="button"
                          onClick={handleCityReject}
                          className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all duration-300"
                          id="reject-city"
                          name="reject-city"
                        >
                          <X className="mr-1 h-4 w-4" aria-hidden="true" /> No, enter manually
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Manual City Entry */}
                  {(cityLookupStatus === "not_found" || (cityLookupStatus === "found" && cityConfirmed)) && (
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building
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
                            formErrors.city ? "border-red-500" : "border-gray-300",
                            cityConfirmed ? "bg-gray-100" : "",
                          )}
                          placeholder="Your city"
                          aria-required="true"
                          aria-invalid={!!formErrors.city}
                          aria-describedby={formErrors.city ? "city-error" : undefined}
                          autoComplete="address-level2"
                        />
                      </div>
                      {formErrors.city && (
                        <p id="city-error" className="text-red-500 text-sm mt-1" role="alert">
                          {formErrors.city}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Street Address Fields */}
                  {(cityConfirmed || cityLookupStatus === "not_found") && (
                    <>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                          <label htmlFor="streetNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Street # <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="streetNumber"
                            name="streetNumber"
                            value={formData.streetNumber}
                            onChange={handleChange}
                            className={cn(
                              "w-full px-4 py-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900",
                              formErrors.streetNumber ? "border-red-500" : "border-gray-300",
                            )}
                            placeholder="123"
                            aria-required="true"
                            aria-invalid={!!formErrors.streetNumber}
                            aria-describedby={formErrors.streetNumber ? "streetNumber-error" : undefined}
                            autoComplete="address-line1"
                          />
                          {formErrors.streetNumber && (
                            <p id="streetNumber-error" className="text-red-500 text-sm mt-1" role="alert">
                              {formErrors.streetNumber}
                            </p>
                          )}
                        </div>

                        <div className="col-span-2">
                          <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-1">
                            Street Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="streetName"
                            name="streetName"
                            value={formData.streetName}
                            onChange={handleChange}
                            className={cn(
                              "w-full px-4 py-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900",
                              formErrors.streetName ? "border-red-500" : "border-gray-300",
                            )}
                            placeholder="Main Street"
                            aria-required="true"
                            aria-invalid={!!formErrors.streetName}
                            aria-describedby={formErrors.streetName ? "streetName-error" : undefined}
                            autoComplete="address-line2"
                          />
                          {formErrors.streetName && (
                            <p id="streetName-error" className="text-red-500 text-sm mt-1" role="alert">
                              {formErrors.streetName}
                            </p>
                          )}
                        </div>
                      </div>

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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900"
                          placeholder="Apt 101"
                          aria-required="false"
                          autoComplete="address-line3"
                        />
                      </div>
                    </>
                  )}

                  {/* Address Preview */}
                  {formData.city && formData.streetNumber && formData.streetName && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                      aria-live="polite"
                    >
                      <p className="text-sm text-gray-500 mb-1">Your address:</p>
                      <p className="font-medium text-primary-600">{getFormattedAddress()}</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Gate Code Question */}
              {currentStep === 3 && showGateCodeQuestion && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Access Information</h3>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4" role="region">
                    <div className="flex">
                      <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
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
                      <KeyRound
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                        aria-hidden="true"
                      />
                      <input
                        type="text"
                        id="gateCode"
                        name="gateCode"
                        value={formData.gateCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900"
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

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Your Contact Information</h3>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900",
                        formErrors.name ? "border-red-500" : "border-gray-300",
                      )}
                      placeholder="Your name"
                      aria-required="true"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                      autoComplete="name"
                    />
                    {formErrors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900",
                        formErrors.phone ? "border-red-500" : "border-gray-300",
                      )}
                      placeholder="Your phone number"
                      aria-required="true"
                      aria-invalid={!!formErrors.phone}
                      aria-describedby={formErrors.phone ? "phone-error" : undefined}
                      autoComplete="tel"
                    />
                    {formErrors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900",
                        formErrors.email ? "border-red-500" : "border-gray-300",
                      )}
                      placeholder="Your email address"
                      aria-required="true"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                      autoComplete="email"
                    />
                    {formErrors.email && (
                      <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Details <span className="text-gray-400">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-gray-900"
                      placeholder="Any additional details about your issue"
                      aria-required="false"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-between">
            {currentStep > 1 || showGateCodeQuestion ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-all duration-300"
                aria-label={showGateCodeQuestion ? "Back to address form" : "Back to previous step"}
                id="back-button"
                name="back-button"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-all duration-300 flex items-center group"
                aria-label={`Continue to ${currentStep === 1 ? "urgency" : currentStep === 2 ? "location" : "contact info"}`}
                id="next-button"
                name="next-button"
              >
                Next
                <ChevronRight
                  className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-all duration-300"
                  aria-hidden="true"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-accent-500 text-primary-900 font-bold rounded-md hover:bg-accent-600 transition-all duration-300 flex items-center disabled:opacity-70"
                aria-busy={isSubmitting}
                id="submit-button"
                name="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Request</>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
