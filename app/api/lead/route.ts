import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { handleApiError, validationError } from "@/lib/api-error-handler"
import { verifyRecaptchaToken } from "@/lib/recaptcha"

// Define validation schema
const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  issue: z.string().min(1, "Please select an issue"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  recaptchaToken: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate request data
    const result = leadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        validationError(
          result.error.errors.reduce(
            (acc, err) => {
              const path = err.path.join(".")
              acc[path] = err.message
              return acc
            },
            {} as Record<string, string>,
          ),
        ),
        { status: 400 },
      )
    }

    const { recaptchaToken, ...leadData } = result.data

    // Verify reCAPTCHA token in production
    if (process.env.NODE_ENV === "production") {
      if (!recaptchaToken) {
        return NextResponse.json(validationError({ recaptchaToken: "reCAPTCHA verification failed" }), { status: 400 })
      }

      const recaptchaValid = await verifyRecaptchaToken(recaptchaToken, "lead_form_submit")

      if (!recaptchaValid.success) {
        return NextResponse.json(validationError({ recaptchaToken: "reCAPTCHA verification failed" }), { status: 400 })
      }
    }

    // Process the lead data
    // This would typically involve saving to a database and/or sending emails

    // Return success response
    return NextResponse.json({
      ok: true,
      message:
        process.env.NODE_ENV === "development"
          ? "Development mode: Lead submitted successfully"
          : "Lead submitted successfully",
    })
  } catch (error) {
    return handleApiError(error)
  }
}
