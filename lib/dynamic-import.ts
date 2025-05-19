/**
 * Utility for dynamically importing components with better error handling
 * @param importFn - The import function
 * @returns The dynamically imported component
 */
export async function dynamicImport<T>(importFn: () => Promise<T>): Promise<T> {
  try {
    return await importFn()
  } catch (error) {
    console.error("Error dynamically importing component:", error)
    throw error
  }
}

/**
 * Utility for dynamically importing components with a timeout
 * @param importFn - The import function
 * @param timeoutMs - Timeout in milliseconds
 * @returns The dynamically imported component
 */
export async function dynamicImportWithTimeout<T>(importFn: () => Promise<T>, timeoutMs = 5000): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Dynamic import timed out after ${timeoutMs}ms`))
    }, timeoutMs)
  })

  return Promise.race([dynamicImport(importFn), timeoutPromise]) as Promise<T>
}
