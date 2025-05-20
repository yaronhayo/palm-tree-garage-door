/**
 * Script loading utilities
 */

/**
 * Load a script dynamically
 */
export function loadScript(src: string, id?: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot load script in server environment"))
      return
    }

    // Check if script already exists
    if (id && document.getElementById(id)) {
      resolve(document.getElementById(id) as HTMLScriptElement)
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.async = true

    if (id) {
      script.id = id
    }

    script.onload = () => resolve(script)
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))

    document.head.appendChild(script)
  })
}

/**
 * Load multiple scripts in sequence
 */
export async function loadScriptsSequentially(scripts: string[]): Promise<HTMLScriptElement[]> {
  const loadedScripts: HTMLScriptElement[] = []

  for (const src of scripts) {
    const script = await loadScript(src)
    loadedScripts.push(script)
  }

  return loadedScripts
}

/**
 * Check if a script is already loaded
 */
export function isScriptLoaded(src: string): boolean {
  if (typeof window === "undefined") return false

  const scripts = document.getElementsByTagName("script")
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src === src) {
      return true
    }
  }

  return false
}
