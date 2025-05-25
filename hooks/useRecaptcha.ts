"use client"

import { useState, useEffect } from "react"

// Google's test reCAPTCHA key - safe to use for development/testing
const TEST_RECAPTCHA_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

export function useRecaptcha() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isScriptLoading, setIsScriptLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only load the script once
    if (isScriptLoaded || isScriptLoading) return

    const loadScript = () => {
      try {
        setIsScriptLoading(true)
        console.log("Loading reCAPTCHA script...")

        // Check if script is already in the document
        const existingScript = document.querySelector('script[src*="recaptcha"]')
        if (existingScript) {
          console.log("reCAPTCHA script already exists in the document")
          setIsScriptLoaded(true)
          setIsScriptLoading(false)
          return
        }

        // Create and append the script
        const script = document.createElement("script")
        script.src = `https://www.google.com/recaptcha/api.js?render=${TEST_RECAPTCHA_KEY}`
        script.async = true
        script.defer = true

        script.onload = () => {
          console.log("reCAPTCHA script loaded successfully")
          setIsScriptLoaded(true)
          setIsScriptLoading(false)
        }

        script.onerror = (e) => {
          console.error("Error loading reCAPTCHA script:", e)
          setError("Failed to load security verification")
          setIsScriptLoading(false)
        }

        document.head.appendChild(script)
      } catch (err) {
        console.error("Error setting up reCAPTCHA:", err)
        setError("Error setting up security verification")
        setIsScriptLoading(false)
      }
    }

    loadScript()

    // Cleanup function
    return () => {
      // We don't remove the script on unmount as it might be needed by other components
    }
  }, [isScriptLoaded, isScriptLoading])

  // Function to execute reCAPTCHA
  const executeRecaptcha = async (action: string): Promise<string | null> => {
    // If script failed to load, return null but don't block form submission
    if (error || !isScriptLoaded) {
      console.warn("reCAPTCHA not available, continuing without verification")
      return null
    }

    try {
      // Wait for grecaptcha to be defined
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        console.warn("grecaptcha not available yet, continuing without verification")
        return null
      }

      const token = await window.grecaptcha.execute(TEST_RECAPTCHA_KEY, { action })
      return token
    } catch (err) {
      console.error("Error executing reCAPTCHA:", err)
      // Return null but don't block form submission
      return null
    }
  }

  return {
    isLoading: isScriptLoading,
    error,
    executeRecaptcha,
  }
}
