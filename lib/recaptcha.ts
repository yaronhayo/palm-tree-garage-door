/**
 * reCAPTCHA utilities
 */

/**
 * Verify a reCAPTCHA token
 */
export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    const response = await fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error("Error verifying reCAPTCHA token:", error)
    return false
  }
}

/**
 * Load the reCAPTCHA script
 */
export function loadRecaptchaScript(siteKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot load reCAPTCHA in server environment"))
      return
    }

    // Check if already loaded
    if (window.grecaptcha) {
      resolve()
      return
    }

    // Create script element
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true

    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"))

    document.head.appendChild(script)
  })
}

/**
 * Execute reCAPTCHA and get a token
 */
export async function executeRecaptcha(action: string): Promise<string> {
  if (typeof window === "undefined" || !window.grecaptcha) {
    throw new Error("reCAPTCHA not loaded")
  }

  try {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) {
      throw new Error("reCAPTCHA site key not found")
    }

    return await window.grecaptcha.execute(siteKey, { action })
  } catch (error) {
    console.error("Error executing reCAPTCHA:", error)
    throw error
  }
}
