import { NextResponse } from "next/server"

/**
 * API route to provide the reCAPTCHA site key to the client
 *
 * This approach keeps the site key out of client-side code
 * while still making it available to the reCAPTCHA script.
 */
export async function GET() {
  // Only use the server-side environment variable
  const siteKey = process.env.RECAPTCHA_SITE_KEY

  if (!siteKey) {
    console.warn("reCAPTCHA site key not found in environment variables")
    // Return a 200 response with a null site key instead of an error
    // This prevents the error message from showing in the form
    return NextResponse.json({ siteKey: null })
  }

  return NextResponse.json({ siteKey })
}
