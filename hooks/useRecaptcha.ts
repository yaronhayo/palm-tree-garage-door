"use client"

import { useState, useEffect, useCallback } from "react"
import { getRecaptchaKey, verifyToken } from "@/lib/actions/recaptcha-actions"

interface UseRecaptchaReturn {
  executeRecaptcha: ((action: string) => Promise<string>) | null
  verifyRecaptcha: ((token: string) => Promise<boolean>) | null
  isLoaded: boolean
  error: string | null
}

export function useRecaptcha(): UseRecaptchaReturn {
  const [isLoaded, setIsLoaded] = useState(false)
  const [siteKey, setSiteKey] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load the reCAPTCHA script
    const loadRecaptcha = async () => {
      try {
        // Get the site key from the server
        const key = await getRecaptchaKey()
        setSiteKey(key)

        if (!key) {
          setError("reCAPTCHA site key not available")
          return
        }

        // Check if script is already loaded
        if (window.grecaptcha) {
          setIsLoaded(true)
          return
        }

        // Load the script
        const script = document.createElement("script")
        script.src = `https://www.google.com/recaptcha/api.js?render=${key}`
        script.async = true
        script.defer = true

        script.onload = () => {
          setIsLoaded(true)
        }

        script.onerror = () => {
          setError("Failed to load reCAPTCHA")
        }

        document.head.appendChild(script)

        return () => {
          document.head.removeChild(script)
        }
      } catch (err) {
        setError("Error initializing reCAPTCHA")
        console.error("reCAPTCHA initialization error:", err)
      }
    }

    loadRecaptcha()
  }, [])

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      if (!isLoaded || !siteKey) {
        throw new Error("reCAPTCHA not loaded")
      }

      try {
        return await new Promise((resolve, reject) => {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(siteKey, { action })
              resolve(token)
            } catch (err) {
              reject(err)
            }
          })
        })
      } catch (err) {
        console.error("reCAPTCHA execution error:", err)
        throw new Error("Failed to execute reCAPTCHA")
      }
    },
    [isLoaded, siteKey],
  )

  const verifyRecaptcha = useCallback(async (token: string): Promise<boolean> => {
    try {
      return await verifyToken(token)
    } catch (err) {
      console.error("reCAPTCHA verification error:", err)
      return false
    }
  }, [])

  return {
    executeRecaptcha: isLoaded ? executeRecaptcha : null,
    verifyRecaptcha: isLoaded ? verifyRecaptcha : null,
    isLoaded,
    error,
  }
}

// Add type definition for window.grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}
