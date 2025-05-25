import { Resend } from "resend"
import { BUSINESS_EMAIL } from "./env-client"

// Create a Resend instance
const resend = new Resend(process.env.RESEND_API_KEY)

// Define the FormData type
export type FormData = {
  name: string
  email: string
  phone: string
  message?: string
  service?: string
  urgency?: string
  date?: string
  time?: string
  city?: string
  zipCode?: string
  formattedAddress?: string
  gateCode?: string
  specialInstructions?: string
  isEmergency?: boolean
  formType?: string
  [key: string]: any // Allow for additional properties
}

// Function to send lead notification email
export async function sendLeadNotificationEmail(formData: FormData, userInfo?: any) {
  try {
    const { data, error } = await resend.emails.send({
      from: `Palm Tree Garage Door <notifications@palmtreegaragedoor.com>`,
      to: [BUSINESS_EMAIL],
      subject: `${formData.isEmergency ? "🚨 EMERGENCY: " : ""}New Lead: ${formData.name} - ${
        formData.service || formData.formType || "Contact Form"
      }`,
      react: (await import("../components/emails/LeadNotificationEmail")).default({ formData, userInfo }),
    })

    if (error) {
      console.error("Error sending lead notification email:", error)
      throw new Error(`Failed to send lead notification: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in sendLeadNotificationEmail:", error)
    throw error
  }
}

// Function to send client autoresponder email
export async function sendClientAutoresponderEmail(formData: FormData) {
  try {
    const { data, error } = await resend.emails.send({
      from: `Palm Tree Garage Door <support@palmtreegaragedoor.com>`,
      to: [formData.email],
      subject: `Thank you for contacting Palm Tree Garage Door!`,
      react: (await import("../components/emails/ClientAutoresponderEmail")).default({ formData }),
    })

    if (error) {
      console.error("Error sending client autoresponder email:", error)
      throw new Error(`Failed to send autoresponder: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in sendClientAutoresponderEmail:", error)
    throw error
  }
}

/**
 * Send both notification and autoresponder emails for form submissions
 */
export async function sendFormSubmissionEmails(formData: FormData, userInfo?: any) {
  try {
    // Send notification email to business
    const notificationResult = await sendLeadNotificationEmail(formData, userInfo)

    // Send autoresponder email to client
    const autoresponderResult = await sendClientAutoresponderEmail(formData)

    return {
      success: true,
      notification: notificationResult,
      autoresponder: autoresponderResult,
    }
  } catch (error) {
    console.error("Error sending form submission emails:", error)
    throw error
  }
}
