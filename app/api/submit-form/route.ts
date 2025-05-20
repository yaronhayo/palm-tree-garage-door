import { type NextRequest, NextResponse } from "next/server"
import { sendFormSubmissionEmails, type FormData } from "@/lib/email"
import { validateRecaptcha } from "@/lib/recaptcha"
import { getUserInfo } from "@/lib/user-info"
import { getCurrentEasternTime, formatEasternTime } from "@/lib/date-utils"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()
    const { formData, recaptchaToken, userInfo: clientUserInfo } = body

    // Validate required fields
    if (!formData || !formData.name || !formData.email || !formData.phone) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Get server-side user info
    const serverUserInfo = await getUserInfo(request)

    // Combine server and client user info
    const userInfo = {
      ...serverUserInfo,
      ...clientUserInfo,
      // Add Eastern Time submission timestamp
      submissionTimeEastern: formatEasternTime(getCurrentEasternTime()),
    }

    // Validate reCAPTCHA token if provided
    let recaptchaResult = undefined
    if (recaptchaToken) {
      const recaptchaValid = await validateRecaptcha(recaptchaToken)
      recaptchaResult = {
        verified: recaptchaValid,
        score: recaptchaValid ? 0.9 : 0, // Placeholder score, actual score would come from reCAPTCHA API
      }
    }

    // Add Eastern Time to form data
    const formDataWithEasternTime = {
      ...formData,
      submissionTimeEastern: formatEasternTime(getCurrentEasternTime()),
    }

    // Send emails
    const emailResult = await sendFormSubmissionEmails(formDataWithEasternTime as FormData, userInfo, recaptchaResult)

    if (!emailResult.success) {
      console.error("Error sending emails:", emailResult)
      return NextResponse.json({ success: false, message: "Error sending emails" }, { status: 500 })
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    })
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
