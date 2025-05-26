/**
 * Test Email Sending
 *
 * This script tests the email sending functionality using Resend
 * to ensure that emails are being sent correctly.
 *
 * Run with: node scripts/test-email-sending.js
 */

// Load environment variables
require("dotenv").config()
const { Resend } = require("resend")

// ANSI color codes for better readability
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
}

// Get the API key from environment variables
const apiKey = process.env.RESEND_API_KEY
const businessEmail = process.env.BUSINESS_EMAIL

if (!apiKey) {
  console.error(`${colors.red}Error: RESEND_API_KEY environment variable is not set${colors.reset}`)
  process.exit(1)
}

if (!businessEmail) {
  console.error(`${colors.red}Error: BUSINESS_EMAIL environment variable is not set${colors.reset}`)
  process.exit(1)
}

// Create a Resend instance
const resend = new Resend(apiKey)

// Test sending a simple email
async function testSendEmail() {
  console.log(`${colors.bright}${colors.blue}=== Testing Email Sending ===${colors.reset}\n`)

  try {
    console.log(`Sending test email to ${businessEmail}...`)

    const { data, error } = await resend.emails.send({
      from: "Palm Tree Garage Door <onboarding@resend.dev>",
      to: [businessEmail],
      subject: "Test Email - Pre-Deployment Check",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #0D423A; font-size: 24px;">Pre-Deployment Email Test</h1>
          <p>This is a test email to verify that the Resend integration is working correctly.</p>
          <p>If you're receiving this email, it means that your email sending functionality is properly configured.</p>
          <div style="background: #e8f4ea; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #9ADF67;">
            <p style="margin: 0;"><strong>Environment:</strong> ${process.env.NODE_ENV || "development"}</p>
            <p style="margin: 10px 0 0;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
          <p>You can now proceed with confidence that your email notifications will work in production.</p>
        </div>
      `,
    })

    if (error) {
      console.error(`${colors.red}Error sending email: ${error.message}${colors.reset}`)
      return false
    }

    console.log(`${colors.green}Email sent successfully!${colors.reset}`)
    console.log(`Email ID: ${data.id}`)
    return true
  } catch (error) {
    console.error(`${colors.red}Error sending email: ${error.message}${colors.reset}`)
    return false
  }
}

// Test sending a lead notification email
async function testLeadNotificationEmail() {
  console.log(`\n${colors.bright}${colors.blue}=== Testing Lead Notification Email ===${colors.reset}\n`)

  try {
    console.log(`Sending test lead notification to ${businessEmail}...`)

    // Mock form data
    const formData = {
      name: "Test User",
      email: businessEmail,
      phone: "(321) 555-1234",
      service: "spring-repair",
      message: "This is a test lead notification email.",
      city: "Coral Springs",
      zipCode: "33065",
      formType: "test",
      isEmergency: false,
      submissionTime: new Date().toISOString(),
    }

    // Mock user info
    const userInfo = {
      ip: "127.0.0.1",
      userAgent: "Test Script",
      screen: { width: 1920, height: 1080 },
      language: "en-US",
      timezone: "America/New_York",
      submissionTimeEastern: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    }

    const { data, error } = await resend.emails.send({
      from: `Palm Tree Garage Door <notifications@palmtreegaragedoor.com>`,
      to: [businessEmail],
      subject: `TEST: New Lead: ${formData.name} - ${formData.service || formData.formType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #0D423A; font-size: 24px;">Test Lead Notification</h1>
          <p>This is a test lead notification email to verify that your lead notification emails are working correctly.</p>
          
          <div style="background: #f7f7f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0D423A; font-size: 18px; margin-bottom: 10px; border-bottom: 2px solid #9ADF67; padding-bottom: 5px;">
              Contact Information
            </h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>City:</strong> ${formData.city}</p>
            <p><strong>ZIP Code:</strong> ${formData.zipCode}</p>
            
            <h2 style="color: #0D423A; font-size: 18px; margin: 20px 0 10px; border-bottom: 2px solid #9ADF67; padding-bottom: 5px;">
              Service Details
            </h2>
            <p><strong>Service Requested:</strong> ${formData.service}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
            
            <h2 style="color: #0D423A; font-size: 18px; margin: 20px 0 10px; border-bottom: 2px solid #9ADF67; padding-bottom: 5px;">
              Submission Information
            </h2>
            <p><strong>Form Type:</strong> ${formData.formType}</p>
            <p><strong>Submission Time:</strong> ${formData.submissionTime}</p>
          </div>
          
          <p>If you're receiving this email, it means that your lead notification emails are properly configured.</p>
        </div>
      `,
    })

    if (error) {
      console.error(`${colors.red}Error sending lead notification email: ${error.message}${colors.reset}`)
      return false
    }

    console.log(`${colors.green}Lead notification email sent successfully!${colors.reset}`)
    console.log(`Email ID: ${data.id}`)
    return true
  } catch (error) {
    console.error(`${colors.red}Error sending lead notification email: ${error.message}${colors.reset}`)
    return false
  }
}

// Test sending a client autoresponder email
async function testClientAutoresponderEmail() {
  console.log(`\n${colors.bright}${colors.blue}=== Testing Client Autoresponder Email ===${colors.reset}\n`)

  try {
    console.log(`Sending test client autoresponder to ${businessEmail}...`)

    // Mock form data
    const formData = {
      name: "Test User",
      email: businessEmail,
      phone: "(321) 555-1234",
      service: "spring-repair",
      date: new Date().toISOString().split("T")[0],
      time: "morning",
      city: "Coral Springs",
      formType: "booking",
      isEmergency: false,
    }

    const { data, error } = await resend.emails.send({
      from: `Palm Tree Garage Door <support@palmtreegaragedoor.com>`,
      to: [businessEmail],
      subject: `TEST: Thank you for contacting Palm Tree Garage Door!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h1 style="color: #0D423A; font-size: 24px;">Thank You for Contacting Us!</h1>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Dear ${formData.name},</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            This is a test autoresponder email to verify that your client autoresponder emails are working correctly.
          </p>
          
          <div style="background: #e8f4ea; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #9ADF67;">
            <h3 style="color: #0D423A; margin: 0 0 10px 0;">Your Request Summary:</h3>
            <ul style="padding-left: 20px; margin: 0;">
              <li><strong>Service:</strong> ${formData.service}</li>
              <li><strong>Preferred Date:</strong> ${formData.date}</li>
              <li><strong>Preferred Time:</strong> ${formData.time}</li>
              <li><strong>Location:</strong> ${formData.city}</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            If you're receiving this email, it means that your client autoresponder emails are properly configured.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 10px;">
            Thank you for choosing Palm Tree Garage Door!
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 0;">
            Sincerely,<br />
            The Palm Tree Garage Door Team
          </p>
        </div>
      `,
    })

    if (error) {
      console.error(`${colors.red}Error sending client autoresponder email: ${error.message}${colors.reset}`)
      return false
    }

    console.log(`${colors.green}Client autoresponder email sent successfully!${colors.reset}`)
    console.log(`Email ID: ${data.id}`)
    return true
  } catch (error) {
    console.error(`${colors.red}Error sending client autoresponder email: ${error.message}${colors.reset}`)
    return false
  }
}

// Run all tests
async function runTests() {
  console.log(`${colors.bright}${colors.blue}=== Email Sending Tests ===${colors.reset}\n`)

  let success = true

  // Test simple email
  const simpleEmailResult = await testSendEmail()
  success = success && simpleEmailResult

  // Test lead notification email
  const leadNotificationResult = await testLeadNotificationEmail()
  success = success && leadNotificationResult

  // Test client autoresponder email
  const clientAutoresponderResult = await testClientAutoresponderEmail()
  success = success && clientAutoresponderResult

  // Print summary
  console.log(`\n${colors.bright}${colors.blue}=== Email Test Summary ===${colors.reset}\n`)
  console.log(`Simple Email: ${simpleEmailResult ? colors.green + "PASS" : colors.red + "FAIL"}${colors.reset}`)
  console.log(
    `Lead Notification: ${leadNotificationResult ? colors.green + "PASS" : colors.red + "FAIL"}${colors.reset}`,
  )
  console.log(
    `Client Autoresponder: ${clientAutoresponderResult ? colors.green + "PASS" : colors.red + "FAIL"}${colors.reset}`,
  )

  console.log(`\nOverall Result: ${success ? colors.green + "PASS" : colors.red + "FAIL"}${colors.reset}`)

  if (success) {
    console.log(
      `\n${colors.green}All email tests passed! Your email sending functionality is working correctly.${colors.reset}`,
    )
  } else {
    console.log(
      `\n${colors.yellow}Some email tests failed. Please check the errors above and fix the issues before deploying.${colors.reset}`,
    )
    process.exit(1)
  }
}

// Run the tests
runTests()
