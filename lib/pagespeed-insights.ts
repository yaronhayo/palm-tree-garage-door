// PageSpeed Insights API integration

export interface PageSpeedMetrics {
  performanceScore: number
  accessibilityScore: number
  bestPracticesScore: number
  seoScore: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  speedIndex: number
  totalBlockingTime: number
}

export interface PageSpeedAudit {
  id: string
  title: string
  description: string
  score: number | null
  scoreDisplayMode: string
  displayValue?: string
  details?: any
}

export interface PageSpeedResult {
  url: string
  strategy: "mobile" | "desktop"
  metrics: PageSpeedMetrics
  audits: PageSpeedAudit[]
  opportunities: PageSpeedAudit[]
  diagnostics: PageSpeedAudit[]
  timestamp: string
}

/**
 * Fetches PageSpeed Insights data for a given URL
 */
export async function getPageSpeedInsights(
  url: string,
  strategy: "mobile" | "desktop" = "mobile",
  apiKey?: string,
): Promise<PageSpeedResult> {
  const key = apiKey || process.env.PAGESPEED_API_KEY

  if (!key) {
    throw new Error("PageSpeed Insights API key is required")
  }

  const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed")
  apiUrl.searchParams.set("url", url)
  apiUrl.searchParams.set("strategy", strategy)
  apiUrl.searchParams.set("key", key)
  apiUrl.searchParams.set("category", "performance")
  apiUrl.searchParams.set("category", "accessibility")
  apiUrl.searchParams.set("category", "best-practices")
  apiUrl.searchParams.set("category", "seo")

  try {
    const response = await fetch(apiUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`PageSpeed API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return parsePageSpeedResult(data, strategy)
  } catch (error) {
    console.error("Error fetching PageSpeed Insights:", error)
    throw error
  }
}

/**
 * Parses the raw PageSpeed Insights API response
 */
function parsePageSpeedResult(data: any, strategy: "mobile" | "desktop"): PageSpeedResult {
  const lighthouse = data.lighthouseResult
  const categories = lighthouse.categories
  const audits = lighthouse.audits

  // Extract Core Web Vitals and performance metrics
  const metrics: PageSpeedMetrics = {
    performanceScore: Math.round((categories.performance?.score || 0) * 100),
    accessibilityScore: Math.round((categories.accessibility?.score || 0) * 100),
    bestPracticesScore: Math.round((categories["best-practices"]?.score || 0) * 100),
    seoScore: Math.round((categories.seo?.score || 0) * 100),
    firstContentfulPaint: audits["first-contentful-paint"]?.numericValue || 0,
    largestContentfulPaint: audits["largest-contentful-paint"]?.numericValue || 0,
    firstInputDelay: audits["max-potential-fid"]?.numericValue || 0,
    cumulativeLayoutShift: audits["cumulative-layout-shift"]?.numericValue || 0,
    speedIndex: audits["speed-index"]?.numericValue || 0,
    totalBlockingTime: audits["total-blocking-time"]?.numericValue || 0,
  }

  // Extract audits by type
  const allAudits = Object.entries(audits).map(([id, audit]: [string, any]) => ({
    id,
    title: audit.title,
    description: audit.description,
    score: audit.score,
    scoreDisplayMode: audit.scoreDisplayMode,
    displayValue: audit.displayValue,
    details: audit.details,
  }))

  const opportunities = allAudits.filter(
    (audit) => audit.scoreDisplayMode === "numeric" && audit.score !== null && audit.score < 1,
  )

  const diagnostics = allAudits.filter(
    (audit) => audit.scoreDisplayMode === "informative" || audit.scoreDisplayMode === "manual",
  )

  return {
    url: data.id,
    strategy,
    metrics,
    audits: allAudits,
    opportunities,
    diagnostics,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Gets performance recommendations based on PageSpeed results
 */
export function getPerformanceRecommendations(result: PageSpeedResult): string[] {
  const recommendations: string[] = []

  // LCP recommendations
  if (result.metrics.largestContentfulPaint > 2500) {
    recommendations.push(
      "Optimize Largest Contentful Paint (LCP) - consider image optimization and server response times",
    )
  }

  // FID recommendations
  if (result.metrics.firstInputDelay > 100) {
    recommendations.push("Improve First Input Delay (FID) - reduce JavaScript execution time")
  }

  // CLS recommendations
  if (result.metrics.cumulativeLayoutShift > 0.1) {
    recommendations.push("Fix Cumulative Layout Shift (CLS) - ensure images and ads have dimensions")
  }

  // Performance score recommendations
  if (result.metrics.performanceScore < 90) {
    recommendations.push("Overall performance needs improvement - focus on Core Web Vitals")
  }

  // Accessibility recommendations
  if (result.metrics.accessibilityScore < 95) {
    recommendations.push("Improve accessibility - add alt text, proper headings, and ARIA labels")
  }

  // SEO recommendations
  if (result.metrics.seoScore < 95) {
    recommendations.push("Enhance SEO - add meta descriptions, structured data, and proper headings")
  }

  return recommendations
}

/**
 * Formats metric values for display
 */
export function formatMetricValue(value: number, type: "time" | "score" | "cls"): string {
  switch (type) {
    case "time":
      if (value < 1000) return `${Math.round(value)}ms`
      return `${(value / 1000).toFixed(1)}s`
    case "score":
      return `${value}/100`
    case "cls":
      return value.toFixed(3)
    default:
      return value.toString()
  }
}

/**
 * Gets the color class for a metric score
 */
export function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-600"
  if (score >= 50) return "text-yellow-600"
  return "text-red-600"
}

/**
 * Gets the color class for Core Web Vitals
 */
export function getCoreWebVitalColor(metric: string, value: number): string {
  switch (metric) {
    case "lcp":
      if (value <= 2500) return "text-green-600"
      if (value <= 4000) return "text-yellow-600"
      return "text-red-600"
    case "fid":
      if (value <= 100) return "text-green-600"
      if (value <= 300) return "text-yellow-600"
      return "text-red-600"
    case "cls":
      if (value <= 0.1) return "text-green-600"
      if (value <= 0.25) return "text-yellow-600"
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}
