/**
 * Google Tag Manager Verification Script
 *
 * This script checks if Google Tag Manager is properly installed
 * and configured in the project.
 *
 * Run with: node scripts/verify-gtm.js
 */

const fs = require("fs")
const path = require("path")

// Configuration
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MF948JFL"
const FILES_TO_CHECK = ["app/layout.tsx", "components/GoogleTagManager.tsx", "lib/dataLayer.ts"]

console.log("🔍 Verifying Google Tag Manager installation...\n")

// Check if GTM ID is properly set
console.log(`📋 GTM ID: ${GTM_ID}`)
if (!GTM_ID || GTM_ID === "GTM-XXXX") {
  console.error("❌ GTM ID is not properly set. Please check your environment variables.")
} else {
  console.log("✅ GTM ID is properly set.")
}

console.log("\n📂 Checking required files:")

// Check if required files exist
let allFilesExist = true
FILES_TO_CHECK.forEach((file) => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists.`)

    // Read file content
    const content = fs.readFileSync(filePath, "utf8")

    // Check for GTM ID in the file
    if (content.includes(GTM_ID) || content.includes("process.env.NEXT_PUBLIC_GTM_ID")) {
      console.log(`  ✅ GTM ID reference found in ${file}`)
    } else if (file === "app/layout.tsx" || file === "components/GoogleTagManager.tsx") {
      console.log(`  ❌ GTM ID reference not found in ${file}`)
      allFilesExist = false
    }

    // Check for dataLayer initialization
    if (file === "lib/dataLayer.ts" && content.includes("window.dataLayer = window.dataLayer || []")) {
      console.log(`  ✅ dataLayer initialization found in ${file}`)
    } else if (file === "lib/dataLayer.ts") {
      console.log(`  ❌ dataLayer initialization not found in ${file}`)
      allFilesExist = false
    }
  } else {
    console.log(`❌ ${file} does not exist.`)
    allFilesExist = false
  }
})

console.log("\n📊 Verification summary:")
if (allFilesExist) {
  console.log("✅ Google Tag Manager appears to be properly installed.")
  console.log("\n🔍 Next steps:")
  console.log("1. Visit /test-gtm to verify GTM is loading correctly in the browser")
  console.log("2. Check GTM debug mode in your browser to verify events are being sent")
  console.log("3. Verify tags are firing correctly in the GTM interface")
} else {
  console.log("❌ Google Tag Manager installation has issues that need to be addressed.")
  console.log("\n🔧 Recommended actions:")
  console.log("1. Ensure GoogleTagManager component is properly imported and used in app/layout.tsx")
  console.log("2. Verify GTM ID is correctly set in environment variables")
  console.log("3. Check dataLayer initialization in lib/dataLayer.ts")
}
