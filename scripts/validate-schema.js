/**
 * Schema Validation Script
 *
 * This script validates the schema markup on the website by:
 * 1. Fetching the HTML of each page
 * 2. Extracting all JSON-LD scripts
 * 3. Validating the schema against Schema.org standards
 * 4. Reporting any errors or warnings
 *
 * Usage: node scripts/validate-schema.js
 */

const https = require("https")
const { parse } = require("node-html-parser")
const { URL } = require("url")

// List of pages to validate
const pages = ["/", "/services", "/testimonials", "/contact", "/about", "/thank-you"]

// Base URL of the website
const baseUrl = process.env.SITE_URL || "https://palmtreegaragedoor.com"

// Function to fetch HTML content
async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = ""
        res.on("data", (chunk) => {
          data += chunk
        })
        res.on("end", () => {
          resolve(data)
        })
      })
      .on("error", (err) => {
        reject(err)
      })
  })
}

// Function to extract JSON-LD from HTML
function extractJsonLd(html) {
  const root = parse(html)
  const scripts = root.querySelectorAll('script[type="application/ld+json"]')

  return scripts
    .map((script) => {
      try {
        return JSON.parse(script.text)
      } catch (e) {
        console.error("Error parsing JSON-LD:", e)
        return null
      }
    })
    .filter(Boolean)
}

// Function to validate schema
async function validateSchema(schema) {
  return new Promise((resolve, reject) => {
    const schemaString = JSON.stringify(schema)
    const options = {
      hostname: "validator.schema.org",
      path: "/validate",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(schemaString),
      },
    }

    const req = https.request(options, (res) => {
      let data = ""
      res.on("data", (chunk) => {
        data += chunk
      })
      res.on("end", () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(e)
        }
      })
    })

    req.on("error", (e) => {
      reject(e)
    })

    req.write(schemaString)
    req.end()
  })
}

// Main function
async function validateAllPages() {
  console.log("Starting schema validation...")

  for (const page of pages) {
    const url = new URL(page, baseUrl).toString()
    console.log(`\nValidating ${url}`)

    try {
      const html = await fetchHtml(url)
      const schemas = extractJsonLd(html)

      console.log(`Found ${schemas.length} schema(s)`)

      for (let i = 0; i < schemas.length; i++) {
        const schema = schemas[i]
        console.log(`\nSchema #${i + 1} - Type: ${schema["@type"]}`)

        try {
          const result = await validateSchema(schema)

          if (result.errors && result.errors.length > 0) {
            console.error("❌ Validation errors:")
            result.errors.forEach((error) => {
              console.error(`  - ${error.message}`)
            })
          } else {
            console.log("✅ Schema is valid")
          }

          if (result.warnings && result.warnings.length > 0) {
            console.warn("⚠️ Validation warnings:")
            result.warnings.forEach((warning) => {
              console.warn(`  - ${warning.message}`)
            })
          }
        } catch (e) {
          console.error("Error validating schema:", e)
        }
      }
    } catch (e) {
      console.error(`Error processing ${url}:`, e)
    }
  }

  console.log("\nSchema validation complete")
}

// Run the validation
validateAllPages().catch(console.error)
