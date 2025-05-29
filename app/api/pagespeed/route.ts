import { type NextRequest, NextResponse } from "next/server"
import { getPageSpeedInsights } from "@/lib/pagespeed-insights"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")
    const strategy = (searchParams.get("strategy") as "mobile" | "desktop") || "mobile"

    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    const result = await getPageSpeedInsights(url, strategy)

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
      },
    })
  } catch (error) {
    console.error("PageSpeed API error:", error)

    return NextResponse.json(
      {
        error: "Failed to fetch PageSpeed Insights",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, strategy = "mobile" } = body

    if (!url) {
      return NextResponse.json({ error: "URL is required in request body" }, { status: 400 })
    }

    const result = await getPageSpeedInsights(url, strategy)

    // Store result in database or cache if needed
    // await storePageSpeedResult(result)

    return NextResponse.json(result)
  } catch (error) {
    console.error("PageSpeed API error:", error)

    return NextResponse.json(
      {
        error: "Failed to analyze page performance",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
