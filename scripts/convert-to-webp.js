// This script converts all images in the public directory to WebP format
// Run with: node scripts/convert-to-webp.js

const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

const PUBLIC_DIR = path.join(__dirname, "../public")
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif"]

// Function to recursively process directories
async function processDirectory(directory) {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath)
    } else {
      const ext = path.extname(file).toLowerCase()

      // Check if it's an image we want to convert
      if (IMAGE_EXTENSIONS.includes(ext) && !file.includes(".webp")) {
        const outputPath = filePath.replace(ext, ".webp")

        // Skip if WebP version already exists
        if (fs.existsSync(outputPath)) {
          console.log(`Skipping ${filePath} - WebP version already exists`)
          continue
        }

        try {
          // Convert to WebP with 80% quality (good balance between quality and size)
          await sharp(filePath).webp({ quality: 80 }).toFile(outputPath)

          console.log(`Converted ${filePath} to WebP`)

          // Get file sizes for comparison
          const originalSize = fs.statSync(filePath).size
          const webpSize = fs.statSync(outputPath).size
          const savings = (((originalSize - webpSize) / originalSize) * 100).toFixed(2)

          console.log(
            `Size reduction: ${savings}% (${(originalSize / 1024).toFixed(2)}KB → ${(webpSize / 1024).toFixed(2)}KB)`,
          )
        } catch (error) {
          console.error(`Error converting ${filePath}:`, error)
        }
      }
    }
  }
}
// Start processing from the public directory
;(async () => {
  console.log("Starting image conversion to WebP...")
  await processDirectory(PUBLIC_DIR)
  console.log("Conversion complete!")
})()
