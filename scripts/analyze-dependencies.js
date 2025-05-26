/**
 * Dependency Analysis Script
 *
 * This script checks for unused dependencies in package.json
 */

const fs = require("fs")
const path = require("path")

// Read package.json
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
const dependencies = Object.keys(packageJson.dependencies || {})
const devDependencies = Object.keys(packageJson.devDependencies || {})

// Track dependency usage
const depUsage = new Map()

// Initialize all dependencies as unused
;[...dependencies, ...devDependencies].forEach((dep) => {
  depUsage.set(dep, { used: false, files: [], isDev: devDependencies.includes(dep) })
})

// Directories to scan
const dirsToScan = ["app", "components", "lib", "hooks", "data", "types", "scripts"]

// Function to scan file for dependency usage
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")

  depUsage.forEach((usage, dep) => {
    // Check for various import patterns
    const patterns = [
      new RegExp(`from ['"]${dep}['"]`),
      new RegExp(`from ['"]${dep}/`),
      new RegExp(`require\$$['"]${dep}['"]\$$`),
      new RegExp(`require\\(['"]${dep}/`),
    ]

    for (const pattern of patterns) {
      if (pattern.test(content)) {
        usage.used = true
        usage.files.push(filePath)
        break
      }
    }
  })
}

// Scan directories
function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return

  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      scanDirectory(filePath)
    } else if (
      stats.isFile() &&
      (filePath.endsWith(".js") || filePath.endsWith(".jsx") || filePath.endsWith(".ts") || filePath.endsWith(".tsx"))
    ) {
      scanFile(filePath)
    }
  })
}

// Scan all directories
console.log("Scanning for dependency usage...")
dirsToScan.forEach((dir) => scanDirectory(dir))

// Special cases - dependencies used in config files
const configDeps = {
  tailwindcss: ["tailwind.config.ts"],
  typescript: ["tsconfig.json"],
  eslint: [".eslintrc.js"],
  next: ["next.config.mjs"],
  "@types/node": ["TypeScript types"],
  "@types/react": ["TypeScript types"],
  "@types/react-dom": ["TypeScript types"],
}

Object.entries(configDeps).forEach(([dep, files]) => {
  if (depUsage.has(dep)) {
    depUsage.get(dep).used = true
    depUsage.get(dep).files = files
  }
})

// Analyze results
console.log("\n=== Dependency Analysis Report ===\n")

const unusedDeps = []
const usedDeps = []

depUsage.forEach((usage, dep) => {
  if (usage.used) {
    usedDeps.push({ dep, ...usage })
  } else {
    unusedDeps.push({ dep, ...usage })
  }
})

console.log("Unused Dependencies:")
console.log("-------------------")
if (unusedDeps.length === 0) {
  console.log("All dependencies are being used.")
} else {
  unusedDeps.forEach(({ dep, isDev }) => {
    console.log(`- ${dep} (${isDev ? "dev" : "prod"})`)
  })
}

console.log("\n\nRecommendations:")
console.log("---------------")
if (unusedDeps.length > 0) {
  const prodDeps = unusedDeps.filter((d) => !d.isDev).map((d) => d.dep)
  const devDeps = unusedDeps.filter((d) => d.isDev).map((d) => d.dep)

  if (prodDeps.length > 0) {
    console.log("\nRemove production dependencies:")
    console.log(`npm uninstall ${prodDeps.join(" ")}`)
  }

  if (devDeps.length > 0) {
    console.log("\nRemove dev dependencies:")
    console.log(`npm uninstall -D ${devDeps.join(" ")}`)
  }
}

// Save report
fs.writeFileSync(
  "dependency-analysis.json",
  JSON.stringify(
    {
      unused: unusedDeps,
      used: usedDeps,
    },
    null,
    2,
  ),
)

console.log("\nDetailed report saved to dependency-analysis.json")
