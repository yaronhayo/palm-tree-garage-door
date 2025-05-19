/**
 * Dynamically loads a script with options for async, defer, and onload callback
 * @param src - Script source URL
 * @param options - Script loading options
 * @returns Promise that resolves when the script is loaded
 */
export function loadScript(
  src: string,
  options: {
    async?: boolean
    defer?: boolean
    id?: string
    onLoad?: () => void
    attributes?: Record<string, string>
  } = {},
): Promise<HTMLScriptElement> {
  const { async = true, defer = false, id, onLoad, attributes = {} } = options

  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (id && document.getElementById(id)) {
      resolve(document.getElementById(id) as HTMLScriptElement)
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.async = async
    script.defer = defer
    if (id) script.id = id

    // Add custom attributes
    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value)
    })

    script.onload = () => {
      if (onLoad) onLoad()
      resolve(script)
    }

    script.onerror = (error) => {
      reject(error)
    }

    document.head.appendChild(script)
  })
}

/**
 * Loads multiple scripts in parallel
 * @param scripts - Array of script sources and options
 * @returns Promise that resolves when all scripts are loaded
 */
export function loadScripts(
  scripts: Array<{
    src: string
    options?: Parameters<typeof loadScript>[1]
  }>,
): Promise<HTMLScriptElement[]> {
  return Promise.all(scripts.map(({ src, options }) => loadScript(src, options)))
}

/**
 * Loads scripts in sequence, waiting for each to load before loading the next
 * @param scripts - Array of script sources and options
 * @returns Promise that resolves when all scripts are loaded
 */
export async function loadScriptsSequentially(
  scripts: Array<{
    src: string
    options?: Parameters<typeof loadScript>[1]
  }>,
): Promise<HTMLScriptElement[]> {
  const loadedScripts: HTMLScriptElement[] = []

  for (const { src, options } of scripts) {
    const script = await loadScript(src, options)
    loadedScripts.push(script)
  }

  return loadedScripts
}
