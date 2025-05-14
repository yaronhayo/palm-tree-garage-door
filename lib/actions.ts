"use server"

import { Resend } from "resend"
import { generateBusinessEmailHtml, generateCustomerEmailHtml } from "./email-templates"

export async function sendContactForm(formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY
  const businessEmail = process.env.BUSINESS_EMAIL || "support@garagedoorspringsrepairfl.com"

  if (!apiKey) {
    throw new Error("RESEND_API_KEY must be defined in environment variables")
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const service = formData.get("service") as string
  const message = (formData.get("message") as string) || "No additional message provided"

  if (!name || !email || !phone || !service) {
    throw new Error("Missing required fields")
  }

  // Initialize Resend
  const resend = new Resend(apiKey)

  try {
    // Generate email HTML strings - now with await
    const businessEmailHtml = await generateBusinessEmailHtml(name, email, phone, service, message)
    const customerEmailHtml = await generateCustomerEmailHtml(name, service)

    // Send email to business
    const { data, error } = await resend.emails.send({
      from: "Palm Tree Garage Door <onboarding@resend.dev>",
      to: businessEmail,
      subject: `New Contact Form Submission - ${service}`,
      reply_to: email,
      html: businessEmailHtml,
    })

    if (error) {
      console.error("Resend API Error:", error)
      throw new Error(`Failed to send email: ${error.message}`)
    }

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Palm Tree Garage Door <onboarding@resend.dev>",
      to: email,
      subject: "Thank you for contacting Palm Tree Garage Door",
      html: customerEmailHtml,
    })

    return { success: true }
  } catch (error: any) {
    console.error("Error sending email:", error)
    throw new Error(`Failed to send email: ${error.message}`)
  }
}
