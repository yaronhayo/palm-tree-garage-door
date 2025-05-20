import { type NextRequest, NextResponse } from "next/server"
import { verifyRecaptcha } from "@/lib/recaptcha"

export async function POST(request: NextRequest) {
  try {
    const { token, action } = await request.json()

    if (!token) {
      return NextResponse.json({ success: false, error: "Token is required" }, { status: 400 })
    }

    const result = await verifyRecaptcha(token, action)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error)
    return NextResponse.json({ success: false, error: "Failed to verify reCAPTCHA" }, { status: 500 })
  }
}
