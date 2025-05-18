"use server"

import { Resend } from "resend"
import { generateBusinessEmailHtml, generateCustomerEmailHtml } from "./email-templates"
import { verifyRecaptcha } from "./recaptcha"

export async function sendContactForm(formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY
  const businessEmail = process.env.BUSINESS_EMAIL || "support@garagedoorspringsrepairfl.com"
  const isDevelopment = process.env.NODE_ENV === "development"

  if (!apiKey && !isDevelopment) {
    throw new Error("RESEND_API_KEY must be defined in environment variables")
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const service = formData.get("service") as string
  const message = (formData.get("message") as string) || "No additional message provided"
  const recaptchaToken = formData.get("recaptchaToken") as string | null

  if (!name || !email || !phone || !service) {
    throw new Error("Missing required fields")
  }

  // Verify reCAPTCHA token (skip in development if no token is provided)
  if (!isDevelopment || recaptchaToken) {
    const recaptchaResult = await verifyRecaptcha(recaptchaToken)

    // If verification failed, return an error
    if (!recaptchaResult.success) {
      console.error("reCAPTCHA verification failed:", recaptchaResult.error)
      throw new Error("Spam protection verification failed. Please try again.")
    }

    // If the score is too low, it might be a bot
    if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.5) {
      console.warn("Suspicious submission detected with reCAPTCHA score:", recaptchaResult.score)
      throw new Error("Your submission was flagged as potentially automated. Please try again.")
    }
  }

  // In development mode without API key, just log the data
  if (isDevelopment && !apiKey) {
    console.log("Development mode - Contact form submission:", {
      name,
      email,
      phone,
      service,
      message,
    })
    return { success: true }
  }

  try {
    // Initialize Resend
    const resend = new Resend(apiKey)

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
