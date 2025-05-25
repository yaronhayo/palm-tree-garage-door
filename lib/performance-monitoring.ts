// Remove the import and implement inline
const measurePerformance = (metricName: string, value: number) => {
  if (typeof window !== "undefined" && window.performance) {
    try {
      // Log to console in development
      if (process.env.NODE_ENV === "development") {
        console.debug(`Performance metric - ${metricName}:`, value)
      }

      // Send to analytics
      if (window.gtag) {
        window.gtag("event", "timing_complete", {
          name: metricName,
          value: Math.round(value),
          event_category: "Performance",
        })
      }
    } catch (error) {
      console.error("Error measuring performance:", error)
    }
  }
}
