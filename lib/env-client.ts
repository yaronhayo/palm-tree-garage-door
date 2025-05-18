/**
 * Safe client-side environment variable access
 * Only exposes non-sensitive public variables
 */

// Safe list of allowed public environment variables - MUST be defined first
const SAFE_PUBLIC_VARS = [
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  "NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID",
  "NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "GTM_ID",
]

// Helper function to safely get environment variables
function getEnvVar(name: string): string {
  try {
    // Only allow access to safe variables
    if (!SAFE_PUBLIC_VARS.includes(name)) {
      return ""
    }

    // For client-side, we need to check if the variable exists and is accessible
    if (typeof window !== "undefined") {
      // Client-side: only NEXT_PUBLIC_ variables are accessible
      if (name.startsWith("NEXT_PUBLIC_")) {
        return process.env[name] || ""
      }
      // Non-NEXT_PUBLIC_ variables are not accessible client-side
      return ""
    } else {
      // Server-side: all variables are accessible
      return process.env[name] || ""
    }
  } catch (error) {
    console.error(`Error accessing environment variable:`, error)
    return ""
  }
}

function getRequiredEnvVar(name: string, defaultValue: string): string {
  const value = getEnvVar(name)
  if (!value) {
    if (defaultValue) {
      console.warn(`Environment variable is not defined, using default value`)
      return defaultValue
    }
    throw new Error(`Missing required environment variable`)
  }
  return value
}

// Define a type for safe client environment variables
export type ClientEnv = {
  GTM_ID: string
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string
  NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID: string
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string
  NEXT_PUBLIC_SUPABASE_URL: string
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string
}

// Create a safe client environment object with fallbacks
export const clientEnv: ClientEnv = {
  GTM_ID: getEnvVar("GTM_ID") || "GTM-XXXX",
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: getEnvVar("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME") || "",
  NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID: getEnvVar("NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID") || "",
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: getEnvVar("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET") || "",
  NEXT_PUBLIC_SUPABASE_URL: getEnvVar("NEXT_PUBLIC_SUPABASE_URL") || "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY") || "",
}

// Export the getEnvVar function for direct use
export { getEnvVar, getRequiredEnvVar }
