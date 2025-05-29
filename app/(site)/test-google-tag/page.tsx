"use client"

import { useEffect, useState } from "react"

export default function TestGoogleTagPage() {
  const [gtagStatus, setGtagStatus] = useState<string>("Checking...")
  const [dataLayerStatus, setDataLayerStatus] = useState<string>("Checking...")
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    // Check if gtag is loaded
    if (typeof window !== "undefined") {
      // Check gtag function
      if (typeof window.gtag === "function") {
        setGtagStatus("✅ Loaded")

        // Send a test event
        window.gtag("event", "test_event", {
          event_category: "test",
          event_label: "google_tag_test",
        })
      } else {
        setGtagStatus("❌ Not loaded")
      }

      // Check dataLayer
      if (window.dataLayer && Array.isArray(window.dataLayer)) {
        setDataLayerStatus(`✅ Loaded (${window.dataLayer.length} items)`)
        setEvents(window.dataLayer.slice(-10)) // Show last 10 events
      } else {
        setDataLayerStatus("❌ Not loaded")
      }

      // Listen for new dataLayer pushes
      const originalPush = window.dataLayer?.push
      if (originalPush) {
        window.dataLayer.push = (...args: any[]) => {
          const result = originalPush.apply(window.dataLayer, args)
          setEvents(window.dataLayer.slice(-10))
          return result
        }
      }
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Google Tag Test Page</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Google Tag Status</h2>
        <div className="space-y-2">
          <p>
            <strong>gtag function:</strong> {gtagStatus}
          </p>
          <p>
            <strong>dataLayer:</strong> {dataLayerStatus}
          </p>
          <p>
            <strong>GA4 ID:</strong> G-RKH53HHRHD
          </p>
          <p>
            <strong>GTM ID:</strong> GTM-MF948JFL
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent DataLayer Events</h2>
        <div className="overflow-x-auto">
          <pre className="text-xs bg-gray-100 p-4 rounded">{JSON.stringify(events, null, 2)}</pre>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Testing Instructions:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Open Chrome DevTools (F12)</li>
          <li>Go to Network tab</li>
          <li>Filter by "collect" or "gtag"</li>
          <li>Look for requests to google-analytics.com</li>
          <li>Check Console for any errors</li>
          <li>Use Google Tag Assistant Chrome extension</li>
        </ol>
      </div>
    </div>
  )
}
