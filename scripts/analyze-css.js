/**
 * CSS Analysis Script
 *
 * Analyzes CSS usage and finds unused styles
 */

const fs = require("fs")
const path = require("path")

// Track CSS classes
const definedClasses = new Set()
const usedClasses = new Set()

// Extract CSS classes from globals.css
function extractCSSClasses(cssContent) {
  // Match class selectors
  const classRegex = /\.([a-zA-Z0-9_-]+)/g
  let match

  while ((match = classRegex.exec(cssContent)) !== null) {
    definedClasses.add(match[1])
  }
}

// Extract used classes from JSX/TSX files
function extractUsedClasses(content) {
  // Match className attributes
  const classNameRegex = /className=["']([^"']+)["']/g
  let match

  while ((match = classNameRegex.exec(content)) !== null) {
    const classes = match[1].split(/\s+/)
    classes.forEach((cls) => {
      // Skip dynamic classes and Tailwind classes
      if (!cls.includes("{") && !cls.includes(":") && !cls.includes("[")) {
        usedClasses.add(cls)
      }
    })
  }

  // Match cn() function calls
  const cnRegex = /cn$$[^)]+$$/g
  while ((match = cnRegex.exec(content)) !== null) {
    const classMatch = match[0].match(/["']([^"']+)["']/g)
    if (classMatch) {
      classMatch.forEach((cls) => {
        const cleanClass = cls.replace(/["']/g, "").trim()
        cleanClass.split(/\s+/).forEach((c) => {
          if (!c.includes("{") && !c.includes(":") && !c.includes("[")) {
            usedClasses.add(c)
          }
        })
      })
    }
  }
}

// Read globals.css
if (fs.existsSync("app/globals.css")) {
  const cssContent = fs.readFileSync("app/globals.css", "utf8")
  extractCSSClasses(cssContent)
}

// Scan all TSX/JSX files
function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return

  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      scanDirectory(filePath)
    } else if (stats.isFile() && (filePath.endsWith(".jsx") || filePath.endsWith(".tsx"))) {
      const content = fs.readFileSync(filePath, "utf8")
      extractUsedClasses(content)
    }
  })
}
// Scan directories
;["app", "components"].forEach((dir) => scanDirectory(dir))

// Find unused classes
const unusedClasses = Array.from(definedClasses).filter((cls) => !usedClasses.has(cls))

console.log("\n=== CSS Analysis Report ===\n")
console.log("Custom CSS Classes:")
console.log("------------------")
console.log(`Total defined: ${definedClasses.size}`)
console.log(`Total used: ${usedClasses.size}`)
console.log(`Unused: ${unusedClasses.length}`)

if (unusedClasses.length > 0) {
  console.log("\nUnused CSS classes:")
  unusedClasses.forEach((cls) => {
    console.log(`- .${cls}`)
  })
}

// Save report
fs.writeFileSync(
  "css-analysis.json",
  JSON.stringify(
    {
      defined: Array.from(definedClasses),
      used: Array.from(usedClasses),
      unused: unusedClasses,
    },
    null,
    2,
  ),
)

console.log("\nDetailed report saved to css-analysis.json")
