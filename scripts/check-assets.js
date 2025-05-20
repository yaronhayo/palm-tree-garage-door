const fs = require("fs")
const path = require("path")

// List of critical assets to check
const criticalAssets = [
  "/logo.png",
  "/favicon.ico",
  "/images/service-truck.png",
  "/images/garage-door-repair-service.png",
]

// Check if the public directory exists
if (!fs.existsSync(path.join(process.cwd(), "public"))) {
  console.error('Error: The "public" directory does not exist.')
  process.exit(1)
}

// Check each critical asset
const missingAssets = []
criticalAssets.forEach((assetPath) => {
  const fullPath = path.join(process.cwd(), "public", assetPath)
  if (!fs.existsSync(fullPath)) {
    missingAssets.push(assetPath)
  }
})

if (missingAssets.length > 0) {
  console.error("Error: The following critical assets are missing:")
  missingAssets.forEach((asset) => console.error(`  - ${asset}`))
  process.exit(1)
} else {
  console.log("All critical assets are present.")
}
