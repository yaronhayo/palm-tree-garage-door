import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 400 })
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!secretKey) {
      console.error("RECAPTCHA_SECRET_KEY is not defined")
      return NextResponse.json({ success: false, error: "reCAPTCHA not configured" }, { status: 500 })
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

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error verifying reCAPTCHA token:", error)
    return NextResponse.json({ success: false, error: "Error verifying reCAPTCHA token" }, { status: 500 })
  }
}
