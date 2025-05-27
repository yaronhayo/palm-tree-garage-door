import { Resend } from "resend"
import LeadNotificationEmail from "@/components/emails/LeadNotificationEmail"
import ClientAutoresponderEmail from "@/components/emails/ClientAutoresponderEmail"

// Create a Resend instance with error handling
let resend: Resend
try {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("Resend API key not found in environment variables")
  }
  resend = new Resend(apiKey)
} catch (error) {
  console.error("Failed to initialize Resend:", error)
  // Create a dummy instance that will log errors instead of crashing
  resend = {
    emails: {
      send: async () => {
        console.error("Email sending failed: Resend not properly initialized")
        return { error: { message: "Email service not configured" }, data: null }
      },
    },
  } as unknown as Resend
}

// Company name for email display
const COMPANY_NAME = "Palm Tree Garage Door"

// No-reply email for autoresponders
const NO_REPLY_EMAIL = "DoNotReply@garagedoorspringsrepairfl.com"

// Email types
export enum EmailType {
  LEAD_NOTIFICATION = "lead_notification",
  CLIENT_AUTORESPONDER = "client_autoresponder",
}

// Define the FormData type
export type FormData = {
  name: string
  email: string
  phone: string
  message?: string
  service?: string
  serviceUrgency?: string
  urgency?: string
  date?: string
  time?: string
  city?: string
  state?: string
  zipCode?: string
  street?: string
  unit?: string
  formattedAddress?: string
  gateCode?: string
  specialInstructions?: string
  isEmergency?: boolean
  formType?: string
  [key: string]: any // Allow for additional properties
}

// Helper function to get current time in Eastern Time
function getCurrentEasternTime(): string {
  const now = new Date()
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  }).format(now)
}

/**
 * Send a lead notification email to the business
 */
export async function sendLeadNotificationEmail(
  formData: FormData,
  userInfo?: any,
): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    // Add current Eastern Time to userInfo
    const enhancedUserInfo = {
      ...userInfo,
      submissionTimeET: getCurrentEasternTime(),
    }

    // Format the subject line with customer name and zip code
    const zipCode = formData.zipCode || userInfo?.zipCode || "Unknown ZIP"
    const subject = `${formData.isEmergency ? "🚨 EMERGENCY: " : ""}New lead from ${formData.name} at ${zipCode}`

    // Send to both email addresses
    const { data, error } = await resend.emails.send({
      from: `${COMPANY_NAME} <${NO_REPLY_EMAIL}>`,
      to: ["palmtreegaragedoorrepair@gmail.com", "yaron@gettmarketing.com"],
      subject: subject,
      react: LeadNotificationEmail({ formData, userInfo: enhancedUserInfo }),
    })

    if (error) {
      console.error("Error sending lead notification email:", error)
      throw new Error(`Failed to send lead notification: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in sendLeadNotificationEmail:", error)
    return { success: false, error }
  }
}

/**
 * Send an autoresponder email to the client
 */
export async function sendClientAutoresponderEmail(
  formData: FormData,
): Promise<{ success: boolean; error?: any; data?: any }> {
  try {
    const { data, error } = await resend.emails.send({
      from: `${COMPANY_NAME} <${NO_REPLY_EMAIL}>`,
      to: [formData.email],
      subject: `Thank you for contacting ${COMPANY_NAME}!`,
      react: ClientAutoresponderEmail({ formData }),
    })

    if (error) {
      console.error("Error sending client autoresponder email:", error)
      throw new Error(`Failed to send autoresponder: ${error.message}`)
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error in sendClientAutoresponderEmail:", error)
    return { success: false, error }
  }
}

/**
 * Send both notification and autoresponder emails for form submissions
 */
export async function sendFormSubmissionEmails(
  formData: FormData,
  userInfo?: any,
  recaptchaResult?: any,
): Promise<{ success: boolean; error?: any; notification?: any; autoresponder?: any }> {
  try {
    // Add recaptcha result and Eastern Time to userInfo if provided
    const enhancedUserInfo = {
      ...(userInfo || {}),
      submissionTimeET: getCurrentEasternTime(),
      ...(recaptchaResult
        ? {
            recaptchaVerified: recaptchaResult.verified,
            recaptchaScore: recaptchaResult.score,
          }
        : {}),
    }

    // Send notification email to business
    const notificationResult = await sendLeadNotificationEmail(formData, enhancedUserInfo)

    // Only send autoresponder if notification was successful
    if (notificationResult.success) {
      const autoresponderResult = await sendClientAutoresponderEmail(formData)

      return {
        success: true,
        notification: notificationResult,
        autoresponder: autoresponderResult,
      }
    }

    return {
      success: false,
      notification: notificationResult,
      autoresponder: { success: false, error: "Skipped due to notification failure" },
    }
  } catch (error) {
    console.error("Error sending form submission emails:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
