/**
 * reCAPTCHA utilities
 * Server-side implementation to protect sensitive keys
 */

/**
 * Verify a reCAPTCHA token on the server
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
 * Validate reCAPTCHA token
 */
export async function validateRecaptcha(
  token: string | null | undefined,
  action?: string,
): Promise<{
  success: boolean
  score?: number
  error?: string
}> {
  // Skip verification in development mode if no token is provided
  if (process.env.NODE_ENV === "development" && !token) {
    console.log("Development mode: Skipping reCAPTCHA verification")
    return { success: true, score: 1.0, action: action || "default" }
  }

  // If no token is provided in production, return failure
  if (!token) {
    return { success: false, error: "No reCAPTCHA token provided" }
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    // If no secret key is available, log warning and return success in development
    if (!secretKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn("RECAPTCHA_SECRET_KEY is not defined. Skipping verification in development.")
        return { success: true, score: 1.0, action: action || "default" }
      } else {
        return { success: false, error: "reCAPTCHA configuration error" }
      }
    }

    // Verify the token with Google reCAPTCHA API
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    })

    const data = await response.json()

    // Check if verification was successful
    if (data.success) {
      // If action was specified, verify it matches
      if (action && data.action && data.action !== action) {
        return {
          success: false,
          score: data.score,
          action: data.action,
          error: "Action verification failed",
        }
      }

      return {
        success: true,
        score: data.score,
        action: data.action,
      }
    } else {
      return {
        success: false,
        error: data["error-codes"] ? data["error-codes"].join(", ") : "reCAPTCHA verification failed",
      }
    }
  } catch (error) {
    console.error("Error verifying reCAPTCHA token:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error during reCAPTCHA verification",
    }
  }
}
