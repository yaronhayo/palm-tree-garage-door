const fetch = require("node-fetch")
const fs = require("fs")
const path = require("path")

// Load the schema from our schema.ts file
// Note: This is a simplified version that works with CommonJS
// In a real implementation, you might need to transpile the TypeScript file first
const schemaPath = path.join(__dirname, "../lib/schema.js")
const { generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } = require(schemaPath)

// Mock data for testing
const mockServiceAreas = [
  { name: "Fort Lauderdale", slug: "fort-lauderdale" },
  { name: "Miami", slug: "miami" },
  { name: "Boca Raton", slug: "boca-raton" },
]

const mockFAQs = [
  {
    question: "How much does garage door repair cost?",
    answer: "Garage door repair costs vary depending on the issue. Basic service calls start at $89.",
  },
  {
    question: "How long does it take to repair a garage door?",
    answer: "Most garage door repairs can be completed in 1-2 hours.",
  },
]

async function validateSchema(schema) {
  try {
    const response = await fetch("https://validator.schema.org/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schema: JSON.stringify(schema) }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error validating schema:", error)
    return { valid: false, error: error.message }
  }
}

async function main() {
  console.log("Validating LocalBusiness schema...")
  const localBusinessSchema = generateLocalBusinessSchema(mockServiceAreas)
  const localBusinessResult = await validateSchema(localBusinessSchema)

  console.log("Validating Service schema...")
  const serviceSchema = generateServiceSchema(
    "Garage Door Repair",
    "Professional garage door repair services.",
    "89.00",
    "https://example.com/image.jpg",
    mockServiceAreas,
  )
  const serviceResult = await validateSchema(serviceSchema)

  console.log("Validating FAQ schema...")
  const faqSchema = generateFAQSchema(mockFAQs)
  const faqResult = await validateSchema(faqSchema)

  console.log("\n--- Validation Results ---")
  console.log("LocalBusiness Schema:", localBusinessResult.valid ? "Valid ✅" : "Invalid ❌")
  if (!localBusinessResult.valid) console.log(localBusinessResult.errors)

  console.log("Service Schema:", serviceResult.valid ? "Valid ✅" : "Invalid ❌")
  if (!serviceResult.valid) console.log(serviceResult.errors)

  console.log("FAQ Schema:", faqResult.valid ? "Valid ✅" : "Invalid ❌")
  if (!faqResult.valid) console.log(faqResult.errors)
}

main()
