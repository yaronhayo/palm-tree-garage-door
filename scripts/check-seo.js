// SEO Checker Script
const fs = require("fs")
const path = require("path")

console.log("🔍 Running SEO Checklist...\n")

// Helper function to read file safely
function readFileSafely(filePath) {
  try {
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : ""
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
    return ""
  }
}

// Check title tag length
const layoutPath = path.join(process.cwd(), "app", "(site)", "layout.tsx")
const layoutContent = readFileSafely(layoutPath)
const titleMatch = layoutContent.match(/title: "([^"]+)"/)

if (titleMatch && titleMatch[1]) {
  const titleLength = titleMatch[1].length
  console.log(`📏 Title tag length: ${titleLength} characters ${titleLength <= 60 ? "✅" : "❌"}`)
  console.log(`   Title: "${titleMatch[1]}"`)

  // Check if title contains main keyword
  const hasKeyword = titleMatch[1].includes("Garage Door Repair South Florida")
  console.log(`🔑 Contains main keyword: ${hasKeyword ? "✅" : "❌"}`)
} else {
  console.log("❌ Title tag not found")
}

// Check meta description length
const descMatch = layoutContent.match(/description: "([^"]+)"/)
if (descMatch && descMatch[1]) {
  const descLength = descMatch[1].length
  console.log(`📏 Meta description length: ${descLength} characters ${descLength <= 155 ? "✅" : "❌"}`)
  console.log(`   Description: "${descMatch[1]}"`)
} else {
  console.log("❌ Meta description not found")
}

// Check H1 tag
const heroPath = path.join(process.cwd(), "components", "HeroSection.tsx")
const heroContent = readFileSafely(heroPath)
const h1Match = heroContent.match(/<h1[^>]*>(.*?)<\/h1>/s)

if (h1Match && h1Match[1]) {
  const h1Content = h1Match[1].replace(/<[^>]*>/g, "").trim()
  console.log(`🏷️ H1 tag: "${h1Content}" ${h1Content.includes("Garage Door Repair South Florida") ? "✅" : "❌"}`)
} else {
  console.log("❌ H1 tag not found")
}

// Check JSON-LD schemas
const localBusinessPath = path.join(process.cwd(), "components", "LocalBusinessSchema.tsx")
const faqPath = path.join(process.cwd(), "components", "FAQ.tsx")

console.log(`🔍 LocalBusiness schema: ${fs.existsSync(localBusinessPath) ? "✅" : "❌"}`)
console.log(`🔍 FAQ schema: ${fs.existsSync(faqPath) ? "✅" : "❌"}`)

// Check robots.txt and sitemap.xml
const robotsPath = path.join(process.cwd(), "public", "robots.txt")
const sitemapConfigPath = path.join(process.cwd(), "next-sitemap.config.js")

console.log(`🤖 robots.txt: ${fs.existsSync(robotsPath) ? "✅" : "❌"}`)
console.log(`🗺️ sitemap configuration: ${fs.existsSync(sitemapConfigPath) ? "✅" : "❌"}`)

// Check GTM setup
const gtmPath = path.join(process.cwd(), "lib", "gtm.ts")
const gtmContent = readFileSafely(gtmPath)

console.log(`📊 GTM configuration: ${fs.existsSync(gtmPath) ? "✅" : "❌"}`)
console.log(`📊 GTM pageview tracking: ${gtmContent.includes("pageview") ? "✅" : "❌"}`)
console.log(`📊 GTM form conversion tracking: ${gtmContent.includes("formSubmission") ? "✅" : "❌"}`)

// Check third-party tools
const gtmContainerPath = path.join(process.cwd(), "components", "GTMContainer.tsx")
const gtmContainerContent = readFileSafely(gtmContainerPath)

console.log(`📞 CallRail integration: ${gtmContainerContent.includes("CallRail") ? "✅" : "❌"}`)
console.log(`🛡️ ClickCease integration: ${gtmContainerContent.includes("ClickCease") ? "✅" : "❌"}`)
console.log(`📈 Clarity integration: ${gtmContainerContent.includes("clarity") ? "✅" : "❌"}`)

console.log("\n✅ SEO Checklist completed!")
