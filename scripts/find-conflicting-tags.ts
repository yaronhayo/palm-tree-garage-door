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
}

function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

// Conflicting tag IDs to search for
const conflictingTags = ["AW-11551227485", "G-LP2GQ10MTJ", "GTM-WPZNV4T3"]

function searchInFile(filePath: string, content: string): string[] {
  const foundTags: string[] = []

  conflictingTags.forEach((tag) => {
    if (content.includes(tag)) {
      foundTags.push(tag)
    }
  })

  return foundTags
}

function searchDirectory(
  dir: string,
  results: { file: string; tags: string[] }[] = [],
): { file: string; tags: string[] }[] {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (!["node_modules", ".next", ".git", "dist", "build"].includes(file)) {
        searchDirectory(filePath, results)
      }
    } else if (stat.isFile()) {
      // Only search in relevant file types
      const ext = path.extname(file).toLowerCase()
      if ([".tsx", ".ts", ".js", ".jsx", ".html", ".md"].includes(ext)) {
        try {
          const content = fs.readFileSync(filePath, "utf8")
          const foundTags = searchInFile(filePath, content)

          if (foundTags.length > 0) {
            results.push({
              file: filePath,
              tags: foundTags,
            })
          }
        } catch (error) {
          // Skip files that can't be read
        }
      }
    }
  })

  return results
}

export function findConflictingTags() {
  log("\n🔍 Searching for conflicting Google tags...\n", "cyan")

  const projectRoot = process.cwd()
  const results = searchDirectory(projectRoot)

  if (results.length === 0) {
    log("✅ No conflicting tags found in the codebase!", "green")
    log("The following tags are NOT present:", "green")
    conflictingTags.forEach((tag) => {
      log(`  ❌ ${tag}`, "green")
    })
  } else {
    log("⚠️  Found conflicting tags in the following files:", "yellow")
    results.forEach(({ file, tags }) => {
      log(`\n📁 ${file}`, "blue")
      tags.forEach((tag) => {
        log(`  🏷️  ${tag}`, "red")
      })
    })

    log("\n🔧 Action required:", "yellow")
    log("Remove the conflicting tags from the files listed above.", "yellow")
    log("Only GTM-MF948JFL should be present on your website.", "yellow")
  }

  log("\n✅ Correct tag that should be present:", "green")
  log("  🏷️  GTM-MF948JFL", "green")

  return results
}

// Run the search if this file is executed directly
if (require.main === module) {
  findConflictingTags()
}
