/**
 * Formats a URL slug from a string
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function formatSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim() // Trim leading/trailing spaces
}

/**
 * Creates a canonical URL for the current page
 * @param path The current path
 * @param baseUrl The base URL of the site
 * @returns A canonical URL
 */
export function getCanonicalUrl(path: string, baseUrl = "https://garagedoorspringsrepairfl.com"): string {
  // Remove any hash fragments
  const cleanPath = path.split("#")[0]

  // Remove trailing slash if present (except for homepage)
  const normalizedPath = cleanPath === "/" ? cleanPath : cleanPath.replace(/\/$/, "")

  // Combine base URL with normalized path
  return `${baseUrl}${normalizedPath}`
}

/**
 * Creates a breadcrumb path from a URL
 * @param path The current path
 * @returns An array of breadcrumb objects
 */
export function createBreadcrumbs(path: string): Array<{ name: string; url: string }> {
  const baseUrl = "https://garagedoorspringsrepairfl.com"
  const segments = path.split("/").filter(Boolean)

  // Always start with home
  const breadcrumbs = [{ name: "Home", url: baseUrl }]

  // Build up the breadcrumb trail
  let currentPath = ""
  segments.forEach((segment) => {
    currentPath += `/${segment}`

    // Format the segment name (replace hyphens with spaces and capitalize)
    const name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    breadcrumbs.push({
      name,
      url: `${baseUrl}${currentPath}`,
    })
  })

  return breadcrumbs
}

/**
 * Updates URL hash without scrolling
 * @param hash The hash to set in the URL
 */
export function updateUrlHash(hash: string): void {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href)
    if (url.hash !== `#${hash}`) {
      history.replaceState(null, "", `#${hash}`)
    }
  }
}

/**
 * Removes hash from URL
 */
export function removeUrlHash(): void {
  if (typeof window !== "undefined" && window.location.hash) {
    history.replaceState(null, "", window.location.pathname)
  }
}
