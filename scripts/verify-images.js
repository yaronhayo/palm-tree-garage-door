const fs = require("fs")
const path = require("path")

// List of critical images to check
const criticalImages = [
  "/logo.png",
  "/images/service-truck.png",
  // Add other important images here
]

// Check if the out directory exists
if (!fs.existsSync(path.join(process.cwd(), "out"))) {
  console.error('Error: The "out" directory does not exist. Run the build first.')
  process.exit(1)
}

// Check each critical image
const missingImages = []
criticalImages.forEach((imagePath) => {
  const fullPath = path.join(process.cwd(), "out", imagePath)
  if (!fs.existsSync(fullPath)) {
    missingImages.push(imagePath)
  }
})

if (missingImages.length > 0) {
  console.error("Error: The following critical images are missing from the build:")
  missingImages.forEach((img) => console.error(`  - ${img}`))
  process.exit(1)
} else {
  console.log("All critical images are included in the build.")
}
