/**
 * Script loading strategies
 */
export type ScriptLoadingStrategy = "beforeInteractive" | "afterInteractive" | "lazyOnload"

/**
 * Script loading options
 */
export interface ScriptOptions {
  id?: string
  async?: boolean
  defer?: boolean
  strategy?: ScriptLoadingStrategy
  onLoad?: () => void
  onError?: (error: Error) => void
  trackPerformance?: boolean
  attributes?: Record<string, string>
  priority?: "high" | "low" | "auto"
}

/**
 * Check if a script is already loaded
 */
export function isScriptLoaded(src: string): boolean {
  if (typeof document === "undefined") return false

  return !!document.querySelector(`script[src="${src}"]`)
}

/**
 * Load a script dynamically
 */
export function loadScript(src: string, options: ScriptOptions = {}): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.resolve()
  }

  // If script is already loaded, resolve immediately
  if (isScriptLoaded(src)) {
    return Promise.resolve()
  }

  const {
    id,
    async = true,
    defer = true,
    strategy = "afterInteractive",
    onLoad,
    onError,
    trackPerformance = false,
    attributes = {},
    priority,
  } = options

  return new Promise((resolve, reject) => {
    // Create script element
    const script = document.createElement("script")
    script.src = src
    script.async = async !== false
    script.defer = defer

    if (id) {
      script.id = id
    }

    // Add custom attributes
    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    // Add fetchpriority attribute for modern browsers
    if (priority) {
      script.setAttribute("fetchpriority", priority)
    }

    // Add loading attribute for better resource prioritization
    if (priority === "low") {
      script.setAttribute("loading", "lazy")
    }

    // Start performance measurement
    let startTime: number | null = null
    if (trackPerformance) {
      startTime = performance.now()
    }

    // Handle script load
    script.onload = () => {
      // Track performance if enabled
      if (trackPerformance && startTime !== null) {
        const loadTime = performance.now() - startTime
        console.debug(`Script loaded in ${loadTime.toFixed(2)}ms:`, src)

        // Track in analytics if available
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "timing_complete", {
            name: "script_load",
            value: Math.round(loadTime),
            event_category: "Performance",
            event_label: src,
          })
        }
      }

      // Call onLoad callback if provided
      if (onLoad) {
        onLoad()
      }

      resolve()
    }

    // Handle script error
    script.onerror = (error) => {
      const errorObj = new Error(`Failed to load script: ${src}`)

      // Call onError callback if provided
      if (onError) {
        onError(errorObj)
      }

      reject(errorObj)
    }

    // Determine when to load the script based on strategy
    if (strategy === "beforeInteractive") {
      // Load immediately
      document.head.appendChild(script)
    } else if (strategy === "afterInteractive") {
      // Load after DOMContentLoaded
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          document.head.appendChild(script)
        })
      } else {
        document.head.appendChild(script)
      }
    } else if (strategy === "lazyOnload") {
      // Load after window load
      if (document.readyState === "complete") {
        document.head.appendChild(script)
      } else {
        window.addEventListener("load", () => {
          document.head.appendChild(script)
        })
      }
    }

    // Use requestIdleCallback to load non-critical scripts
    if (priority === "low" && "requestIdleCallback" in window) {
      ;(window as any).requestIdleCallback(() => {
        document.head.appendChild(script)
      })
    } else {
      document.head.appendChild(script)
    }
  })
}

/**
 * Preconnect to a domain to speed up future requests
 */
export function preconnect(url: string, crossOrigin = true): void {
  if (typeof document === "undefined") return

  const link = document.createElement("link")
  link.rel = "preconnect"
  link.href = url

  if (crossOrigin) {
    link.crossOrigin = "anonymous"
  }

  document.head.appendChild(link)
}

/**
 * DNS prefetch for a domain
 */
export function dnsPrefetch(url: string): void {
  if (typeof document === "undefined") return

  const link = document.createElement("link")
  link.rel = "dns-prefetch"
  link.href = url

  document.head.appendChild(link)
}

/**
 * Preloads a script without executing it
 */
export function preloadScript(src: string) {
  if (typeof window === "undefined") {
    return
  }

  const link = document.createElement("link")
  link.rel = "preload"
  link.as = "script"
  link.href = src
  document.head.appendChild(link)
}

/**
 * Loads multiple scripts in parallel
 */
export function loadScripts(
  scripts: Array<{
    src: string
    async?: boolean
    defer?: boolean
    id?: string
    onLoad?: () => void
    priority?: "high" | "low" | "auto"
  }>,
) {
  return Promise.all(scripts.map((script) => loadScript(script.src, script)))
}
