import fs from "fs"
import path from "path"

// ANSI color codes
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
}

function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Define tracking patterns to search for
const trackingPatterns = {
  // Google services
  googleAnalytics: [
    /G-[A-Z0-9]{10}/g, // GA4 measurement IDs
    /UA-[0-9]+-[0-9]+/g, // Universal Analytics
    /google-analytics\.com/g,
    /analytics\.google\.com/g,
    /gtag\(/g,
  ],
  googleTagManager: [
    /GTM-[A-Z0-9]+/g, // GTM container IDs
    /googletagmanager\.com/g,
    /dataLayer/g,
  ],
  googleAds: [
    /AW-[0-9]+/g, // Google Ads conversion IDs
    /googleadservices\.com/g,
    /googlesyndication\.com/g,
  ],
  // Facebook/Meta
  facebook: [
    /fbq\(/g, // Facebook Pixel
    /facebook\.net/g,
    /connect\.facebook\.net/g,
    /_fbp/g, // Facebook pixel cookie
  ],
  // Other tracking services
  hotjar: [/hotjar/gi, /hj\(/g],
  mixpanel: [/mixpanel/gi],
  amplitude: [/amplitude/gi],
  segment: [/segment/gi, /analytics\.js/g],
  intercom: [/intercom/gi],
  zendesk: [/zendesk/gi],
  drift: [/drift/gi],
  hubspot: [/hubspot/gi, /hs-analytics/gi],
  mailchimp: [/mailchimp/gi, /mc\.us/g],
  klaviyo: [/klaviyo/gi],
  // Performance monitoring
  sentry: [/sentry/gi],
  bugsnag: [/bugsnag/gi],
  rollbar: [/rollbar/gi],
  // Analytics alternatives
  plausible: [/plausible/gi],
  fathom: [/fathom/gi],
  simpleAnalytics: [/simpleanalytics/gi],
  // Vercel specific
  vercelAnalytics: [/vercel.*analytics/gi, /@vercel\/analytics/g],
  vercelSpeedInsights: [/vercel.*speed/gi, /@vercel\/speed-insights/g],
  // CallRail
  callrail: [/callrail/gi, /calltrk/gi],
  // reCAPTCHA
  recaptcha: [/recaptcha/gi, /google\.com\/recaptcha/g],
  // Cloudinary
  cloudinary: [/cloudinary/gi, /res\.cloudinary\.com/g],
}

interface TrackingResult {
  file: string
  service: string
  matches: string[]
  isDirectImplementation: boolean
}

function searchInFile(filePath: string, content: string): TrackingResult[] {
  const results: TrackingResult[] = []
  const relativePath = path.relative(process.cwd(), filePath)

  // Determine if this is a direct implementation or GTM-related
  const isGTMFile = filePath.includes("GoogleTagManager") || filePath.includes("gtm")
  const isLayoutFile = filePath.includes("layout.tsx")

  for (const [service, patterns] of Object.entries(trackingPatterns)) {
    const allMatches: string[] = []

    patterns.forEach((pattern) => {
      const matches = content.match(pattern)
      if (matches) {
        allMatches.push(...matches)
      }
    })

    if (allMatches.length > 0) {
      // Remove duplicates
      const uniqueMatches = [...new Set(allMatches)]

      results.push({
        file: relativePath,
        service,
        matches: uniqueMatches,
        isDirectImplementation: !isGTMFile && (isLayoutFile || filePath.includes("components/")),
      })
    }
  }

  return results
}

function searchDirectory(dir: string, results: TrackingResult[] = []): TrackingResult[] {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Skip certain directories
      if (!["node_modules", ".next", ".git", "dist", "build", "public/images"].includes(file)) {
        searchDirectory(filePath, results)
      }
    } else if (stat.isFile()) {
      // Search in relevant file types
      const ext = path.extname(file).toLowerCase()
      if ([".tsx", ".ts", ".js", ".jsx", ".html", ".md", ".json"].includes(ext)) {
        try {
          const content = fs.readFileSync(filePath, "utf8")
          const fileResults = searchInFile(filePath, content)
          results.push(...fileResults)
        } catch (error) {
          // Skip files that can't be read
        }
      }
    }
  })

  return results
}

export function auditTrackingScripts() {
  log("\n🔍 TRACKING SCRIPTS AUDIT", "cyan")
  log("=" * 50, "cyan")

  const projectRoot = process.cwd()
  const results = searchDirectory(projectRoot)

  // Group results by service
  const serviceGroups: { [key: string]: TrackingResult[] } = {}
  results.forEach((result) => {
    if (!serviceGroups[result.service]) {
      serviceGroups[result.service] = []
    }
    serviceGroups[result.service].push(result)
  })

  // Separate direct implementations from GTM implementations
  const directImplementations: { [key: string]: TrackingResult[] } = {}
  const gtmImplementations: { [key: string]: TrackingResult[] } = {}

  Object.entries(serviceGroups).forEach(([service, serviceResults]) => {
    directImplementations[service] = serviceResults.filter((r) => r.isDirectImplementation)
    gtmImplementations[service] = serviceResults.filter((r) => !r.isDirectImplementation)
  })

  // Display results
  log("\n📊 DIRECT IMPLEMENTATIONS (Hardcoded in site)", "green")
  log("-" * 50, "green")

  let hasDirectImplementations = false
  Object.entries(directImplementations).forEach(([service, serviceResults]) => {
    if (serviceResults.length > 0) {
      hasDirectImplementations = true
      log(`\n🏷️  ${service.toUpperCase()}`, "yellow")
      serviceResults.forEach((result) => {
        log(`   📁 ${result.file}`, "blue")
        result.matches.forEach((match) => {
          log(`      🔗 ${match}`, "cyan")
        })
      })
    }
  })

  if (!hasDirectImplementations) {
    log("   ✅ No direct tracking implementations found", "green")
  }

  log("\n📊 GTM/INDIRECT IMPLEMENTATIONS", "magenta")
  log("-" * 50, "magenta")

  let hasGTMImplementations = false
  Object.entries(gtmImplementations).forEach(([service, serviceResults]) => {
    if (serviceResults.length > 0) {
      hasGTMImplementations = true
      log(`\n🏷️  ${service.toUpperCase()}`, "yellow")
      serviceResults.forEach((result) => {
        log(`   📁 ${result.file}`, "blue")
        result.matches.forEach((match) => {
          log(`      🔗 ${match}`, "cyan")
        })
      })
    }
  })

  if (!hasGTMImplementations) {
    log("   ✅ No GTM-related tracking found in code", "magenta")
  }

  // Summary
  log("\n📋 SUMMARY", "cyan")
  log("-" * 50, "cyan")

  const allServices = new Set([
    ...Object.keys(directImplementations).filter((s) => directImplementations[s].length > 0),
    ...Object.keys(gtmImplementations).filter((s) => gtmImplementations[s].length > 0),
  ])

  if (allServices.size === 0) {
    log("   ✅ No tracking scripts detected", "green")
  } else {
    log(`   📊 Total services detected: ${allServices.size}`, "yellow")
    allServices.forEach((service) => {
      const directCount = directImplementations[service]?.length || 0
      const gtmCount = gtmImplementations[service]?.length || 0
      log(`   🏷️  ${service}: ${directCount} direct, ${gtmCount} GTM-related`, "blue")
    })
  }

  log("\n🔧 RECOMMENDATIONS", "yellow")
  log("-" * 50, "yellow")
  log("   1. All tracking should ideally go through GTM for better management", "yellow")
  log("   2. Direct implementations should be minimal (only GTM container)", "yellow")
  log("   3. Use GTM Preview mode to see what tags are actually firing", "yellow")
  log("   4. Check GTM container for configured tags and triggers", "yellow")

  return { directImplementations, gtmImplementations, allServices: Array.from(allServices) }
}

// Run the audit if this file is executed directly
if (require.main === module) {
  auditTrackingScripts()
}
