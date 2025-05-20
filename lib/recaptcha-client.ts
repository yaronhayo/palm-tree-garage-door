/**
 * Client-side reCAPTCHA utilities
 */

/**
 * Get a reCAPTCHA site key from the server
 */
export async function getReCaptchaSiteKey(): Promise<string> {
  try {
    const response = await fetch("/api/recaptcha-site-key")
    const data = await response.json()

    if (!data.siteKey) {
      throw new Error("Failed to get reCAPTCHA site key")
    }

    return data.siteKey
  } catch (error) {
    console.error("Error getting reCAPTCHA site key:", error)
    throw error
  }
}

/**
 * Load the reCAPTCHA script with a site key from the server
 */
export async function loadReCaptchaScript(): Promise<void> {
  if (typeof window === "undefined") {
    throw new Error("Cannot load reCAPTCHA in server environment")
  }

  // Check if already loaded
  if (window.grecaptcha) {
    return
  }

  try {
    // Get site key from server
    const siteKey = await getReCaptchaSiteKey()

    return new Promise((resolve, reject) => {
      // Create script element
      const script = document.createElement("script")
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true

      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"))

      document.head.appendChild(script)
    })
  } catch (error) {
    console.error("Error loading reCAPTCHA script:", error)
    throw error
  }
}

/**
 * Execute reCAPTCHA and get a token
 */
export async function executeReCaptcha(action: string): Promise<string> {
  if (typeof window === "undefined" || !window.grecaptcha) {
    throw new Error("reCAPTCHA not loaded")
  }

  try {
    // Get site key from server
    const siteKey = await getReCaptchaSiteKey()

    return await window.grecaptcha.execute(siteKey, { action })
  } catch (error) {
    console.error("Error executing reCAPTCHA:", error)
    throw error
  }
}

/**
 * Verify a reCAPTCHA token on the server
 */
export async function verifyReCaptchaToken(token: string, action?: string): Promise<boolean> {
  try {
    const response = await fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, action }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error("Error verifying reCAPTCHA token:", error)
    return false
  }
}
