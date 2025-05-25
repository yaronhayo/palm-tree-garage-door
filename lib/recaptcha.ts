/**
 * reCAPTCHA utilities
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
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
}

/**
 * Fetch and cache the site key from the API
 */
async function fetchSiteKey(): Promise<string> {
  if (cachedSiteKey) {
    return cachedSiteKey
  }

  try {
    const response = await fetch("/api/recaptcha")
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
  if (window.grecaptcha) {
    return Promise.resolve()
  }

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

    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA script"))

    document.head.appendChild(script)
  })
}

/**
 * Execute reCAPTCHA and get a token
 */
export async function executeRecaptcha(action: string): Promise<string> {
  if (!isBrowser) {
    throw new Error("reCAPTCHA not available in server environment")
  }

  if (!window.grecaptcha) {
    await loadRecaptchaScript()
  }

  try {
    // Fetch the site key from API if not cached
    const siteKey = await fetchSiteKey()

    if (!siteKey) {
      throw new Error("reCAPTCHA site key not found")
    }

    return await window.grecaptcha.execute(siteKey, { action })
  } catch (error) {
    console.error("Error executing reCAPTCHA:", error)
    throw error
  }
}
