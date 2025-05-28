import { type NextRequest, NextResponse } from "next/server"
import { sendFormSubmissionEmails } from "@/lib/email"
import { verifyRecaptcha } from "@/lib/recaptcha"
import { getUserInfo } from "@/lib/user-info"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { formData, recaptchaToken, userInfo: clientUserInfo } = body

    // Validate required fields
    if (!formData || !formData.name || !formData.email || !formData.phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Get server-side user information
    const serverUserInfo = await getUserInfo(request)

    // Combine client and server user info
    const combinedUserInfo = {
      ...serverUserInfo,
      ...clientUserInfo,
    }

    // Verify reCAPTCHA if token is provided
    let recaptchaResult = null
    if (recaptchaToken) {
      try {
        recaptchaResult = await verifyRecaptcha(recaptchaToken)
      } catch (error) {
        console.error("reCAPTCHA verification failed:", error)
        // Continue without verification
      }
    }

    // Send emails
    const emailResult = await sendFormSubmissionEmails(formData, combinedUserInfo, recaptchaResult)

    if (!emailResult.success) {
      console.error("Failed to send emails:", emailResult.error)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send emails. Please try again later.",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    })
  } catch (error) {
    console.error("Error in form submission:", error)
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 },
    )
  }
}
