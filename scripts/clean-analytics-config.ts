import fs from "fs"
import path from "path"

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

export function cleanAnalyticsConfig() {
  log("\n🧹 Cleaning analytics configuration...\n", "cyan")

  // Check for any analytics configuration files
  const configFiles = [
    "lib/analytics.ts",
    "lib/analytics/ga-config.ts",
    "components/Analytics.tsx",
    "app/analytics.js",
    "app/vercel-analytics.js",
  ]

  const conflictingTags = ["AW-11551227485", "G-LP2GQ10MTJ", "GTM-WPZNV4T3"]
  let foundIssues = false

  configFiles.forEach((configFile) => {
    const filePath = path.join(process.cwd(), configFile)

    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, "utf8")
        const hasConflictingTags = conflictingTags.some((tag) => content.includes(tag))

        if (hasConflictingTags) {
          log(`⚠️  Found conflicting tags in: ${configFile}`, "yellow")
          foundIssues = true

          // Show which tags were found
          conflictingTags.forEach((tag) => {
            if (content.includes(tag)) {
              log(`  🏷️  ${tag}`, "red")
            }
          })
        } else {
          log(`✅ Clean: ${configFile}`, "green")
        }
      } catch (error) {
        log(`❌ Error reading: ${configFile}`, "red")
      }
    }
  })

  if (!foundIssues) {
    log("\n✅ No conflicting analytics configurations found!", "green")
  } else {
    log("\n🔧 Action required:", "yellow")
    log("Update the files listed above to remove conflicting tag IDs.", "yellow")
    log("Ensure only GTM-MF948JFL is configured.", "yellow")
  }

  // Check environment variables
  log("\n🔍 Checking environment variables...", "blue")

  const envVars = ["NEXT_PUBLIC_GA_ID", "NEXT_PUBLIC_GTM_ID", "GTM_ID", "GOOGLE_ANALYTICS_ID", "GOOGLE_ADS_ID"]

  envVars.forEach((envVar) => {
    const value = process.env[envVar]
    if (value) {
      if (conflictingTags.includes(value)) {
        log(`⚠️  Environment variable ${envVar} contains conflicting tag: ${value}`, "yellow")
        foundIssues = true
      } else if (value === "GTM-MF948JFL") {
        log(`✅ Environment variable ${envVar} is correct: ${value}`, "green")
      } else {
        log(`ℹ️  Environment variable ${envVar}: ${value}`, "blue")
      }
    }
  })

  return !foundIssues
}

// Run the cleanup if this file is executed directly
if (require.main === module) {
  cleanAnalyticsConfig()
}
