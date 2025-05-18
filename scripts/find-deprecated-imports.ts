import * as fs from "fs"
import * as path from "path"
import * as glob from "glob"

// Files marked for deprecation
const deprecatedFiles = [
  "lib/analytics.ts",
  "lib/image-optimization.ts",
  "lib/image-helpers.ts",
  "components/GTMContainer.tsx",
  "components/SEO.tsx",
  "components/ImageTest.tsx",
  "components/ImageDebug.tsx",
  "components/TestImage.tsx",
]

// Function to search for imports in a file
function findImportsInFile(filePath: string, searchTerms: string[]): string[] {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const lines = content.split("\n")
    const matches: string[] = []

    for (const line of lines) {
      for (const term of searchTerms) {
        // Check for import statements
        if (line.includes(`import`) && line.includes(term.replace(/\.(ts|tsx)$/, ""))) {
          matches.push(`${filePath}: ${line.trim()}`)
          break
        }
      }
    }

    return matches
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return []
  }
}

// Main function
async function main() {
  // Get all TypeScript files
  const files = glob.sync("**/*.{ts,tsx}", {
    ignore: ["node_modules/**", "scripts/**", ".next/**", "out/**"],
  })

  // Search terms (file paths without extension)
  const searchTerms = deprecatedFiles.map((file) => {
    const parsed = path.parse(file)
    return path.join(parsed.dir, parsed.name)
  })

  // Find imports
  let totalMatches = 0
  const allMatches: Record<string, string[]> = {}

  for (const file of files) {
    const matches = findImportsInFile(file, searchTerms)
    if (matches.length > 0) {
      allMatches[file] = matches
      totalMatches += matches.length
    }
  }

  // Print results
  console.log(`Found ${totalMatches} imports of deprecated files:`)
  for (const [file, matches] of Object.entries(allMatches)) {
    console.log(`\n${file}:`)
    for (const match of matches) {
      console.log(`  ${match.split(": ")[1]}`)
    }
  }
}

main().catch(console.error)
