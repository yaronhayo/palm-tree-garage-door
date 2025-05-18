import type {
  CallData,
  CallSummary,
  TrackingNumber,
  SourceAttribution,
  ServiceAreaPerformance,
  PaginatedResponse,
  DateRange,
  CallRailApiError,
} from "./types"

/**
 * CallRail API Client
 *
 * A TypeScript client for interacting with the CallRail API
 */
export class CallRailClient {
  private apiKey: string
  private accountId: string
  private baseUrl = "https://api.callrail.com/v3"
  private rateLimitRemaining = 100
  private rateLimitReset = 0

  /**
   * Create a new CallRail API client
   *
   * @param apiKey - Your CallRail API key
   * @param accountId - Your CallRail account ID
   */
  constructor(apiKey: string, accountId: string) {
    if (!apiKey) throw new Error("CallRail API key is required")
    if (!accountId) throw new Error("CallRail account ID is required")

    this.apiKey = apiKey
    this.accountId = accountId
  }

  /**
   * Make a request to the CallRail API
   *
   * @param endpoint - API endpoint to call
   * @param params - Query parameters
   * @returns Promise with the API response
   */
  private async request<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    // Check rate limit
    if (this.rateLimitRemaining <= 0) {
      const now = Math.floor(Date.now() / 1000)
      if (now < this.rateLimitReset) {
        const waitTime = this.rateLimitReset - now
        console.warn(`Rate limit exceeded. Waiting ${waitTime} seconds.`)
        await new Promise((resolve) => setTimeout(resolve, waitTime * 1000))
      }
    }

    // Build URL with query parameters
    const url = new URL(`${this.baseUrl}${endpoint}`)
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value)
      }
    })

    try {
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Token token=${this.apiKey}`,
          "Content-Type": "application/json",
        },
      })

      // Update rate limit info
      this.rateLimitRemaining = Number.parseInt(response.headers.get("X-RateLimit-Remaining") || "100", 10)
      this.rateLimitReset = Number.parseInt(response.headers.get("X-RateLimit-Reset") || "0", 10)

      if (!response.ok) {
        const errorData = (await response.json()) as CallRailApiError
        throw new Error(`CallRail API Error: ${errorData.message || response.statusText}`)
      }

      return (await response.json()) as T
    } catch (error) {
      console.error("CallRail API request failed:", error)
      throw error
    }
  }

  /**
   * Format date range parameter for API requests
   *
   * @param dateRange - Date range to format
   * @returns Formatted date range parameter
   */
  private formatDateRange(dateRange: DateRange): Record<string, string> {
    if (typeof dateRange === "string") {
      return { date_range: dateRange }
    } else {
      return {
        start_date: dateRange.start_date,
        end_date: dateRange.end_date,
      }
    }
  }

  /**
   * Get calls for the account with filtering
   *
   * @param dateRange - Date range for calls
   * @param page - Page number for pagination
   * @param perPage - Number of records per page
   * @param filters - Additional filter parameters
   * @returns Promise with paginated call data
   */
  async getCalls(
    dateRange: DateRange = "last_7_days",
    page = 1,
    perPage = 25,
    filters: Record<string, string> = {},
  ): Promise<PaginatedResponse<CallData>> {
    const params = {
      ...this.formatDateRange(dateRange),
      page: page.toString(),
      per_page: perPage.toString(),
      ...filters,
    }

    return this.request<PaginatedResponse<CallData>>(`/a/${this.accountId}/calls.json`, params)
  }

  /**
   * Get a specific call by ID
   *
   * @param callId - ID of the call to retrieve
   * @returns Promise with call data
   */
  async getCall(callId: string): Promise<CallData> {
    return this.request<CallData>(`/a/${this.accountId}/calls/${callId}.json`)
  }

  /**
   * Get call summary data
   *
   * @param dateRange - Date range for summary
   * @returns Promise with call summary data
   */
  async getCallSummary(dateRange: DateRange = "last_7_days"): Promise<CallSummary[]> {
    const params = this.formatDateRange(dateRange)
    return this.request<CallSummary[]>(`/a/${this.accountId}/calls/summary.json`, params)
  }

  /**
   * Get tracking numbers for the account
   *
   * @param page - Page number for pagination
   * @param perPage - Number of records per page
   * @returns Promise with tracking numbers
   */
  async getTrackingNumbers(page = 1, perPage = 25): Promise<PaginatedResponse<TrackingNumber>> {
    const params = {
      page: page.toString(),
      per_page: perPage.toString(),
    }

    return this.request<PaginatedResponse<TrackingNumber>>(`/a/${this.accountId}/trackers.json`, params)
  }

  /**
   * Get a specific tracking number by ID
   *
   * @param trackerId - ID of the tracking number
   * @returns Promise with tracking number data
   */
  async getTrackingNumber(trackerId: string): Promise<TrackingNumber> {
    return this.request<TrackingNumber>(`/a/${this.accountId}/trackers/${trackerId}.json`)
  }

  /**
   * Get call data grouped by source
   *
   * @param dateRange - Date range for data
   * @returns Promise with source attribution data
   */
  async getCallsBySource(dateRange: DateRange = "last_30_days"): Promise<SourceAttribution[]> {
    const calls = await this.getCalls(dateRange, 1, 1000)

    // Group calls by source
    const sourceMap = new Map<string, SourceAttribution>()

    calls.calls.forEach((call) => {
      const source = call.source || "Unknown"

      if (!sourceMap.has(source)) {
        sourceMap.set(source, {
          source,
          total_calls: 0,
          answered_calls: 0,
          first_time_callers: 0,
          average_duration: 0,
        })
      }

      const sourceData = sourceMap.get(source)!
      sourceData.total_calls++

      if (call.answered) {
        sourceData.answered_calls++
      }

      if (call.first_call) {
        sourceData.first_time_callers++
      }

      // Update average duration
      sourceData.average_duration =
        (sourceData.average_duration * (sourceData.total_calls - 1) + call.duration) / sourceData.total_calls
    })

    return Array.from(sourceMap.values())
  }

  /**
   * Get missed calls
   *
   * @param dateRange - Date range for missed calls
   * @param page - Page number for pagination
   * @param perPage - Number of records per page
   * @returns Promise with missed call data
   */
  async getMissedCalls(
    dateRange: DateRange = "last_7_days",
    page = 1,
    perPage = 25,
  ): Promise<PaginatedResponse<CallData>> {
    const params = {
      ...this.formatDateRange(dateRange),
      page: page.toString(),
      per_page: perPage.toString(),
      answered: "false",
    }

    return this.request<PaginatedResponse<CallData>>(`/a/${this.accountId}/calls.json`, params)
  }

  /**
   * Get calls by service area
   * This is a custom implementation that uses the caller's location data
   *
   * @param dateRange - Date range for data
   * @param serviceAreas - List of service areas to match against
   * @returns Promise with service area performance data
   */
  async getCallsByServiceArea(
    dateRange: DateRange = "last_30_days",
    serviceAreas: string[] = [],
  ): Promise<ServiceAreaPerformance[]> {
    const calls = await this.getCalls(dateRange, 1, 1000)

    // Create a map for service areas
    const serviceAreaMap = new Map<string, ServiceAreaPerformance>()

    // Initialize service areas
    serviceAreas.forEach((area) => {
      serviceAreaMap.set(area, {
        service_area: area,
        total_calls: 0,
        answered_calls: 0,
        conversion_rate: 0,
        average_duration: 0,
      })
    })

    // Process calls
    calls.calls.forEach((call) => {
      const callerCity = call.callercity?.toLowerCase() || ""
      const callerState = call.callerstate?.toLowerCase() || ""

      // Find matching service area
      let matchedArea = "Other"

      for (const area of serviceAreas) {
        const areaLower = area.toLowerCase()
        if (callerCity.includes(areaLower) || areaLower.includes(callerCity)) {
          matchedArea = area
          break
        }
      }

      // Initialize area if not exists
      if (!serviceAreaMap.has(matchedArea)) {
        serviceAreaMap.set(matchedArea, {
          service_area: matchedArea,
          total_calls: 0,
          answered_calls: 0,
          conversion_rate: 0,
          average_duration: 0,
        })
      }

      // Update area stats
      const areaData = serviceAreaMap.get(matchedArea)!
      areaData.total_calls++

      if (call.answered) {
        areaData.answered_calls++
      }

      // Update average duration
      if (call.duration) {
        areaData.average_duration =
          (areaData.average_duration * (areaData.total_calls - 1) + call.duration) / areaData.total_calls
      }
    })

    // Calculate conversion rates
    serviceAreaMap.forEach((area) => {
      area.conversion_rate = area.total_calls > 0 ? (area.answered_calls / area.total_calls) * 100 : 0
    })

    return Array.from(serviceAreaMap.values())
  }

  /**
   * Get first-time callers
   *
   * @param dateRange - Date range for first-time callers
   * @param page - Page number for pagination
   * @param perPage - Number of records per page
   * @returns Promise with first-time caller data
   */
  async getFirstTimeCallers(
    dateRange: DateRange = "last_30_days",
    page = 1,
    perPage = 25,
  ): Promise<PaginatedResponse<CallData>> {
    const params = {
      ...this.formatDateRange(dateRange),
      page: page.toString(),
      per_page: perPage.toString(),
      first_call: "true",
    }

    return this.request<PaginatedResponse<CallData>>(`/a/${this.accountId}/calls.json`, params)
  }
}
