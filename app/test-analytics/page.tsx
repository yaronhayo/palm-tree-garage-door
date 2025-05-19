import AnalyticsClient from "./analytics-client"

export default function TestAnalyticsPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Analytics Test Page</h1>
      <p className="mb-4">This page is used to test Vercel Analytics and Speed Insights.</p>

      {/* Use the client component to handle dynamic imports */}
      <AnalyticsClient />
    </div>
  )
}
