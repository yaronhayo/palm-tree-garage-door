#!/usr/bin/env node

import * as fs from "fs"
import * as path from "path"

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
}

console.log(`${colors.bright}${colors.blue}🔍 Verifying Google Tag Implementation${colors.reset}\n`)

// Check layout.tsx for Google tag
const layoutPath = path.join(process.cwd(), "app", "layout.tsx")
const layoutContent = fs.readFileSync(layoutPath, "utf-8")

// Check for Google tag script
const hasGtagScript = layoutContent.includes("https://www.googletagmanager.com/gtag/js?id=G-RKH53HHRHD")
const hasGtagConfig = layoutContent.includes("gtag('config', 'G-RKH53HHRHD')")
const hasGtagFunction = layoutContent.includes("function gtag(){dataLayer.push(arguments);}")

console.log(`${colors.bright}Google Tag (gtag.js) Checks:${colors.reset}`)
console.log(`  ${hasGtagScript ? colors.green + "✓" : colors.red + "✗"} Google tag script loaded${colors.reset}`)
console.log(`  ${hasGtagConfig ? colors.green + "✓" : colors.red + "✗"} gtag config for G-RKH53HHRHD${colors.reset}`)
console.log(`  ${hasGtagFunction ? colors.green + "✓" : colors.red + "✗"} gtag function defined${colors.reset}`)

// Check for GTM
const hasGTM = layoutContent.includes("GTM-MF948JFL")
console.log(`\n${colors.bright}Google Tag Manager Checks:${colors.reset}`)
console.log(`  ${hasGTM ? colors.green + "✓" : colors.red + "✗"} GTM container GTM-MF948JFL${colors.reset}`)

// Check for consent mode
const hasConsentMode = layoutContent.includes("gtag('consent', 'default'")
console.log(`\n${colors.bright}Consent Mode Checks:${colors.reset}`)
console.log(`  ${hasConsentMode ? colors.green + "✓" : colors.red + "✗"} Consent mode configured${colors.reset}`)

// Check script order
const gtagScriptIndex = layoutContent.indexOf("https://www.googletagmanager.com/gtag/js?id=G-RKH53HHRHD")
const consentIndex = layoutContent.indexOf("gtag('consent', 'default'")
const scriptOrderCorrect = gtagScriptIndex > 0 && gtagScriptIndex < consentIndex

console.log(`\n${colors.bright}Script Order Checks:${colors.reset}`)
console.log(
  `  ${scriptOrderCorrect ? colors.green + "✓" : colors.red + "✗"} Google tag loads before consent mode${colors.reset}`,
)

// Provide recommendations
console.log(`\n${colors.bright}${colors.yellow}📋 Recommendations:${colors.reset}`)
if (!hasGtagScript || !hasGtagConfig) {
  console.log(`  - Ensure Google tag script is in the <head> section`)
  console.log(
    `  - Script should be: <script async src="https://www.googletagmanager.com/gtag/js?id=G-RKH53HHRHD"></script>`,
  )
}

console.log(`\n${colors.bright}${colors.blue}🌐 Test Your Implementation:${colors.reset}`)
console.log(`  1. Visit your site: /test-google-tag`)
console.log(`  2. Use Google Tag Assistant Chrome extension`)
console.log(`  3. Check Real-Time reports in Google Analytics`)
console.log(`  4. Use Browser DevTools Network tab to see requests to google-analytics.com`)

// Test with curl if available
console.log(`\n${colors.bright}${colors.blue}🔧 Quick Test:${colors.reset}`)
try {
  console.log(`  Run: npm run dev`)
  console.log(`  Then visit: http://localhost:3000/test-google-tag`)
} catch (error) {
  console.log(`  ${colors.yellow}Could not run automated test${colors.reset}`)
}

console.log(`\n${colors.green}✅ Verification complete!${colors.reset}`)
