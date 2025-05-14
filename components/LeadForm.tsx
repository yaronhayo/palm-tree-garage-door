"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"

// Define the form schema with Zod
const formSchema = z.object({
  // Step 1 fields
  issue: z.string().min(1, "Please select an issue"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters").max(10, "ZIP code is too long"),

  // Step 2 fields
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9()-\s+]*$/, "Phone number can only contain digits, spaces, and these symbols: ()-+"),
  email: z.string().email("Please enter a valid email address"),
})

// TypeScript type for our form data
type FormData = z.infer<typeof formSchema>

export default function LeadForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    getValues,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      issue: "",
      zipCode: "",
      name: "",
      phone: "",
      email: "",
    },
  })

  // Watch form values for progress calculation
  const watchAllFields = watch()

  // Calculate progress percentage
  const calculateProgress = () => {
    const totalFields = Object.keys(formSchema.shape).length
    const filledFields = Object.entries(watchAllFields).filter(([_, value]) => value !== "").length
    return Math.round((filledFields / totalFields) * 100)
  }

  // Handle next step
  const handleNextStep = async () => {
    // Validate only the fields in the current step
    const fieldsToValidate = step === 1 ? ["issue", "zipCode"] : ["name", "phone", "email"]
    const isStepValid = await trigger(fieldsToValidate as any)

    if (isStepValid) {
      setStep(2)
    }
  }

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Push to Google Tag Manager dataLayer
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "formSubmission",
          formName: "leadCapture",
          formData: {
            issue: data.issue,
            zipCode: data.zipCode,
          },
        })
      }

      // Submit to API
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.ok) {
        // Redirect to thank you page
        router.push("/thank-you")
      } else {
        throw new Error(result.error || "Something went wrong")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // List of common garage door issues
  const issueOptions = [
    { value: "", label: "Select your issue" },
    { value: "door-wont-open", label: "Door won't open" },
    { value: "door-wont-close", label: "Door won't close" },
    { value: "broken-spring", label: "Broken spring" },
    { value: "noisy-operation", label: "Noisy operation" },
    { value: "opener-issues", label: "Opener issues" },
    { value: "off-track", label: "Door off track" },
    { value: "new-installation", label: "New installation" },
    { value: "other", label: "Other issue" },
  ]

  return (
    <section id="lead-form" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary-600 mb-2">Get Your Free Quote</h2>
            <p className="text-gray-600">Tell us about your garage door needs and we'll get back to you quickly</p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-500"
                initial={{ width: "0%" }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Step {step} of 2</span>
              <span>{calculateProgress()}% Complete</span>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">
                        What issue are you experiencing? <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="issue"
                        {...register("issue")}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                          errors.issue ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        {issueOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.issue && <p className="mt-1 text-sm text-red-500">{errors.issue.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Your ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        {...register("zipCode")}
                        placeholder="e.g. 32801"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                          errors.zipCode ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode.message}</p>}
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        placeholder="Full Name"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register("phone")}
                        placeholder="(321) 123-4567"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-2 border rounded-md focus:ring-primary-500 focus:border-primary-500 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="sm:w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-md transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className="sm:w-2/3 bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Submitting...
                          </span>
                        ) : (
                          <span>Get My Free Quote</span>
                        )}
                      </button>
                    </div>

                    {submitError && (
                      <div className="p-4 bg-red-50 text-red-800 rounded-md">
                        <p>{submitError}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              <p>
                By submitting this form, you agree to our{" "}
                <a href="/privacy-policy" className="text-primary-600 hover:underline">
                  privacy policy
                </a>
                . We'll never share your information with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
