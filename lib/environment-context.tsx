"use client"

import { createContext, useContext, type ReactNode, useEffect, useState } from "react"

interface EnvironmentVariables {
  GTM_ID: string
  CALLRAIL_API_KEY: string
  CALLRAIL_ACCOUNT_ID: string
  CLOUDINARY_API_KEY: string
  CLOUDINARY_API_SECRET: string
  CLOUDINARY_CLOUD_NAME: string
  CLOUDINARY_UPLOAD_PRESET: string
  // Removed RECAPTCHA_SITE_KEY from client context
  RECAPTCHA_SECRET_KEY: string
  SITE_URL: string
  isReady: boolean
  isMissingCritical: boolean
  missingVariables: string[]
}

const defaultValues: EnvironmentVariables = {
  GTM_ID: process.env.GTM_ID || "",
  CALLRAIL_API_KEY: process.env.CALLRAIL_API_KEY || "",
  CALLRAIL_ACCOUNT_ID: process.env.NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
  // Removed RECAPTCHA_SITE_KEY from client context
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || "",
  SITE_URL: process.env.SITE_URL || "",
  isReady: false,
  isMissingCritical: false,
  missingVariables: [],
}

const EnvironmentContext = createContext<EnvironmentVariables>(defaultValues)

export function useEnvironment() {
  return useContext(EnvironmentContext)
}

interface EnvironmentProviderProps {
  children: ReactNode
}

export function EnvironmentProvider({ children }: EnvironmentProviderProps) {
  const [env, setEnv] = useState<EnvironmentVariables>({
    ...defaultValues,
    isReady: false,
    isMissingCritical: false,
    missingVariables: [],
  })

  useEffect(() => {
    // Critical environment variables that must be present
    const criticalVariables = [
      { name: "GTM_ID", value: defaultValues.GTM_ID },
      // Removed RECAPTCHA_SITE_KEY from critical variables
      { name: "CLOUDINARY_CLOUD_NAME", value: defaultValues.CLOUDINARY_CLOUD_NAME },
    ]

    const missing = criticalVariables.filter((v) => !v.value).map((v) => v.name)

    // Log missing variables in development
    if (missing.length > 0 && process.env.NODE_ENV === "development") {
      console.warn("Missing critical environment variables:", missing.join(", "))
    }

    setEnv({
      ...defaultValues,
      isReady: true,
      isMissingCritical: missing.length > 0,
      missingVariables: missing,
    })
  }, [])

  return <EnvironmentContext.Provider value={env}>{children}</EnvironmentContext.Provider>
}
