/**
 * Script to verify API keys before deployment
 * Run with: node scripts/verify-api-keys.js
 */

// Load environment variables
require("dotenv").config()

// Define required environment variables
const requiredEnvVars = [
  "SITE_URL",
  "BUSINESS_EMAIL",
  "RESEND_API_KEY",
  "RECAPTCHA_SITE_KEY",
  "RECAPTCHA_SECRET_KEY",
  "NEXT_PUBLIC_GTM_ID",
]

// Define test keys that should not be used in production
const testKeys = {
  RECAPTCHA_SITE_KEY: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
  RECAPTCHA_SECRET_KEY: "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe",
}

// Check for missing environment variables
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName])

if (missingVars.length > 0) {
  console.error("❌ Missing required environment variables:")
  missingVars.forEach((varName) => {
    console.error(`   - ${varName}`)
  })
} else {
  console.log("✅ All required environment variables are set")
}

// Check for test keys in production
let testKeysInUse = []
if (process.env.NODE_ENV === "production") {
  testKeysInUse = Object.entries(testKeys).filter(([varName, testValue]) => process.env[varName] === testValue)

  if (testKeysInUse.length > 0) {
    console.error("❌ Test keys detected in production:")
    testKeysInUse.forEach(([varName]) => {
      console.error(`   - ${varName} is using a test key`)
    })
  } else {
    console.log("✅ No test keys detected in production")
  }
}

// Verify Resend API key format
const resendKey = process.env.RESEND_API_KEY
if (resendKey && !resendKey.startsWith("re_")) {
  console.error('❌ Invalid Resend API key format (should start with "re_")')
} else if (resendKey) {
  console.log("✅ Resend API key format is valid")
}

// Verify reCAPTCHA keys are not empty
if (process.env.RECAPTCHA_SITE_KEY && process.env.RECAPTCHA_SECRET_KEY) {
  console.log("✅ reCAPTCHA keys are set")
} else {
  console.error("❌ reCAPTCHA keys are missing or empty")
}

// Summary
console.log("\nAPI Key Verification Summary:")
if (
  missingVars.length === 0 &&
  (process.env.NODE_ENV !== "production" || testKeysInUse.length === 0) &&
  resendKey &&
  resendKey.startsWith("re_") &&
  process.env.RECAPTCHA_SITE_KEY &&
  process.env.RECAPTCHA_SECRET_KEY
) {
  console.log("✅ All API keys verified successfully")
} else {
  console.error("❌ API key verification failed - see issues above")
  process.exit(1)
}
