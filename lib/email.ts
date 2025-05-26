import { Resend } from "resend"

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
    // Format the subject line with customer name and zip code
    const zipCode = formData.zipCode || userInfo?.zipCode || "Unknown ZIP"
    const subject = `${formData.isEmergency ? "🚨 EMERGENCY: " : ""}New lead from ${formData.name} at ${zipCode}`

    // Send to both email addresses
    const { data, error } = await resend.emails.send({
      from: `Palm Tree Garage Door <DoNotReply@garagedoorspringsrepairfl.com>`,
      to: ["palmtreegaragedoorrepair@gmail.com", "yaron@gettmarketing.com"],
      subject: subject,
      react: (await import("../components/emails/LeadNotificationEmail")).default({ formData, userInfo }),
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
    return { success: false, error }
  }
}

/**
 * Send both notification and autoresponder emails for form submissions
 */
export async function sendFormSubmissionEmails(formData: FormData, userInfo?: any, recaptchaResult?: any) {
  try {
    // Add recaptcha result to userInfo if provided
    const enhancedUserInfo = recaptchaResult
      ? {
          ...userInfo,
          recaptchaVerified: recaptchaResult.verified,
          recaptchaScore: recaptchaResult.score,
        }
      : userInfo

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
