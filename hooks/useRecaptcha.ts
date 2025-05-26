"use client"

import { useState, useEffect } from "react"

// Google's test reCAPTCHA key - safe to use for development/testing
const TEST_RECAPTCHA_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

export function useRecaptcha() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isScriptLoading, setIsScriptLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [siteKey, setSiteKey] = useState<string | null>(null)

  // Fetch the site key from the API
  useEffect(() => {
    async function fetchSiteKey() {
      try {
        const response = await fetch("/api/recaptcha")
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        if (data.siteKey) {
          setSiteKey(data.siteKey)
          return data.siteKey
        }

        throw new Error("No site key received from API")
      } catch (err) {
        console.error("Error fetching reCAPTCHA site key:", err)
        setError("Failed to fetch reCAPTCHA key")
        // Use test key as fallback in development
        if (process.env.NODE_ENV === "development") {
          console.warn("Using test reCAPTCHA key as fallback")
          setSiteKey(TEST_RECAPTCHA_KEY)
          return TEST_RECAPTCHA_KEY
        }
        return null
      }
    }

    fetchSiteKey()
  }, [])

  useEffect(() => {
    // Only load the script once we have the site key
    if (!siteKey || isScriptLoaded || isScriptLoading) return

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
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
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
  }, [isScriptLoaded, isScriptLoading, siteKey])

  // Function to execute reCAPTCHA
  const executeRecaptcha = async (action: string): Promise<string | null> => {
    // If we don't have a site key or script failed to load, return null but don't block form submission
    if (error || !isScriptLoaded || !siteKey) {
      console.warn("reCAPTCHA not available, continuing without verification")
      return null
    }

    try {
      // Wait for grecaptcha to be defined
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        console.warn("grecaptcha not available yet, continuing without verification")
        return null
      }

      const token = await window.grecaptcha.execute(siteKey, { action })
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
