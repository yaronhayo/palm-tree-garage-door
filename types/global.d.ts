// Global type definitions

// Window extensions
interface Window {
  // Google Tag Manager
  dataLayer?: any[]
  gtag?: (...args: any[]) => void

  // Vercel Analytics
  va?: any

  // CallRail
  CallTrkSwap?: {
    source?: string
    swap?: (element: HTMLElement) => void
    [key: string]: any
  }

  // reCAPTCHA
  grecaptcha?: {
    ready: (callback: () => void) => void
    execute: (siteKey: string, options: { action: string }) => Promise<string>
    render: (element: string | HTMLElement, options: any) => void
  }

  // Environment variables
  __ENV__?: Record<string, string>
}

// Extend NodeJS namespace
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_GTM_ID?: string
    NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID?: string
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY?: string
    RECAPTCHA_SECRET_KEY?: string
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string
    CLOUDINARY_API_KEY?: string
    CLOUDINARY_API_SECRET?: string
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?: string
    RESEND_API_KEY?: string
    BUSINESS_EMAIL?: string
    SITE_URL?: string
  }
}

// Image with crossOrigin property
interface CrossOriginImage extends HTMLImageElement {
  crossOrigin: string
}
