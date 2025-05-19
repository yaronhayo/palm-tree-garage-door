const fs = require("fs")
const path = require("path")

// Directories to check
const directories = ["public/images", "public/images/testimonials", "public/images/projects", "public/images/services"]

console.log("Checking for image files in the project...")

let totalImages = 0

directories.forEach((dir) => {
  try {
    const fullPath = path.join(process.cwd(), dir)
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath).filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))

      console.log(`Found ${files.length} images in ${dir}`)
      totalImages += files.length

      if (files.length > 0) {
        console.log("  Sample files:")
        files.slice(0, 3).forEach((file) => console.log(`  - ${file}`))
        if (files.length > 3) console.log(`  - ... and ${files.length - 3} more`)
      }
    } else {
      console.log(`Directory not found: ${dir}`)
    }
  } catch (error) {
    console.error(`Error checking directory ${dir}:`, error)
  }
})

console.log(`\nTotal images found: ${totalImages}`)
console.log("\nReminder: Make sure all these images are committed to your Git repository!")
