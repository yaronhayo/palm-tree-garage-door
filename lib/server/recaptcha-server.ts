/**
 * Server-side reCAPTCHA verification
 * This file should only be imported in server components or server actions
 */

// Verify a reCAPTCHA token server-side
export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  try {
    if (!token) {
      console.error("No reCAPTCHA token provided")
      return false
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret) {
      console.error("reCAPTCHA secret key not configured")
      return false
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secret}&response=${token}`,
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error("reCAPTCHA verification error:", error)
    return false
  }
}

// Generate a reCAPTCHA site key for server components
export function getRecaptchaSiteKey(): string {
  return process.env.RECAPTCHA_SITE_KEY || ""
}
