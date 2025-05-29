import https from "https"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"

// Load environment variables
dotenv.config()

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

async function checkLayoutFile() {
  const layoutPath = path.join(process.cwd(), "app", "layout.tsx")

  try {
    const layoutContent = fs.readFileSync(layoutPath, "utf8")

    // Check for GTM script in head
    const hasGTMScriptInHead = layoutContent.includes("googletagmanager.com/gtm.js")

    // Check for GTM noscript iframe in body
    const hasGTMNoScriptInBody = layoutContent.includes("googletagmanager.com/ns.html")

    return {
      hasGTMScriptInHead,
      hasGTMNoScriptInBody,
      valid: hasGTMScriptInHead && hasGTMNoScriptInBody,
    }
  } catch (error) {
    return {
      hasGTMScriptInHead: false,
      hasGTMNoScriptInBody: false,
      valid: false,
      error: `Error reading layout file: ${(error as Error).message}`,
    }
  }
}

export async function verifyGTMImplementation() {
  log("\n🔍 Google Tag Manager Implementation Verification\n", "cyan")

  // Get GTM ID from environment variables
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || process.env.GTM_ID || "GTM-MF948JFL"

  log(`Using GTM ID: ${gtmId}`, "blue")

  // Validate GTM ID format
  const gtmIdPattern = /^GTM-[A-Z0-9]+$/
  if (!gtmIdPattern.test(gtmId)) {
    log(`❌ Invalid GTM ID format: ${gtmId}`, "red")
    log("  GTM ID should be in the format GTM-XXXXXXX", "yellow")
    return false
  } else {
    log("✅ GTM ID format is valid", "green")
  }

  // Check if GTM container is accessible
  const gtmAccessibility = await checkGTMId(gtmId)
  if (gtmAccessibility.valid) {
    log(`✅ ${gtmAccessibility.message}`, "green")
  } else {
    log(`❌ ${gtmAccessibility.message}`, "red")
    return false
  }

  // Check layout file implementation
  log("\nChecking GTM implementation in layout.tsx:", "blue")
  const layoutCheck = await checkLayoutFile()

  if (layoutCheck.valid) {
    log("✅ GTM script found in head section", "green")
    log("✅ GTM noscript iframe found in body", "green")
  } else {
    if (!layoutCheck.hasGTMScriptInHead) {
      log("❌ GTM script not found in head section", "red")
    }
    if (!layoutCheck.hasGTMNoScriptInBody) {
      log("❌ GTM noscript iframe not found in body", "red")
    }
    if (layoutCheck.error) {
      log(`❌ ${layoutCheck.error}`, "red")
    }
    return false
  }

  // Check Content Security Policy
  log("\nChecking Content Security Policy:", "blue")
  try {
    const nextConfigPath = path.join(process.cwd(), "next.config.js")
    const nextConfigContent = fs.readFileSync(nextConfigPath, "utf8")

    const hasGTMInCSP = nextConfigContent.includes("googletagmanager.com")

    if (hasGTMInCSP) {
      log("✅ Content Security Policy allows Google Tag Manager", "green")
    } else {
      log("❌ Content Security Policy may block Google Tag Manager", "red")
      log("  Update CSP to include googletagmanager.com domains", "yellow")
      return false
    }
  } catch (error) {
    log(`❌ Error checking next.config.js: ${(error as Error).message}`, "red")
  }

  log("\n✅ GTM implementation verification complete", "green")
  log("GTM should now be properly detected on your website", "green")

  return true
}

// Run the verification if this file is executed directly
if (require.main === module) {
  verifyGTMImplementation()
}
