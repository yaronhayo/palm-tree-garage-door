import { NextResponse } from "next/server"

// Google's test reCAPTCHA key - safe to use for development/testing
const TEST_RECAPTCHA_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

export async function GET() {
  return NextResponse.json({ siteKey: TEST_RECAPTCHA_KEY })
}
