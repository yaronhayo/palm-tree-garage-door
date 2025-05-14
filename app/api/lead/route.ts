import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Business email from environment variables
const businessEmail = process.env.BUSINESS_EMAIL

export async function POST(request: NextRequest) {
  // Check if environment variables are set
  if (!process.env.RESEND_API_KEY || !businessEmail) {
    console.error("Missing required environment variables: RESEND_API_KEY or BUSINESS_EMAIL")
    return NextResponse.json(
      { ok: false, error: "Server configuration error. Please try again later." },
      { status: 500 },
    )
  }

  try {
    // Parse the request body
    const data = await request.json()
    const { issue, zipCode, name, phone, email } = data

    // Validate required fields
    if (!issue || !zipCode || !name || !phone || !email) {
      return NextResponse.json({ ok: false, error: "All fields are required" }, { status: 400 })
    }

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
      from: `Lead Form <no-reply@palmtreegaragedoor.com>`,
      to: businessEmail,
      subject: "New Lead from Website",
      html: businessEmailHtml,
      reply_to: email,
    })

    // Send confirmation email to customer
    const customerEmailResult = await resend.emails.send({
      from: `Palm Tree Garage Door <no-reply@palmtreegaragedoor.com>`,
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
