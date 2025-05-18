/**
 * SEO Audit Script for Palm Tree Garage Door
 *
 * This script analyzes the Next.js app directory and checks for SEO best practices.
 * It generates a report of potential SEO issues and recommendations.
 */

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Configuration
const APP_DIR = path.join(process.cwd(), "app")
const COMPONENTS_DIR = path.join(process.cwd(), "components")
const OUTPUT_FILE = path.join(process.cwd(), "seo-audit-report.json")

// SEO checks
const seoChecks = {
  title: {
    check: (content) => {
      const titleMatch = content.match(/<title[^>]*>(.*?)<\/title>/s)
      if (!titleMatch) return { pass: false, message: "No title tag found" }

      const titleLength = titleMatch[1].trim().length
      if (titleLength < 30) return { pass: false, message: "Title is too short (< 30 chars)" }
      if (titleLength > 60) return { pass: false, message: "Title is too long (> 60 chars)" }

      return { pass: true, message: `Title length is good: ${titleLength} chars` }
    },
  },
  metaDescription: {
    check: (content) => {
      const metaMatch =
        content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/s) ||
        content.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/s)

      if (!metaMatch) return { pass: false, message: "No meta description found" }

      const descLength = metaMatch[1].trim().length
      if (descLength < 70) return { pass: false, message: "Meta description is too short (< 70 chars)" }
      if (descLength > 160) return { pass: false, message: "Meta description is too long (> 160 chars)" }

      return { pass: true, message: `Meta description length is good: ${descLength} chars` }
    },
  },
  h1Tag: {
    check: (content) => {
      const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/gs)

      if (!h1Match) return { pass: false, message: "No H1 tag found" }
      if (h1Match.length > 1) return { pass: false, message: `Too many H1 tags: ${h1Match.length}` }

      return { pass: true, message: "H1 tag is present and unique" }
    },
  },
  headingStructure: {
    check: (content) => {
      const h1Count = (content.match(/<h1[^>]*>/g) || []).length
      const h2Count = (content.match(/<h2[^>]*>/g) || []).length
      const h3Count = (content.match(/<h3[^>]*>/g) || []).length

      if (h1Count === 0) return { pass: false, message: "No H1 tag found" }
      if (h1Count > 1) return { pass: false, message: "Multiple H1 tags found" }
      if (h2Count === 0) return { pass: false, message: "No H2 tags found" }

      return { pass: true, message: `Heading structure: H1: ${h1Count}, H2: ${h2Count}, H3: ${h3Count}` }
    },
  },
  imageAlt: {
    check: (content) => {
      const imgTags = content.match(/<img[^>]*>/g) || []
      const imgsWithoutAlt = imgTags.filter((img) => !img.includes("alt="))

      if (imgsWithoutAlt.length > 0) {
        return {
          pass: false,
          message: `${imgsWithoutAlt.length} images without alt text out of ${imgTags.length} total images`,
        }
      }

      return { pass: true, message: `All ${imgTags.length} images have alt text` }
    },
  },
  schemaMarkup: {
    check: (content) => {
      const schemaMatch = content.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/g)

      if (!schemaMatch) return { pass: false, message: "No schema markup found" }

      return { pass: true, message: `Schema markup found: ${schemaMatch.length} instances` }
    },
  },
  canonicalUrl: {
    check: (content) => {
      const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*>/)

      if (!canonicalMatch) return { pass: false, message: "No canonical URL found" }

      return { pass: true, message: "Canonical URL is present" }
    },
  },
  mobileResponsive: {
    check: (content) => {
      const viewportMatch = content.match(/<meta[^>]*name=["']viewport["'][^>]*>/)

      if (!viewportMatch) return { pass: false, message: "No viewport meta tag found" }

      // Check for responsive classes
      const responsiveClasses = ["sm:", "md:", "lg:", "xl:", "2xl:", "flex", "grid", "container"]

      const hasResponsiveClasses = responsiveClasses.some((cls) => content.includes(cls))

      if (!hasResponsiveClasses) {
        return { pass: false, message: "No responsive design classes found" }
      }

      return { pass: true, message: "Page appears to be mobile responsive" }
    },
  },
  internalLinks: {
    check: (content) => {
      const internalLinks = content.match(/<a[^>]*href=["']\/[^"']*["'][^>]*>/g) || []

      if (internalLinks.length === 0) {
        return { pass: false, message: "No internal links found" }
      }

      return { pass: true, message: `${internalLinks.length} internal links found` }
    },
  },
  performanceIssues: {
    check: (content) => {
      const inlineStyles = content.match(/<[^>]*style=["'][^"']*["'][^>]*>/g) || []

      if (inlineStyles.length > 5) {
        return {
          pass: false,
          message: `${inlineStyles.length} inline styles found, which may impact performance`,
        }
      }

      return { pass: true, message: "No significant performance issues detected" }
    },
  },
}

// Helper functions
function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return ""
  }
}

function findFiles(dir, fileTypes, results = []) {
  if (!fs.existsSync(dir)) return results

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      findFiles(filePath, fileTypes, results)
    } else if (fileTypes.some((type) => file.endsWith(type))) {
      results.push(filePath)
    }
  }

  return results
}

// Main function
function runSEOAudit() {
  console.log("Starting SEO audit...")

  // Find all relevant files
  const pageFiles = findFiles(APP_DIR, [".tsx", ".jsx", ".js"])
  const componentFiles = findFiles(COMPONENTS_DIR, [".tsx", ".jsx", ".js"])

  const allFiles = [...pageFiles, ...componentFiles]

  console.log(`Found ${allFiles.length} files to analyze`)

  // Analyze each file
  const results = {}

  for (const file of allFiles) {
    const relativePath = path.relative(process.cwd(), file)
    const content = readFileContent(file)

    results[relativePath] = {}

    for (const [checkName, { check }] of Object.entries(seoChecks)) {
      results[relativePath][checkName] = check(content)
    }
  }

  // Generate summary
  const summary = {
    totalFiles: allFiles.length,
    passedChecks: 0,
    failedChecks: 0,
    issuesByType: {},
  }

  for (const [file, fileResults] of Object.entries(results)) {
    for (const [checkName, result] of Object.entries(fileResults)) {
      if (result.pass) {
        summary.passedChecks++
      } else {
        summary.failedChecks++

        if (!summary.issuesByType[checkName]) {
          summary.issuesByType[checkName] = []
        }

        summary.issuesByType[checkName].push({
          file,
          message: result.message,
        })
      }
    }
  }

  // Save results to file
  const report = {
    summary,
    detailedResults: results,
    generatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2))

  // Print summary to console
  console.log("\nSEO Audit Summary:")
  console.log(`Total files analyzed: ${summary.totalFiles}`)
  console.log(`Passed checks: ${summary.passedChecks}`)
  console.log(`Failed checks: ${summary.failedChecks}`)

  if (summary.failedChecks > 0) {
    console.log("\nIssues by type:")

    for (const [checkName, issues] of Object.entries(summary.issuesByType)) {
      console.log(`\n${checkName} (${issues.length} issues):`)

      for (const issue of issues.slice(0, 5)) {
        console.log(`  - ${issue.file}: ${issue.message}`)
      }

      if (issues.length > 5) {
        console.log(`  ... and ${issues.length - 5} more issues`)
      }
    }
  }

  console.log(`\nFull report saved to ${OUTPUT_FILE}`)
}

// Run the audit
runSEOAudit()
