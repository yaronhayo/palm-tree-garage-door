import { getPageSpeedInsights } from "../lib/pagespeed-insights"

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

async function testPageSpeedIntegration() {
  log("\n🧪 TESTING PAGESPEED INSIGHTS INTEGRATION\n", "cyan")

  // Check environment variable
  const apiKey = process.env.PAGESPEED_API_KEY
  if (!apiKey) {
    log("❌ PAGESPEED_API_KEY environment variable not found", "red")
    log("Please add your PageSpeed Insights API key to the environment variables", "yellow")
    return false
  }

  log("✅ API key found", "green")

  // Test URL
  const testUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://palm-tree-garage-door.vercel.app"
  log(`🔍 Testing URL: ${testUrl}`, "blue")

  try {
    log("\n📱 Testing mobile analysis...", "cyan")
    const mobileResult = await getPageSpeedInsights(testUrl, "mobile")

    log(`✅ Mobile analysis successful!`, "green")
    log(`   Performance: ${mobileResult.metrics.performanceScore}/100`, "blue")
    log(`   Accessibility: ${mobileResult.metrics.accessibilityScore}/100`, "blue")
    log(`   Best Practices: ${mobileResult.metrics.bestPracticesScore}/100`, "blue")
    log(`   SEO: ${mobileResult.metrics.seoScore}/100`, "blue")

    log("\n🖥️  Testing desktop analysis...", "cyan")
    const desktopResult = await getPageSpeedInsights(testUrl, "desktop")

    log(`✅ Desktop analysis successful!`, "green")
    log(`   Performance: ${desktopResult.metrics.performanceScore}/100`, "blue")
    log(`   Accessibility: ${desktopResult.metrics.accessibilityScore}/100`, "blue")
    log(`   Best Practices: ${desktopResult.metrics.bestPracticesScore}/100`, "blue")
    log(`   SEO: ${desktopResult.metrics.seoScore}/100`, "blue")

    log("\n🎯 Core Web Vitals (Mobile):", "cyan")
    log(`   LCP: ${(mobileResult.metrics.largestContentfulPaint / 1000).toFixed(1)}s`, "blue")
    log(`   FID: ${mobileResult.metrics.firstInputDelay}ms`, "blue")
    log(`   CLS: ${mobileResult.metrics.cumulativeLayoutShift.toFixed(3)}`, "blue")

    log("\n🎉 PageSpeed Insights integration is working perfectly!", "green")
    log("\nNext steps:", "yellow")
    log("1. Visit /performance to use the dashboard", "yellow")
    log("2. Run 'npm run pagespeed' for automated monitoring", "yellow")
    log("3. Set up scheduled monitoring for continuous tracking", "yellow")

    return true
  } catch (error) {
    log(`\n❌ Error testing PageSpeed integration:`, "red")
    log(`   ${error}`, "red")

    if (error instanceof Error && error.message.includes("API key")) {
      log("\n💡 Troubleshooting:", "yellow")
      log("1. Verify your API key is correct", "yellow")
      log("2. Ensure PageSpeed Insights API is enabled in Google Cloud Console", "yellow")
      log("3. Check API quotas and billing settings", "yellow")
    }

    return false
  }
}

// Run the test
if (require.main === module) {
  testPageSpeedIntegration().then((success) => {
    process.exit(success ? 0 : 1)
  })
}

export { testPageSpeedIntegration }
