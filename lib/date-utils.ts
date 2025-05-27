/**
 * Date and time utilities
 */

/**
 * Get the current time in Eastern Time (ET)
 */
export function getCurrentEasternTime(): Date {
  // Create a new date object for the current time
  const now = new Date()

  // Use the built-in toLocaleString with timeZone option to get Eastern Time
  // This is more reliable than manual offset calculations
  const etTimeStr = now.toLocaleString("en-US", { timeZone: "America/New_York" })

  // Create a new Date object from the Eastern Time string
  return new Date(etTimeStr)
}

/**
 * Format a date to Eastern Time string
 */
export function formatEasternTime(date: Date): string {
  // Use the built-in toLocaleString with timeZone option
  return (
    date.toLocaleString("en-US", {
      timeZone: "America/New_York",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }) + " ET"
  )
}

/**
 * Format a date and time in Eastern Time
 */
export function formatDateTimeET(date: Date): string {
  return (
    date.toLocaleString("en-US", {
      timeZone: "America/New_York",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }) + " ET"
  )
}

/**
 * Check if a date is during Daylight Saving Time
 */
export function isDaylightSavingTime(date: Date): boolean {
  const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset()
  const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()

  // If timezone offset in January and July are different,
  // then DST is observed
  if (jan !== jul) {
    // If current offset equals January's, then we're not in DST
    return date.getTimezoneOffset() !== Math.max(jan, jul)
  }

  // If timezone offset is the same in January and July,
  // then DST is not observed
  return false
}

/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Format a time for display
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

/**
 * Get a date object for a specific time today in Eastern Time
 */
export function getEasternTimeToday(hour: number, minute = 0): Date {
  const today = getCurrentEasternTime()
  today.setHours(hour, minute, 0, 0)
  return today
}

/**
 * Check if the current time is within business hours (Eastern Time)
 */
export function isWithinBusinessHours(): boolean {
  const now = getCurrentEasternTime()
  const day = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours()

  // Closed on Sunday (0)
  if (day === 0) return false

  // Monday-Friday: 8am-6pm
  if (day >= 1 && day <= 5) {
    return hour >= 8 && hour < 18
  }

  // Saturday: 9am-3pm
  if (day === 6) {
    return hour >= 9 && hour < 15
  }

  return false
}

/**
 * Convert a date to Eastern Time
 * This is a more reliable method than manual offset calculations
 */
export function convertToEasternTime(date: Date): Date {
  // Get the ISO string of the date
  const dateStr = date.toISOString()

  // Create a formatter that will output the time in Eastern Time
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })

  // Format the date to get Eastern Time components
  const parts = formatter.formatToParts(date)

  // Extract the components
  const year = Number.parseInt(parts.find((part) => part.type === "year")?.value || "0")
  const month = Number.parseInt(parts.find((part) => part.type === "month")?.value || "0") - 1 // Months are 0-indexed in JS
  const day = Number.parseInt(parts.find((part) => part.type === "day")?.value || "0")
  const hour = Number.parseInt(parts.find((part) => part.type === "hour")?.value || "0")
  const minute = Number.parseInt(parts.find((part) => part.type === "minute")?.value || "0")
  const second = Number.parseInt(parts.find((part) => part.type === "second")?.value || "0")

  // Create a new date with Eastern Time components
  return new Date(year, month, day, hour, minute, second)
}
