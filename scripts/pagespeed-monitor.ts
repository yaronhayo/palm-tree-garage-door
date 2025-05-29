import { getPageSpeedInsights, getPerformanceRecommendations } from "../lib/pagespeed-insights"

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

async function monitorPageSpeed() {
  const siteUrl = process.env.SITE_URL || "https://palm-tree-garage-door.vercel.app"

  log("\n🔍 PAGESPEED INSIGHTS MONITORING\n", "cyan")
  log(`Analyzing: ${siteUrl}`, "blue")

  try {
    // Test both mobile and desktop
    const [mobileResult, desktopResult] = await Promise.all([
      getPageSpeedInsights(siteUrl, "mobile"),
      getPageSpeedInsights(siteUrl, "desktop"),
    ])

    // Mobile Results
    log("\n📱 MOBILE RESULTS", "cyan")
    log(
      `Performance: ${mobileResult.metrics.performanceScore}/100`,
      mobileResult.metrics.performanceScore >= 90
        ? "green"
        : mobileResult.metrics.performanceScore >= 50
          ? "yellow"
          : "red",
    )
    log(
      `Accessibility: ${mobileResult.metrics.accessibilityScore}/100`,
      mobileResult.metrics.accessibilityScore >= 95 ? "green" : "yellow",
    )
    log(
      `Best Practices: ${mobileResult.metrics.bestPracticesScore}/100`,
      mobileResult.metrics.bestPracticesScore >= 95 ? "green" : "yellow",
    )
    log(`SEO: ${mobileResult.metrics.seoScore}/100`, mobileResult.metrics.seoScore >= 95 ? "green" : "yellow")

    log("\nCore Web Vitals (Mobile):", "blue")
    log(
      `  LCP: ${(mobileResult.metrics.largestContentfulPaint / 1000).toFixed(1)}s`,
      mobileResult.metrics.largestContentfulPaint <= 2500 ? "green" : "red",
    )
    log(
      `  FID: ${mobileResult.metrics.firstInputDelay}ms`,
      mobileResult.metrics.firstInputDelay <= 100 ? "green" : "red",
    )
    log(
      `  CLS: ${mobileResult.metrics.cumulativeLayoutShift.toFixed(3)}`,
      mobileResult.metrics.cumulativeLayoutShift <= 0.1 ? "green" : "red",
    )

    // Desktop Results
    log("\n🖥️  DESKTOP RESULTS", "cyan")
    log(
      `Performance: ${desktopResult.metrics.performanceScore}/100`,
      desktopResult.metrics.performanceScore >= 90
        ? "green"
        : desktopResult.metrics.performanceScore >= 50
          ? "yellow"
          : "red",
    )
    log(
      `Accessibility: ${desktopResult.metrics.accessibilityScore}/100`,
      desktopResult.metrics.accessibilityScore >= 95 ? "green" : "yellow",
    )
    log(
      `Best Practices: ${desktopResult.metrics.bestPracticesScore}/100`,
      desktopResult.metrics.bestPracticesScore >= 95 ? "green" : "yellow",
    )
    log(`SEO: ${desktopResult.metrics.seoScore}/100`, desktopResult.metrics.seoScore >= 95 ? "green" : "yellow")

    // Recommendations
    log("\n💡 RECOMMENDATIONS", "cyan")
    const mobileRecommendations = getPerformanceRecommendations(mobileResult)
    const desktopRecommendations = getPerformanceRecommendations(desktopResult)

    const allRecommendations = [...new Set([...mobileRecommendations, ...desktopRecommendations])]

    if (allRecommendations.length === 0) {
      log("✅ No major issues found! Your site is performing well.", "green")
    } else {
      allRecommendations.forEach((rec, index) => {
        log(`${index + 1}. ${rec}`, "yellow")
      })
    }

    // Overall assessment
    const avgMobileScore =
      (mobileResult.metrics.performanceScore +
        mobileResult.metrics.accessibilityScore +
        mobileResult.metrics.bestPracticesScore +
        mobileResult.metrics.seoScore) /
      4

    const avgDesktopScore =
      (desktopResult.metrics.performanceScore +
        desktopResult.metrics.accessibilityScore +
        desktopResult.metrics.bestPracticesScore +
        desktopResult.metrics.seoScore) /
      4

    log("\n📊 OVERALL ASSESSMENT", "cyan")
    log(`Mobile Average: ${avgMobileScore.toFixed(1)}/100`, avgMobileScore >= 90 ? "green" : "yellow")
    log(`Desktop Average: ${avgDesktopScore.toFixed(1)}/100`, avgDesktopScore >= 90 ? "green" : "yellow")

    if (avgMobileScore >= 90 && avgDesktopScore >= 90) {
      log("\n🎉 Excellent! Your site meets high performance standards.", "green")
    } else if (avgMobileScore >= 70 && avgDesktopScore >= 70) {
      log("\n⚠️  Good performance, but there's room for improvement.", "yellow")
    } else {
      log("\n🚨 Performance needs attention. Focus on the recommendations above.", "red")
    }
  } catch (error) {
    log(`\n❌ Error analyzing PageSpeed: ${error}`, "red")
    process.exit(1)
  }
}

// Run the monitor
if (require.main === module) {
  monitorPageSpeed()
}

export { monitorPageSpeed }
