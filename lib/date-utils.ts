/**
 * Date utility functions for handling Eastern Time Zone (Florida)
 */

/**
 * Gets the current date in Eastern Time
 */
export function getCurrentDateET(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }))
}

/**
 * Gets the current Eastern Time
 * @returns Date object in Eastern Time
 */
export function getCurrentEasternTime(): Date {
  return getCurrentDateET()
}

/**
 * Formats a date to a readable string in Eastern Time
 */
export function formatDateET(date: Date, options: Intl.DateTimeFormatOptions = {}): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  }

  return date.toLocaleDateString("en-US", { ...defaultOptions, ...options })
}

/**
 * Formats a date and time in Eastern Time
 */
export function formatDateTimeET(date: Date): string {
  return date.toLocaleString("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

/**
 * Formats a date in Eastern Time with custom options
 * @param date The date to format
 * @param options Optional formatting options
 * @returns Formatted date string in Eastern Time
 */
export function formatEasternTime(date: Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  }

  return date.toLocaleString("en-US", options || defaultOptions)
}

/**
 * Converts a date to Eastern Time
 * @param date The date to convert
 * @returns Date object converted to Eastern Time
 */
export function convertToEasternTime(date: Date): Date {
  const etDateStr = date.toLocaleString("en-US", { timeZone: "America/New_York" })
  return new Date(etDateStr)
}

/**
 * Converts a date to Eastern Time ISO string
 */
export function toISOStringET(date: Date): string {
  const etDate = new Date(date.toLocaleString("en-US", { timeZone: "America/New_York" }))
  return etDate.toISOString()
}

/**
 * Gets Eastern Time ISO string for the current time
 */
export function getEasternTimeISOString(date: Date = new Date()): string {
  return toISOStringET(date)
}

/**
 * Gets tomorrow's date in Eastern Time
 */
export function getTomorrowET(): Date {
  const today = getCurrentDateET()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

/**
 * Formats a date for input[type="date"] value
 */
export function formatDateForInput(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}
