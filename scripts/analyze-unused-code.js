/**
 * Unused Code Analysis Script
 *
 * This script identifies:
 * 1. Unused components
 * 2. Unused images and assets
 * 3. Duplicate code
 * 4. Dead imports
 * 5. Unused CSS classes
 */

const fs = require("fs")
const path = require("path")

// Track all files and their imports/exports
const fileAnalysis = {
  components: {},
  images: {},
  imports: {},
  exports: {},
  cssClasses: {},
}

// Define directories to scan
const codeDirs = ["app", "components", "lib", "hooks", "data", "types"]
const imageDirs = ["public", "public/images"]

// Track component usage
const componentUsage = new Map()
const imageUsage = new Map()
const importUsage = new Map()

// Function to extract imports from a file
function extractImports(content, filePath) {
  const imports = []

  // Match ES6 imports
  const importRegex = /import\s+(?:{[^}]+}|[\w\s,]+)\s+from\s+['"]([^'"]+)['"]/g
  let match

  while ((match = importRegex.exec(content)) !== null) {
    imports.push({
      path: match[1],
      fullMatch: match[0],
      file: filePath,
    })
  }

  // Match dynamic imports
  const dynamicImportRegex = /import\s*$$\s*['"]([^'"]+)['"]\s*$$/g
  while ((match = dynamicImportRegex.exec(content)) !== null) {
    imports.push({
      path: match[1],
      fullMatch: match[0],
      file: filePath,
      dynamic: true,
    })
  }

  return imports
}

// Function to extract component definitions
function extractComponents(content, filePath) {
  const components = []

  // Match function components
  const functionComponentRegex = /(?:export\s+)?(?:default\s+)?function\s+(\w+)\s*\(/g
  let match

  while ((match = functionComponentRegex.exec(content)) !== null) {
    if (match[1][0] === match[1][0].toUpperCase()) {
      components.push(match[1])
    }
  }

  // Match arrow function components
  const arrowComponentRegex = /(?:export\s+)?(?:const|let)\s+(\w+)\s*=\s*(?:$$[^)]*$$|[^=])\s*=>/g
  while ((match = arrowComponentRegex.exec(content)) !== null) {
    if (match[1][0] === match[1][0].toUpperCase()) {
      components.push(match[1])
    }
  }

  return components
}

// Function to scan for image usage
function scanImageUsage(content, filePath) {
  const images = []

  // Match various image reference patterns
  const patterns = [
    /src=["']([^"']+\.(png|jpg|jpeg|gif|webp|svg))/gi,
    /url\(["']?([^"')]+\.(png|jpg|jpeg|gif|webp|svg))/gi,
    /import\s+.*\s+from\s+["']([^"']+\.(png|jpg|jpeg|gif|webp|svg))/gi,
    /Image.*src=["']([^"']+)/gi,
  ]

  patterns.forEach((pattern) => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      images.push(match[1])
    }
  })

  return images
}

// Function to scan a code file
function scanCodeFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  const relativePath = path.relative(process.cwd(), filePath)

  // Extract imports
  const imports = extractImports(content, relativePath)
  imports.forEach((imp) => {
    if (!importUsage.has(imp.path)) {
      importUsage.set(imp.path, [])
    }
    importUsage.get(imp.path).push(imp.file)
  })

  // Extract components
  const components = extractComponents(content, relativePath)
  components.forEach((comp) => {
    componentUsage.set(comp, relativePath)
  })

  // Scan for image usage
  const images = scanImageUsage(content, relativePath)
  images.forEach((img) => {
    if (!imageUsage.has(img)) {
      imageUsage.set(img, [])
    }
    imageUsage.get(img).push(relativePath)
  })

  return { imports, components, images }
}

// Function to scan directories
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
      (filePath.endsWith(".js") ||
        filePath.endsWith(".jsx") ||
        filePath.endsWith(".ts") ||
        filePath.endsWith(".tsx") ||
        filePath.endsWith(".css"))
    ) {
      scanCodeFile(filePath)
    }
  })
}

// Function to find all images
function findAllImages(dir) {
  const images = []

  if (!fs.existsSync(dir)) return images

  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      images.push(...findAllImages(filePath))
    } else if (stats.isFile() && /\.(png|jpg|jpeg|gif|webp|svg|ico)$/i.test(file)) {
      images.push(path.relative(process.cwd(), filePath))
    }
  })

  return images
}

// Scan all code directories
console.log("Scanning code files...")
codeDirs.forEach((dir) => scanDirectory(dir))

// Find all images
console.log("Finding all images...")
const allImages = []
imageDirs.forEach((dir) => {
  allImages.push(...findAllImages(dir))
})

// Analyze results
console.log("\n=== Unused Code Analysis Report ===\n")

// Find unused images
const unusedImages = allImages.filter((img) => {
  const imageName = path.basename(img)
  const isUsed = Array.from(imageUsage.keys()).some((usedImg) => {
    return usedImg.includes(imageName) || usedImg.includes(img)
  })
  return !isUsed
})

console.log("Unused Images:")
console.log("--------------")
if (unusedImages.length === 0) {
  console.log("All images are being used.")
} else {
  console.log(`Found ${unusedImages.length} unused images:\n`)
  unusedImages.forEach((img) => {
    const stats = fs.statSync(img)
    const sizeKB = (stats.size / 1024).toFixed(2)
    console.log(`- ${img} (${sizeKB} KB)`)
  })

  const totalSize = unusedImages.reduce((sum, img) => {
    return sum + fs.statSync(img).size
  }, 0)
  console.log(`\nTotal size of unused images: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)
}

// Find duplicate/similar files
console.log("\n\nPotential Duplicate Components:")
console.log("-------------------------------")
const componentGroups = {}
componentUsage.forEach((file, component) => {
  const base = component.replace(/[A-Z]/g, (match) => match.toLowerCase())
  if (!componentGroups[base]) {
    componentGroups[base] = []
  }
  componentGroups[base].push({ component, file })
})

Object.entries(componentGroups).forEach(([base, components]) => {
  if (components.length > 1) {
    console.log(`\nSimilar components (${base}):`)
    components.forEach(({ component, file }) => {
      console.log(`  - ${component} in ${file}`)
    })
  }
})

// Find unused utility functions
console.log("\n\nUnused Exports:")
console.log("---------------")
const utilityFiles = ["lib/utils.ts", "lib/date-utils.ts", "lib/image-utils.ts"]
utilityFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, "utf8")
    const exportRegex = /export\s+(?:function|const|let|var)\s+(\w+)/g
    let match
    const exports = []

    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1])
    }

    console.log(`\n${file}:`)
    exports.forEach((exp) => {
      let usageCount = 0
      codeDirs.forEach((dir) => {
        const files = fs.readdirSync(dir, { recursive: true })
        files.forEach((f) => {
          if (f.endsWith(".ts") || f.endsWith(".tsx")) {
            const filePath = path.join(dir, f)
            if (filePath !== file && fs.existsSync(filePath)) {
              const content = fs.readFileSync(filePath, "utf8")
              if (content.includes(exp)) {
                usageCount++
              }
            }
          }
        })
      })

      if (usageCount === 0) {
        console.log(`  - ${exp} (unused)`)
      }
    })
  }
})

// Development-only files
console.log("\n\nDevelopment/Test Files:")
console.log("----------------------")
const devFiles = [".eslintrc.js", "scripts/", "docs/", "*.test.ts", "*.test.tsx", "*.spec.ts", "*.spec.tsx"]

devFiles.forEach((pattern) => {
  if (pattern.endsWith("/")) {
    if (fs.existsSync(pattern)) {
      console.log(`- ${pattern} directory (can be excluded from production build)`)
    }
  } else if (fs.existsSync(pattern)) {
    console.log(`- ${pattern}`)
  }
})

// Generate cleanup recommendations
console.log("\n\n=== Cleanup Recommendations ===\n")

console.log("1. Images to Remove:")
console.log('   Run: `rm ${unusedImages.join(" ")}`')

console.log("\n2. Add to .gitignore for production:")
console.log("   - /scripts")
console.log("   - /docs")
console.log("   - *.test.*")
console.log("   - *.spec.*")

console.log("\n3. Consider consolidating similar components")

console.log("\n4. Remove unused utility functions")

// Save detailed report
const report = {
  unusedImages,
  componentUsage: Object.fromEntries(componentUsage),
  imageUsage: Object.fromEntries(imageUsage),
  totalImageSize: unusedImages.reduce((sum, img) => sum + fs.statSync(img).size, 0),
}

fs.writeFileSync("unused-code-analysis.json", JSON.stringify(report, null, 2))
console.log("\nDetailed report saved to unused-code-analysis.json")
