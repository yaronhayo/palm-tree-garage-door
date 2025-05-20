/**
 * Email utilities
 */
import { Resend } from "resend"
import LeadNotificationEmail from "@/components/emails/LeadNotificationEmail"
import ClientAutoresponderEmail from "@/components/emails/ClientAutoresponderEmail"
import type { UserInfo } from "./user-info"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Business email from environment variable
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || "info@palmtreegaragedoor.com"

// Form data interface
export interface FormData {
  name: string
  email: string
  phone: string
  [key: string]: any
}

interface EmailResult {
  success: boolean
  notificationId?: string
  autoresponderSent?: boolean
  autoresponderError?: string
  notificationError?: string
}

/**
 * Send form submission emails (notification to business and autoresponder to client)
 */
export async function sendFormSubmissionEmails(
  formData: FormData,
  userInfo?: UserInfo,
  recaptchaResult?: { verified: boolean; score?: number },
): Promise<EmailResult> {
  try {
    // Ensure we have the required fields
    if (!formData.name || !formData.email || !formData.phone) {
      return {
        success: false,
        notificationError: "Missing required form fields",
      }
    }

    // Add recaptcha info to userInfo if provided
    if (recaptchaResult) {
      userInfo = {
        ...userInfo,
        recaptchaVerified: recaptchaResult.verified,
        recaptchaScore: recaptchaResult.score,
      }
    }

    // Send notification email to business
    const notificationResult = await sendLeadNotificationEmail(formData, userInfo)

    // Send autoresponder email to customer
    const autoresponderResult = await sendClientAutoresponderEmail(formData)

    return {
      success: true,
      notificationId: notificationResult.id,
      autoresponderSent: !!autoresponderResult.id,
      autoresponderError: autoresponderResult.error,
    }
  } catch (error) {
    console.error("Error sending emails:", error)
    return {
      success: false,
      notificationError: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Send a lead notification email to the business
 */
export async function sendLeadNotificationEmail(formData: FormData, userInfo?: UserInfo) {
  try {
    const result = await resend.emails.send({
      from: `Palm Tree Garage Door <notifications@palmtreegaragedoor.com>`,
      to: BUSINESS_EMAIL,
      subject: `New Lead: ${formData.name} - ${formData.service || "Service Request"}`,
      react: LeadNotificationEmail({ formData, userInfo }),
      reply_to: formData.email,
    })

    return { id: result.id, error: null }
  } catch (error) {
    console.error("Error sending notification email:", error)
    return { id: null, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

/**
 * Send an autoresponder email to the client
 */
export async function sendClientAutoresponderEmail(formData: FormData) {
  try {
    const result = await resend.emails.send({
      from: `Palm Tree Garage Door <support@palmtreegaragedoor.com>`,
      to: formData.email,
      subject: `Thank You for Contacting Palm Tree Garage Door`,
      react: ClientAutoresponderEmail({ formData }),
    })

    return { id: result.id, error: null }
  } catch (error) {
    console.error("Error sending autoresponder email:", error)
    return { id: null, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
