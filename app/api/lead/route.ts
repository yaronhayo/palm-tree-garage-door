import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  // Check if environment variables are set
  const apiKey = process.env.RESEND_API_KEY
  const businessEmail = process.env.BUSINESS_EMAIL || "support@garagedoorspringsrepairfl.com"
  const isDevelopment = process.env.NODE_ENV === "development"

  try {
    // Parse the request body
    const data = await request.json()
    const { issue, zipCode, name, phone, email } = data

    // Validate required fields
    if (!issue || !zipCode || !name || !phone || !email) {
      return NextResponse.json({ ok: false, error: "All fields are required" }, { status: 400 })
    }

    // If we're in development and don't have an API key, log the data and return success
    if (isDevelopment && !apiKey) {
      console.log("Development mode - Email would be sent with the following data:")
      console.log({
        to: businessEmail,
        from: "Lead Form <onboarding@resend.dev>",
        subject: "New Lead from Website",
        name,
        email,
        phone,
        issue,
        zipCode,
      })

      // Return success in development mode
      return NextResponse.json({
        ok: true,
        message: "Development mode - Email sending simulated",
      })
    }

    // In production, we need the API key
    if (!apiKey) {
      console.error("Missing required environment variable: RESEND_API_KEY")
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email service not configured. Your submission has been logged, but email notifications are not available.",
        },
        { status: 500 },
      )
    }

    // Initialize Resend with API key
    const resend = new Resend(apiKey)

    // Format the data for the business email
    const businessEmailHtml = `
      <h1>New Lead from Website</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Issue:</strong> ${issue}</p>
      <p><strong>ZIP Code:</strong> ${zipCode}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `

    // Format the data for the customer confirmation email
    const customerEmailText = `
      Dear ${name},

      Thank you for contacting Palm Tree Garage Door Repair! 🚀

      We've received your request regarding: ${issue}

      One of our garage door specialists will contact you shortly to discuss your needs and provide a free quote.

      Your request details:
      - Issue: ${issue}
      - ZIP Code: ${zipCode}
      - Phone: ${phone}

      If you need immediate assistance, please call us at (321) 366-9723.

      Thank you for choosing Palm Tree Garage Door Repair!

      Best regards,
      The Palm Tree Garage Door Team
      (321) 366-9723
      https://palmtreegaragedoor.com
    `

    // Send email to business
    const businessEmailResult = await resend.emails.send({
      from: `Lead Form <onboarding@resend.dev>`,
      to: businessEmail,
      subject: "New Lead from Website",
      html: businessEmailHtml,
      reply_to: email,
    })

    // Send confirmation email to customer
    const customerEmailResult = await resend.emails.send({
      from: `Palm Tree Garage Door <onboarding@resend.dev>`,
      to: email,
      subject: "We got your request 🚀",
      text: customerEmailText,
    })

    // Check if both emails were sent successfully
    if (businessEmailResult.error || customerEmailResult.error) {
      console.error("Email sending error:", businessEmailResult.error || customerEmailResult.error)
      return NextResponse.json({ ok: false, error: "Failed to send emails. Please try again." }, { status: 500 })
    }

    // Return success response
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Lead submission error:", error)
    return NextResponse.json({ ok: false, error: "An unexpected error occurred. Please try again." }, { status: 500 })
  }
}
