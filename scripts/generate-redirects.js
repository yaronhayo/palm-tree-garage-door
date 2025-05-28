/**
 * This script helps generate redirect mappings from an old site to a new site
 * It can be used to analyze access logs or sitemap files to create redirect rules
 */

const fs = require("fs")
const path = require("path")
const readline = require("readline")

// Configuration
const OLD_SITE_URL = "https://old-domain.com"
const NEW_SITE_URL = "https://palmtreegaragedoor.com"
const ACCESS_LOG_PATH = "./old-site-access.log" // Path to your access log file
const OUTPUT_PATH = "./redirects-mapping.js"

// URL mapping rules - customize based on your old site structure
const urlMappings = [
  // Basic page mappings
  { from: "/index.html", to: "/" },
  { from: "/home.html", to: "/" },
  { from: "/services.html", to: "/services/garage-door-repair" },
  { from: "/contact.html", to: "/#contact" },
  { from: "/about.html", to: "/#about" },
  { from: "/testimonials.html", to: "/testimonials" },
  { from: "/faq.html", to: "/faq" },

  // Pattern-based mappings (using regex)
  {
    pattern: /^\/service\/(.+)\.html$/,
    transform: (matches) => `/services/${matches[1].replace(/\s+/g, "-").toLowerCase()}`,
  },
  {
    pattern: /^\/location\/(.+)\/(.+)\.html$/,
    transform: (matches) =>
      `/service-areas/${matches[2].replace(/\s+/g, "-").toLowerCase()}-${matches[1].toLowerCase()}`,
  },
  {
    pattern: /^\/blog\/(\d{4})\/(\d{2})\/(.+)\.html$/,
    transform: (matches) => `/blog/${matches[3].replace(/\s+/g, "-").toLowerCase()}`,
  },
]

// Function to process access logs and extract 404 URLs
async function processAccessLogs() {
  if (!fs.existsSync(ACCESS_LOG_PATH)) {
    console.log(`Access log file not found at ${ACCESS_LOG_PATH}`)
    return []
  }

  const fileStream = fs.createReadStream(ACCESS_LOG_PATH)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Number.POSITIVE_INFINITY,
  })

  const notFoundUrls = new Set()

  // Regular expression to match 404 status codes in access logs
  const notFoundRegex = /GET\s+([^\s]+)\s+HTTP\/\d\.\d"\s+404/

  for await (const line of rl) {
    const match = line.match(notFoundRegex)
    if (match && match[1]) {
      notFoundUrls.add(match[1])
    }
  }

  return Array.from(notFoundUrls)
}

// Function to generate redirect mapping
async function generateRedirectMapping() {
  // Get 404 URLs from access logs
  const notFoundUrls = await processAccessLogs()

  // Create redirect mapping
  const redirects = []

  // Process each 404 URL
  notFoundUrls.forEach((url) => {
    // Check for direct mappings
    const directMapping = urlMappings.find((mapping) => mapping.from === url)
    if (directMapping) {
      redirects.push({
        source: url,
        destination: directMapping.to,
        permanent: true,
      })
      return
    }

    // Check for pattern-based mappings
    for (const mapping of urlMappings) {
      if (mapping.pattern) {
        const matches = url.match(mapping.pattern)
        if (matches) {
          redirects.push({
            source: url,
            destination: mapping.transform(matches),
            permanent: true,
          })
          return
        }
      }
    }

    // Default to homepage if no mapping found
    redirects.push({
      source: url,
      destination: "/",
      permanent: true,
    })
  })

  // Write to output file
  const output = `
// Generated redirect mappings
module.exports = ${JSON.stringify(redirects, null, 2)};
`

  fs.writeFileSync(OUTPUT_PATH, output)
  console.log(`Generated ${redirects.length} redirect mappings to ${OUTPUT_PATH}`)
}

// Run the script
generateRedirectMapping().catch(console.error)
