"use client"

import { useState, useEffect, useCallback } from "react"
import { getRecaptchaToken } from "@/lib/actions/recaptcha-actions"

interface UseRecaptchaReturn {
  executeRecaptcha: ((action: string) => Promise<string>) | null
  recaptchaLoaded: boolean
  recaptchaError: string | null
}

export function useRecaptcha(): UseRecaptchaReturn {
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null)

  // In development mode, we'll simulate reCAPTCHA being loaded
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setRecaptchaLoaded(true)
      return
    }

    // In production, we would check if the reCAPTCHA script is loaded
    // This is a simplified version since we're moving to server-side verification
    setRecaptchaLoaded(true)

    return () => {
      // Cleanup if needed
    }
  }, [])

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      if (!recaptchaLoaded) {
        throw new Error("reCAPTCHA not loaded")
      }

      try {
        // Use our server action to get a token
        const token = await getRecaptchaToken(action)
        return token
      } catch (error) {
        console.error("reCAPTCHA execution error:", error)
        throw error
      }
    },
    [recaptchaLoaded],
  )

  return {
    executeRecaptcha: recaptchaLoaded ? executeRecaptcha : null,
    recaptchaLoaded,
    recaptchaError,
  }
}
