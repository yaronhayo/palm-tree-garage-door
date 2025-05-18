import { CallRailClient } from "./client"
import type { DateRange } from "./types"

// Initialize the client with environment variables
const callrailClient = new CallRailClient(
  process.env.CALLRAIL_API_KEY || "",
  process.env.NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID || "",
)

/**
 * Fetch call data from CallRail
 *
 * @param dateRange - Date range for calls
 * @param page - Page number for pagination
 * @param perPage - Number of records per page
 * @param filters - Additional filter parameters
 * @returns Promise with call data
 */
export async function fetchCallData(
  dateRange: DateRange = "last_7_days",
  page = 1,
  perPage = 25,
  filters: Record<string, string> = {},
) {
  return callrailClient.getCalls(dateRange, page, perPage, filters)
}

// Export other functions and types
export * from "./types"
export { callrailClient }

/**
 * Fetch call summary data from CallRail
 *
 * @param dateRange - Date range for summary
 * @returns Promise with call summary data
 */
export async function fetchCallSummary(dateRange: DateRange = "last_7_days") {
  return callrailClient.getCallSummary(dateRange)
}

/**
 * Fetch missed calls from CallRail
 *
 * @param dateRange - Date range for missed calls
 * @param page - Page number for pagination
 * @param perPage - Number of records per page
 * @returns Promise with missed call data
 */
export async function fetchMissedCalls(dateRange: DateRange = "last_7_days", page = 1, perPage = 25) {
  return callrailClient.getMissedCalls(dateRange, page, perPage)
}

/**
 * Fetch calls grouped by source from CallRail
 *
 * @param dateRange - Date range for data
 * @returns Promise with source attribution data
 */
export async function fetchCallsBySource(dateRange: DateRange = "last_30_days") {
  return callrailClient.getCallsBySource(dateRange)
}

/**
 * Fetch calls grouped by service area
 *
 * @param dateRange - Date range for data
 * @param serviceAreas - List of service areas to match against
 * @returns Promise with service area performance data
 */
export async function fetchCallsByServiceArea(dateRange: DateRange = "last_30_days", serviceAreas: string[] = []) {
  return callrailClient.getCallsByServiceArea(dateRange, serviceAreas)
}

/**
 * Fetch tracking numbers from CallRail
 *
 * @param page - Page number for pagination
 * @param perPage - Number of records per page
 * @returns Promise with tracking number data
 */
export async function fetchTrackingNumbers(page = 1, perPage = 25) {
  return callrailClient.getTrackingNumbers(page, perPage)
}

/**
 * Fetch first-time callers from CallRail
 *
 * @param dateRange - Date range for first-time callers
 * @param page - Page number for pagination
 * @param perPage - Number of records per page
 * @returns Promise with first-time caller data
 */
export async function fetchFirstTimeCallers(dateRange: DateRange = "last_30_days", page = 1, perPage = 25) {
  return callrailClient.getFirstTimeCallers(dateRange, page, perPage)
}
