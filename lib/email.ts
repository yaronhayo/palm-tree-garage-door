/**
 * Email utilities
 */
import { Resend } from "resend"
import LeadNotificationEmail from "@/components/emails/LeadNotificationEmail"
import ClientAutoresponderEmail from "@/components/emails/ClientAutoresponderEmail"
import { formatDateTimeET } from "./date-utils"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Business email from environment variable
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "info@palmtreegaragedoor.com"

/**
 * Send a lead notification email to the business
 */
export async function sendLeadNotificationEmail(data: any) {
  try {
    const timestamp = formatDateTimeET(new Date())

    const response = await resend.emails.send({
      from: "Palm Tree Garage Door <notifications@palmtreegaragedoor.com>",
      to: [BUSINESS_EMAIL],
      subject: `New Lead: ${data.name} - ${data.service || "Service Request"}`,
      react: LeadNotificationEmail({
        ...data,
        timestamp,
      }),
    })

    return { success: true, id: response.id }
  } catch (error) {
    console.error("Error sending lead notification email:", error)
    return { success: false, error }
  }
}

/**
 * Send an autoresponder email to the client
 */
export async function sendClientAutoresponderEmail(data: any) {
  try {
    const timestamp = formatDateTimeET(new Date())

    const response = await resend.emails.send({
      from: "Palm Tree Garage Door <support@palmtreegaragedoor.com>",
      to: [data.email],
      subject: "Thank You for Contacting Palm Tree Garage Door",
      react: ClientAutoresponderEmail({
        ...data,
        timestamp,
      }),
    })

    return { success: true, id: response.id }
  } catch (error) {
    console.error("Error sending client autoresponder email:", error)
    return { success: false, error }
  }
}
