/**
 * Test reCAPTCHA Integration
 *
 * This script tests the reCAPTCHA integration to ensure
 * that verification is working correctly.
 *
 * Run with: node scripts/test-recaptcha.js
 */

// Load environment variables
require("dotenv").config()
const fetch = require("node-fetch")

// ANSI color codes for better readability
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
}

// Get the API keys from environment variables
const siteKey = process.env.RECAPTCHA_SITE_KEY
const secretKey = process.env.RECAPTCHA_SECRET_KEY

if (!siteKey) {
  console.error(`${colors.red}Error: RECAPTCHA_SITE_KEY environment variable is not set${colors.reset}`)
  process.exit(1)
}

if (!secretKey) {
  console.error(`${colors.red}Error: RECAPTCHA_SECRET_KEY environment variable is not set${colors.reset}`)
  process.exit(1)
}

// Test keys
const testKeys = {
  siteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
  secretKey: "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe",
}

// Check if using test keys
function checkTestKeys() {
  console.log(`${colors.bright}${colors.blue}=== Checking reCAPTCHA Keys ===${colors.reset}\n`)

  let usingTestKeys = false

  if (siteKey === testKeys.siteKey) {
    console.log(`${colors.yellow}Warning: Using reCAPTCHA test site key${colors.reset}`)
    usingTestKeys = true
  } else {
    console.log(`${colors.green}Site key is not a test key${colors.reset}`)
  }

  if (secretKey === testKeys.secretKey) {
    console.log(`${colors.yellow}Warning: Using reCAPTCHA test secret key${colors.reset}`)
    usingTestKeys = true
  } else {
    console.log(`${colors.green}Secret key is not a test key${colors.reset}`)
  }

  if (usingTestKeys) {
    console.log(
      `\n${colors.yellow}You are using reCAPTCHA test keys. These will always pass verification but provide no actual protection against spam.${colors.reset}`,
    )
    console.log(
      `${colors.yellow}For production, please use real reCAPTCHA keys from https://www.google.com/recaptcha/admin${colors.reset}\n`,
    )
  }

  return usingTestKeys
}

// Test reCAPTCHA verification
async function testVerification() {
  console.log(`\n${colors.bright}${colors.blue}=== Testing reCAPTCHA Verification ===${colors.reset}\n`)

  try {
    // For test purposes, we'll use a dummy token
    // With test keys, any token will pass
    // With real keys, this should fail, which is expected
    const testToken = "test_token"

    console.log(`Sending verification request to reCAPTCHA API...`)

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${testToken}`,
    })

    if (!response.ok) {
      console.error(`${colors.red}Error: API request failed with status ${response.status}${colors.reset}`)
      return false
    }

    const data = await response.json()

    console.log(`API Response:`, data)

    // With test keys, verification should pass even with an invalid token
    // With real keys, verification should fail with an invalid token
    const usingTestKeys = checkTestKeys()

    if (usingTestKeys) {
      if (data.success) {
        console.log(`${colors.green}Verification passed with test keys (expected)${colors.reset}`)
        return true
      } else {
        console.log(`${colors.red}Verification failed with test keys (unexpected)${colors.reset}`)
        return false
      }
    } else {
      if (!data.success) {
        console.log(`${colors.green}Verification failed with invalid token (expected with real keys)${colors.reset}`)
        return true
      } else {
        console.log(`${colors.red}Verification passed with invalid token (unexpected with real keys)${colors.reset}`)
        return false
      }
    }
  } catch (error) {
    console.error(`${colors.red}Error testing verification: ${error.message}${colors.reset}`)
    return false
  }
}

// Run all tests
async function runTests() {
  console.log(`${colors.bright}${colors.blue}=== reCAPTCHA Integration Tests ===${colors.reset}\n`)

  // Check if using test keys
  const usingTestKeys = checkTestKeys()

  // Test verification
  const verificationResult = await testVerification()

  // Print summary
  console.log(`\n${colors.bright}${colors.blue}=== reCAPTCHA Test Summary ===${colors.reset}\n`)
  console.log(`Using Test Keys: ${usingTestKeys ? colors.yellow + "YES" : colors.green + "NO"}${colors.reset}`)
  console.log(`Verification: ${verificationResult ? colors.green + "PASS" : colors.red + "FAIL"}${colors.reset}`)

  if (verificationResult) {
    console.log(`\n${colors.green}reCAPTCHA integration is working correctly!${colors.reset}`)

    if (usingTestKeys) {
      console.log(
        `\n${colors.yellow}Note: You are using test keys. For production, please use real reCAPTCHA keys.${colors.reset}`,
      )
    }
  } else {
    console.log(
      `\n${colors.red}reCAPTCHA integration test failed. Please check the errors above and fix the issues before deploying.${colors.reset}`,
    )
    process.exit(1)
  }
}

// Run the tests
runTests()
