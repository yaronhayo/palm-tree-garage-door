/**
 * Integration Analysis Script
 *
 * This script analyzes the codebase to identify:
 * 1. Unused environment variables
 * 2. Unused integrations
 * 3. Potential security issues with API keys
 */

const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")

// Load environment variables from .env.example
let envExample = {}
try {
  envExample = dotenv.parse(fs.readFileSync(".env.example"))
} catch (error) {
  console.warn("Warning: .env.example not found. Using environment variables from process.env")
  envExample = process.env
}

const envVars = Object.keys(envExample)

// Define directories to scan
const dirsToScan = ["app", "components", "lib", "hooks", "utils", "data", "types"]

// Define known integrations and their related environment variables
const knownIntegrations = {
  Supabase: [
    "SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_JWT_SECRET",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_ANON_KEY",
  ],
  PostgreSQL: [
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "POSTGRES_URL_NON_POOLING",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
    "POSTGRES_DATABASE",
    "POSTGRES_HOST",
  ],
  Cloudinary: [
    "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
  ],
  reCAPTCHA: ["RECAPTCHA_SITE_KEY", "RECAPTCHA_SECRET_KEY"], // Removed NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  "Google Tag Manager": ["NEXT_PUBLIC_GTM_ID", "GTM_ID"],
  CallRail: ["NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID", "CALLRAIL_API_KEY"],
  Resend: ["RESEND_API_KEY"],
}

// Track usage of each environment variable
const envUsage = {}
envVars.forEach((variable) => {
  envUsage[variable] = {
    used: false,
    files: [],
    integration: Object.keys(knownIntegrations).find((integration) =>
      knownIntegrations[integration].includes(variable),
    ),
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

  // Check for integration package imports
  const packageImports = {
    Supabase: ["@supabase/supabase-js", "createClient", "supabase"],
    PostgreSQL: ["pg", "postgres", "@prisma/client"],
    Cloudinary: ["cloudinary", "cloudinary-react"],
    reCAPTCHA: ["react-google-recaptcha", "grecaptcha"],
    CallRail: ["callrail", "CallTrk"],
    Resend: ["resend", "@resend/node"],
  }

  Object.entries(packageImports).forEach(([integration, keywords]) => {
    keywords.forEach((keyword) => {
      if (content.includes(keyword)) {
        // Mark all related env vars as potentially used
        const relatedVars = knownIntegrations[integration] || []
        relatedVars.forEach((variable) => {
          if (envUsage[variable]) {
            envUsage[variable].potentiallyUsed = true
            envUsage[variable].potentialFiles = envUsage[variable].potentialFiles || []
            if (!envUsage[variable].potentialFiles.includes(filePath)) {
              envUsage[variable].potentialFiles.push(filePath)
            }
          }
        })
      }
    })
  })
}

// Function to recursively scan directories
function scanDir(dir) {
  if (!fs.existsSync(dir)) return

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

// Analyze integration usage
const integrationUsage = {}
Object.keys(knownIntegrations).forEach((integration) => {
  const variables = knownIntegrations[integration]
  const usedVars = variables.filter((v) => envUsage[v] && envUsage[v].used)
  const potentiallyUsedVars = variables.filter((v) => envUsage[v] && envUsage[v].potentiallyUsed)

  integrationUsage[integration] = {
    totalVars: variables.length,
    usedVars: usedVars.length,
    potentiallyUsedVars: potentiallyUsedVars.length,
    used: usedVars.length > 0,
    potentiallyUsed: potentiallyUsedVars.length > 0,
    variables: variables.map((v) => ({
      name: v,
      used: envUsage[v] ? envUsage[v].used : false,
      potentiallyUsed: envUsage[v] ? envUsage[v].potentiallyUsed : false,
    })),
  }
})

// Output results
console.log("Integration and Environment Variable Analysis")
console.log("=============================================")

// Integration summary
console.log("\nIntegration Usage Summary:")
console.log("-------------------------")
Object.entries(integrationUsage).forEach(([integration, usage]) => {
  const status = usage.used ? "✅ USED" : usage.potentiallyUsed ? "⚠️ POTENTIALLY USED" : "❌ UNUSED"

  console.log(`${integration}: ${status} (${usage.usedVars}/${usage.totalVars} vars directly used)`)
})

// Unused variables
const unusedVars = envVars.filter((v) => !envUsage[v].used)
const potentiallyUsedVars = envVars.filter((v) => !envUsage[v].used && envUsage[v].potentiallyUsed)
const definitelyUnusedVars = unusedVars.filter((v) => !envUsage[v].potentiallyUsed)

console.log("\nUnused Environment Variables:")
console.log("----------------------------")
if (unusedVars.length === 0) {
  console.log("All environment variables are being used.")
} else {
  console.log(
    `Found ${unusedVars.length} unused variables (${potentiallyUsedVars.length} potentially used, ${definitelyUnusedVars.length} definitely unused)`,
  )

  if (definitelyUnusedVars.length > 0) {
    console.log("\nDefinitely Unused Variables:")
    definitelyUnusedVars.forEach((variable) => {
      const integration = envUsage[variable].integration || "Unknown"
      console.log(`- ${variable} (${integration})`)
    })
  }

  if (potentiallyUsedVars.length > 0) {
    console.log("\nPotentially Used Variables (integration detected but no direct usage):")
    potentiallyUsedVars.forEach((variable) => {
      const integration = envUsage[variable].integration || "Unknown"
      console.log(`- ${variable} (${integration})`)
    })
  }
}

// Used variables
const usedVars = envVars.filter((v) => envUsage[v].used)
console.log("\nUsed Environment Variables:")
console.log("--------------------------")
usedVars.sort((a, b) => (envUsage[b].files?.length || 0) - (envUsage[a].files?.length || 0))
usedVars.forEach((variable) => {
  const fileCount = envUsage[variable].files?.length || 0
  const integration = envUsage[variable].integration || "Unknown"
  console.log(`- ${variable} (${integration}, used in ${fileCount} files)`)
})

// Generate recommendations
console.log("\nRecommendations:")
console.log("---------------")

// Definitely unused integrations
const unusedIntegrations = Object.entries(integrationUsage)
  .filter(([_, usage]) => !usage.used && !usage.potentiallyUsed)
  .map(([name]) => name)

if (unusedIntegrations.length > 0) {
  console.log("\n1. Remove these unused integrations:")
  unusedIntegrations.forEach((integration) => {
    console.log(`   - ${integration} (all ${knownIntegrations[integration].length} variables unused)`)
  })
}

// Potentially used integrations that need verification
const potentialIntegrations = Object.entries(integrationUsage)
  .filter(([_, usage]) => !usage.used && usage.potentiallyUsed)
  .map(([name]) => name)

if (potentialIntegrations.length > 0) {
  console.log("\n2. Verify these potentially used integrations:")
  potentialIntegrations.forEach((integration) => {
    console.log(`   - ${integration} (integration detected but variables not directly used)`)
  })
}

// Generate cleanup script
console.log("\nCleanup Instructions:")
console.log("-------------------")
console.log("Add these instructions to your README or documentation:")
console.log("\n```")
console.log("# Environment Variable Cleanup")
console.log("\n## Variables to Remove")
console.log("Remove these unused environment variables from your .env file and Vercel project:")
console.log("")

definitelyUnusedVars.forEach((variable) => {
  console.log(`- ${variable}`)
})

console.log("\n## Variables to Verify")
console.log("Verify if these variables are actually needed:")
console.log("")

potentiallyUsedVars.forEach((variable) => {
  console.log(`- ${variable}`)
})

console.log("```")

// Save results to a file
const report = {
  integrationUsage,
  envUsage,
  unusedVars,
  potentiallyUsedVars,
  definitelyUnusedVars,
  usedVars,
  unusedIntegrations,
  potentialIntegrations,
}

fs.writeFileSync("integration-analysis.json", JSON.stringify(report, null, 2))
console.log("\nDetailed report saved to integration-analysis.json")
