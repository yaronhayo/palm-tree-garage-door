/**
 * This script checks for unused environment variables by scanning the codebase
 * and comparing against the variables defined in .env.example
 */

const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")

// Load environment variables from .env.example
const envExample = dotenv.parse(fs.readFileSync(".env.example"))
const envVars = Object.keys(envExample)

// Define directories to scan
const dirsToScan = ["app", "components", "lib", "hooks", "utils"]

// Track usage of each environment variable
const envUsage = {}
envVars.forEach((variable) => {
  envUsage[variable] = {
    used: false,
    files: [],
  }
})

// Function to scan a file for environment variable usage
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")

  envVars.forEach((variable) => {
    // Check for various ways the env var might be used
    const patterns = [`process.env.${variable}`, `env.${variable}`, `"${variable}"`, `'${variable}'`, `\`${variable}\``]

    for (const pattern of patterns) {
      if (content.includes(pattern)) {
        envUsage[variable].used = true
        envUsage[variable].files.push(filePath)
        break
      }
    }
  })
}

// Function to recursively scan directories
function scanDir(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      scanDir(filePath)
    } else if (
      stats.isFile() &&
      (filePath.endsWith(".js") || filePath.endsWith(".jsx") || filePath.endsWith(".ts") || filePath.endsWith(".tsx"))
    ) {
      scanFile(filePath)
    }
  })
}

// Scan all directories
dirsToScan.forEach((dir) => {
  if (fs.existsSync(dir)) {
    scanDir(dir)
  }
})

// Output results
console.log("Environment Variable Usage Analysis:")
console.log("====================================")

const unusedVars = []
const usedVars = []

for (const [variable, usage] of Object.entries(envUsage)) {
  if (!usage.used) {
    unusedVars.push(variable)
  } else {
    usedVars.push({
      variable,
      fileCount: usage.files.length,
      files: usage.files,
    })
  }
}

console.log("\nUnused Environment Variables:")
console.log("-----------------------------")
if (unusedVars.length === 0) {
  console.log("All environment variables are being used.")
} else {
  unusedVars.forEach((variable) => {
    console.log(`- ${variable}`)
  })
}

console.log("\nUsed Environment Variables:")
console.log("---------------------------")
usedVars.sort((a, b) => b.fileCount - a.fileCount)
usedVars.forEach(({ variable, fileCount, files }) => {
  console.log(`- ${variable} (used in ${fileCount} files)`)
  // Uncomment to see detailed file list
  // console.log('  Files:');
  // files.forEach(file => console.log(`  - ${file}`));
})
