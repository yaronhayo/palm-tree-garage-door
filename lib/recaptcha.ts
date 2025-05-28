/**
 * reCAPTCHA utilities
 *
 * This implementation fetches the site key from a server endpoint
 * instead of using the environment variable directly in client code.
 */

// Check if we're in the browser
const isBrowser = typeof window !== "undefined"

// Store the site key once fetched
let cachedSiteKey: string | undefined

/**
 * Validate a reCAPTCHA token server-side
 */
export async function validateRecaptcha(token: string): Promise<boolean> {
  if (!token) return false

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey) {
      console.error("reCAPTCHA secret key not found in environment variables")
      return false
    }

    // Skip validation in development if using test key
    if (process.env.NODE_ENV === "development" && secretKey === "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe") {
      console.warn("Using test reCAPTCHA key - validation bypassed in development")
      return true
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()

    // Verify the response
    if (data.success && data.score >= 0.5) {
      return true
    }

    console.warn("reCAPTCHA validation failed:", data)
    return false
  } catch (error) {
    console.error("Error validating reCAPTCHA:", error)
    return false
  }
}

/**
 * Get the reCAPTCHA site key (server-side only)
 */
export function getRecaptchaSiteKey(): string | undefined {
  // Only use this on the server
  if (typeof window === "undefined") {
    return process.env.RECAPTCHA_SITE_KEY
  }
  return undefined
}

/**
 * Fetch the site key from the API
 */
export async function fetchSiteKey(): Promise<string> {
  if (cachedSiteKey) {
    return cachedSiteKey
  }

  try {
    const response = await fetch("/api/recaptcha")

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.siteKey) {
      cachedSiteKey = data.siteKey
      return data.siteKey
    }

    throw new Error("No site key received from API")
  } catch (error) {
    console.error("Error fetching reCAPTCHA site key:", error)
    throw error
  }
}

/**
 * Load the reCAPTCHA script
 */
export async function loadRecaptchaScript(): Promise<void> {
  if (!isBrowser) {
    return Promise.reject(new Error("Cannot load reCAPTCHA in server environment"))
  }

  // Check if already loaded
  if (window.grecaptcha && window.grecaptcha.ready) {
    return Promise.resolve()
  }

  try {
    // Fetch the site key from API
    const siteKey = await fetchSiteKey()

    if (!siteKey) {
      return Promise.reject(new Error("reCAPTCHA site key not found"))
    }

    return new Promise((resolve, reject) => {
      // Create script element
      const script = document.createElement("script")
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.defer = true

      script.onload = () => {
        // Give reCAPTCHA time to initialize
        setTimeout(() => {
          if (window.grecaptcha && window.grecaptcha.ready) {
            window.grecaptcha.ready(() => {
              resolve()
            })
          } else {
            resolve() // Still resolve even if ready method isn't available
          }
        }, 500)
      }

      script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"))

      document.head.appendChild(script)
    })
  } catch (error) {
    console.error("Failed to load reCAPTCHA:", error)
    return Promise.reject(error)
  }
}

/**
 * Execute reCAPTCHA and get a token
 */
export async function executeRecaptcha(action: string): Promise<string> {
  if (!isBrowser) {
    throw new Error("reCAPTCHA not available in server environment")
  }

  try {
    if (!window.grecaptcha || !window.grecaptcha.execute) {
      await loadRecaptchaScript()

      // Additional check after loading
      if (!window.grecaptcha || !window.grecaptcha.execute) {
        console.warn("reCAPTCHA failed to initialize properly")
        return ""
      }
    }

    // Fetch the site key from API
    const siteKey = await fetchSiteKey()

    if (!siteKey) {
      throw new Error("reCAPTCHA site key not found")
    }

    // Add a timeout to prevent hanging
    const timeoutPromise = new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error("reCAPTCHA execution timed out")), 5000)
    })

    // Make sure grecaptcha is ready
    await new Promise<void>((resolve) => {
      if (window.grecaptcha.ready) {
        window.grecaptcha.ready(() => resolve())
      } else {
        resolve() // Continue if ready method isn't available
      }
    })

    const recaptchaPromise = window.grecaptcha.execute(siteKey, { action })

    return Promise.race([recaptchaPromise, timeoutPromise])
  } catch (error) {
    console.error("Error executing reCAPTCHA:", error)
    // Return empty string instead of throwing to prevent form submission failures
    // when reCAPTCHA has issues
    return ""
  }
}

/**
 * Alias for validateRecaptcha for backward compatibility
 */
export const verifyRecaptcha = validateRecaptcha
