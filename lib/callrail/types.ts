/**
 * CallRail API response types
 */

// Base pagination interface
export interface PaginatedResponse<T> {
  page: number
  total_pages: number
  total_records: number
  records_per_page: number
  current_page: number
  calls: T[]
}

// Call data interface
export interface CallData {
  id: string
  start_time: string
  duration: number
  answered: boolean
  note: string | null
  source: string
  tracking_number: string
  formatted_tracking_number: string
  caller_number: string
  formatted_caller_number: string
  caller_name: string | null
  customer_name: string | null
  customer_phone_number: string | null
  formatted_customer_phone_number: string | null
  customer_email: string | null
  tags: string[]
  recording_url: string | null
  recording_duration: number | null
  recording_player_url: string | null
  company_id: string
  company_name: string
  first_call: boolean
  device_type: string
  tracker_id: string
  source_name: string
  medium: string | null
  campaign: string | null
  referring_url: string | null
  landing_page_url: string | null
  last_requested_url: string | null
  referrer_domain: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_term: string | null
  utm_content: string | null
  utm_campaign: string | null
  gclid: string | null
  value: number | null
  agent_email: string | null
  keywords: string | null
  callercity: string | null
  callerstate: string | null
  callercountry: string | null
  created_at: string
  updated_at: string
}

// Call summary interface
export interface CallSummary {
  date: string
  total_calls: number
  answered_calls: number
  first_time_callers: number
  missed_calls: number
  average_duration: number
}

// Tracking number interface
export interface TrackingNumber {
  id: string
  name: string
  number: string
  formatted_number: string
  status: string
  tracking_type: string
  tracking_source: string
  company_id: string
  created_at: string
  updated_at: string
}

// Source attribution interface
export interface SourceAttribution {
  source: string
  total_calls: number
  answered_calls: number
  first_time_callers: number
  average_duration: number
}

// Service area performance interface
export interface ServiceAreaPerformance {
  service_area: string
  total_calls: number
  answered_calls: number
  conversion_rate: number
  average_duration: number
}

// API Error interface
export interface CallRailApiError {
  error: string
  message: string
  status: number
}

// Date range type
export type DateRange =
  | "today"
  | "yesterday"
  | "last_7_days"
  | "last_30_days"
  | "this_month"
  | "last_month"
  | "all_time"
  | { start_date: string; end_date: string }
