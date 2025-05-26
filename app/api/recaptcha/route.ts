import { NextResponse } from "next/server"

/**
 * API route to provide the reCAPTCHA site key to the client
 *
 * This approach keeps the site key out of client-side code
 * while still making it available to the reCAPTCHA script.
 */
export async function GET() {
  // Use the environment variable
  const siteKey = process.env.RECAPTCHA_SITE_KEY

  if (!siteKey) {
    console.error("reCAPTCHA site key not found in environment variables")
    return NextResponse.json({ error: "Configuration error" }, { status: 500 })
  }

  return NextResponse.json({ siteKey })
}
