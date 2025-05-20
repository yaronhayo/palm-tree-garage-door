import { NextResponse } from "next/server"

export async function GET() {
  // Get the site key from environment variables
  const siteKey = process.env.RECAPTCHA_SITE_KEY

  if (!siteKey) {
    return NextResponse.json({ error: "reCAPTCHA site key not configured" }, { status: 500 })
  }

  // Return the site key
  return NextResponse.json({ siteKey })
}
