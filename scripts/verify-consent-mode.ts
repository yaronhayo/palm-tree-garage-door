/**
 * Verify Google Consent Mode v2 Implementation
 *
 * This script checks if Google Consent Mode v2 is properly implemented
 * on the website by examining the dataLayer and consent configuration.
 */

// Mock browser environment
global.window = global.window || ({} as any)
global.document = global.document || ({} as any)
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
} as any

// Import consent manager
import { initializeConsentMode, updateConsentState } from "../lib/consent-manager"

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
}

// Mock dataLayer
global.window.dataLayer = []

console.log(`${colors.cyan}=== Google Consent Mode v2 Verification ====${colors.reset}\n`)

// Test initialization
console.log(`${colors.blue}Testing consent mode initialization...${colors.reset}`)
initializeConsentMode()

// Check if dataLayer has consent command
const hasConsentCommand = global.window.dataLayer.some((item: any) => Array.isArray(item) && item[0] === "consent")

if (hasConsentCommand) {
  console.log(`${colors.green}✓ Consent mode initialization detected in dataLayer${colors.reset}`)
} else {
  console.log(`${colors.red}✗ Consent mode initialization not found in dataLayer${colors.reset}`)
}

// Test consent update
console.log(`\n${colors.blue}Testing consent update functionality...${colors.reset}`)
const testConsentState = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
  functionality_storage: "granted",
  personalization_storage: "granted",
  security_storage: "granted",
}

// Clear dataLayer
global.window.dataLayer = []

// Update consent
updateConsentState(testConsentState)

// Check if dataLayer has consent update command
const hasConsentUpdateCommand = global.window.dataLayer.some(
  (item: any) => Array.isArray(item) && item[0] === "consent" && item[1] === "update",
)

if (hasConsentUpdateCommand) {
  console.log(`${colors.green}✓ Consent update functionality working correctly${colors.reset}`)
} else {
  console.log(`${colors.red}✗ Consent update not found in dataLayer${colors.reset}`)
}

// Verify all consent parameters are included
const consentUpdateCommand = global.window.dataLayer.find(
  (item: any) => Array.isArray(item) && item[0] === "consent" && item[1] === "update",
)

if (consentUpdateCommand) {
  const consentParams = consentUpdateCommand[2]
  const requiredParams = [
    "ad_storage",
    "ad_user_data",
    "ad_personalization",
    "analytics_storage",
    "functionality_storage",
    "personalization_storage",
    "security_storage",
  ]

  const missingParams = requiredParams.filter((param) => !consentParams[param])

  if (missingParams.length === 0) {
    console.log(`${colors.green}✓ All required consent parameters are included${colors.reset}`)
  } else {
    console.log(`${colors.red}✗ Missing consent parameters: ${missingParams.join(", ")}${colors.reset}`)
  }
}

console.log(`\n${colors.cyan}=== Verification Complete ====${colors.reset}`)
console.log(
  `${colors.yellow}Note: This is a basic verification. For complete testing, use Google Tag Assistant in a browser.${colors.reset}`,
)
