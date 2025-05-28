"use client"

import { useState, useEffect, useRef } from "react"

// Google's test reCAPTCHA key - safe to use for development/testing
const TEST_RECAPTCHA_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

export function useRecaptcha() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isScriptLoading, setIsScriptLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [siteKey, setSiteKey] = useState<string | null>(null)
  const scriptLoadAttempts = useRef(0)
  const maxLoadAttempts = 3

  // Fetch the site key from the API
  useEffect(() => {
    async function fetchSiteKey() {
      try {
        // Check if we already have a site key in localStorage (for faster loading)
        const cachedKey = typeof window !== "undefined" ? localStorage.getItem("recaptcha_site_key") : null
        if (cachedKey) {
          console.log("Using cached reCAPTCHA site key")
          setSiteKey(cachedKey)
          return cachedKey
        }

        const response = await fetch("/api/recaptcha")
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        if (data.siteKey) {
          setSiteKey(data.siteKey)
          // Cache the site key for future use
          if (typeof window !== "undefined") {
            localStorage.setItem("recaptcha_site_key", data.siteKey)
          }
          return data.siteKey
        }

        throw new Error("No site key received from API")
      } catch (err) {
        console.warn("Error fetching reCAPTCHA site key:", err)

        // Don't set error state here - we'll handle it silently
        // This prevents the error message from showing immediately

        // Use test key as fallback in development
        if (process.env.NODE_ENV === "development") {
          console.warn("Using test reCAPTCHA key as fallback")
          setSiteKey(TEST_RECAPTCHA_KEY)
          return TEST_RECAPTCHA_KEY
        }

        // For production, try to use a cached key if available
        const cachedKey = typeof window !== "undefined" ? localStorage.getItem("recaptcha_site_key") : null
        if (cachedKey) {
          console.log("Using cached reCAPTCHA site key after API error")
          setSiteKey(cachedKey)
          return cachedKey
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

        // Check if grecaptcha is already defined globally
        if (window.grecaptcha) {
          console.log("grecaptcha already defined globally")
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
          scriptLoadAttempts.current = 0 // Reset attempts on success
        }

        script.onerror = (e) => {
          console.warn("Error loading reCAPTCHA script:", e)

          // Increment attempt counter
          scriptLoadAttempts.current += 1

          if (scriptLoadAttempts.current < maxLoadAttempts) {
            console.log(`Retrying reCAPTCHA script load (attempt ${scriptLoadAttempts.current + 1}/${maxLoadAttempts})`)
            setIsScriptLoading(false)

            // Retry after a delay with exponential backoff
            setTimeout(() => {
              loadScript()
            }, 1000 * Math.pow(2, scriptLoadAttempts.current))
          } else {
            // Only set error after all attempts fail
            setError("Failed to load security verification")
            setIsScriptLoading(false)
          }
        }

        document.head.appendChild(script)
      } catch (err) {
        console.warn("Error setting up reCAPTCHA:", err)
        // Only set error after all attempts
        if (scriptLoadAttempts.current >= maxLoadAttempts) {
          setError("Error setting up security verification")
        }
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
    // If we don't have a site key, return null but don't block form submission
    if (!siteKey) {
      console.warn("No reCAPTCHA site key available, continuing without verification")
      return null
    }

    // If script failed to load after multiple attempts, return null but don't block form submission
    if (scriptLoadAttempts.current >= maxLoadAttempts) {
      console.warn("reCAPTCHA script failed to load after multiple attempts, continuing without verification")
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
      console.warn("Error executing reCAPTCHA:", err)
      // Return null but don't block form submission
      return null
    }
  }

  // Only return error if we've exhausted all retry attempts
  const shouldShowError = error && scriptLoadAttempts.current >= maxLoadAttempts

  return {
    isLoading: isScriptLoading,
    error: shouldShowError ? error : null,
    executeRecaptcha,
  }
}
