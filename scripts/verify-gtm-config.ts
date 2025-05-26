import https from "https"
import dotenv from "dotenv"

// Load environment variables if .env file exists
try {
  dotenv.config()
} catch (e) {
  // dotenv not installed or .env file doesn't exist
}

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
}

function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function checkGTMId(gtmId: string) {
  return new Promise<{ valid: boolean; message: string }>((resolve) => {
    const url = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`

    https
      .get(url, (res) => {
        if (res.statusCode === 200) {
          resolve({ valid: true, message: "GTM ID is valid and accessible" })
        } else {
          resolve({
            valid: false,
            message: `GTM ID returned status code: ${res.statusCode}`,
          })
        }
      })
      .on("error", (err) => {
        resolve({
          valid: false,
          message: `Error checking GTM ID: ${err.message}`,
        })
      })
  })
}

export async function verifyGTMConfiguration() {
  log("\n🔍 Google Tag Manager Configuration Verification\n", "cyan")

  // Check environment variables
  const gtmIds = [
    { name: "NEXT_PUBLIC_GTM_ID", value: process.env.NEXT_PUBLIC_GTM_ID },
    { name: "GTM_ID", value: process.env.GTM_ID },
  ]

  for (const { name, value } of gtmIds) {
    if (!value) {
      log(`❌ ${name} is not set`, "red")
      continue
    }

    log(`\nChecking ${name}: ${value}`, "blue")

    // Validate format
    const gtmIdPattern = /^GTM-[A-Z0-9]+$/
    if (!gtmIdPattern.test(value)) {
      log(`  ❌ Invalid format. Expected: GTM-XXXXXXX`, "red")

      // Check for common mistakes
      if (value.includes("AW-")) {
        log(`  ⚠️  This looks like a Google Ads ID, not a GTM ID`, "yellow")
      }
      if (value.includes("UA-") || value.includes("G-")) {
        log(`  ⚠️  This looks like a Google Analytics ID, not a GTM ID`, "yellow")
      }
      continue
    }

    log(`  ✅ Format is valid`, "green")

    // Check if GTM container is accessible
    const result = await checkGTMId(value)
    if (result.valid) {
      log(`  ✅ ${result.message}`, "green")
    } else {
      log(`  ❌ ${result.message}`, "red")
    }
  }

  log("\n📝 Recommendations:", "cyan")
  log('1. Use GTM-MF948JFL as your GTM ID (without the "AW-" prefix)')
  log("2. Make sure both NEXT_PUBLIC_GTM_ID and GTM_ID use the same value")
  log("3. The format should be GTM-XXXXXXX where X is alphanumeric")
  log("4. If you need Google Ads tracking, configure it within GTM, not in the ID\n")
}

// If this file is run directly (not imported)
if (require.main === module) {
  verifyGTMConfiguration()
}
