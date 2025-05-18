const { execSync } = require("child_process")

// Try to install critters first
try {
  console.log("Installing critters...")
  execSync("pnpm add critters@0.0.20", { stdio: "inherit" })
  console.log("Critters installed successfully.")
} catch (error) {
  console.error("Failed to install critters, but continuing with build:", error.message)
}

// Run the Next.js build
try {
  console.log("Running Next.js build...")
  execSync("next build", { stdio: "inherit" })
  console.log("Build completed successfully.")
} catch (error) {
  console.error("Build failed:", error.message)
  process.exit(1)
}

// Run sitemap generation
try {
  console.log("Generating sitemap...")
  execSync("next-sitemap", { stdio: "inherit" })
  console.log("Sitemap generated successfully.")
} catch (error) {
  console.error("Sitemap generation failed, but continuing:", error.message)
}
