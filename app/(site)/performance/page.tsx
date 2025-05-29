import type { Metadata } from "next"
import PageSpeedDashboard from "@/components/PageSpeedDashboard"

export const metadata: Metadata = {
  title: "Performance Monitoring | Palm Tree Garage Door",
  description: "Monitor and analyze website performance using Google PageSpeed Insights",
  robots: "noindex, nofollow", // Keep this private
}

export default function PerformancePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://palm-tree-garage-door.vercel.app"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Performance Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor your website's performance, accessibility, and SEO using Google PageSpeed Insights
          </p>
        </div>

        <PageSpeedDashboard defaultUrl={siteUrl} />
      </div>
    </div>
  )
}
