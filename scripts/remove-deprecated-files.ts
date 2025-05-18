import * as fs from "fs"

// Files to be removed
const filesToRemove = [
  "lib/analytics.ts",
  "lib/image-optimization.ts",
  "lib/image-helpers.ts",
  "components/GTMContainer.tsx",
  "components/SEO.tsx",
  "components/ImageTest.tsx",
  "components/ImageDebug.tsx",
  "components/TestImage.tsx",
]

// Function to remove a file
function removeFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log(`✅ Removed: ${filePath}`)
    } else {
      console.log(`⚠️ File not found: ${filePath}`)
    }
  } catch (error) {
    console.error(`❌ Error removing ${filePath}:`, error)
  }
}

// Main function
function main() {
  console.log("Removing deprecated files...")

  for (const file of filesToRemove) {
    removeFile(file)
  }

  console.log("Done!")
}

main()
