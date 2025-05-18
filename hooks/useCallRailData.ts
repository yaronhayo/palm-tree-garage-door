"use client"

import { useState, useEffect } from "react"
import type { DateRange } from "@/lib/callrail/types"

interface UseCallRailDataOptions {
  endpoint: "calls" | "analytics" | "trackers" | "recordings"
  type?: string
  dateRange?: DateRange
  page?: number
  perPage?: number
  refreshInterval?: number | null
  filters?: Record<string, string>
}

export function useCallRailData<T>({
  endpoint,
  type,
  dateRange = "last_7_days",
  page = 1,
  perPage = 25,
  refreshInterval = null,
  filters = {},
}: UseCallRailDataOptions) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true
    let intervalId: NodeJS.Timeout | null = null

    const fetchData = async () => {
      if (!isMounted) return

      setIsLoading(true)
      setError(null)

      try {
        // Build query parameters
        const params = new URLSearchParams()
        if (type) params.append("type", type)
        if (typeof dateRange === "string") {
          params.append("date_range", dateRange)
        } else {
          params.append("start_date", dateRange.start_date)
          params.append("end_date", dateRange.end_date)
        }
        params.append("page", page.toString())
        params.append("per_page", perPage.toString())

        // Add filters
        Object.entries(filters).forEach(([key, value]) => {
          params.append(key, value)
        })

        // Make API request
        const response = await fetch(`/api/callrail/${endpoint}?${params.toString()}`)

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()

        if (isMounted) {
          setData(result)
          setIsLoading(false)
        }
      } catch (err) {
        console.error("Error fetching CallRail data:", err)
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"))
          setIsLoading(false)
        }
      }
    }

    // Fetch data immediately
    fetchData()

    // Set up refresh interval if specified
    if (refreshInterval && refreshInterval > 0) {
      intervalId = setInterval(fetchData, refreshInterval)
    }

    // Clean up
    return () => {
      isMounted = false
      if (intervalId) clearInterval(intervalId)
    }
  }, [endpoint, type, dateRange, page, perPage, refreshInterval, JSON.stringify(filters)])

  return { data, isLoading, error }
}
