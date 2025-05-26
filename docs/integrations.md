# Integrations Documentation

This document provides information about the integrations used in the Palm Tree Garage Door project.

## Active Integrations

### Google Tag Manager
- **Purpose**: Analytics and tracking
- **Environment Variables**: 
  - `NEXT_PUBLIC_GTM_ID`: Client-side GTM container ID
  - `GTM_ID`: Server-side GTM container ID
- **Implementation**: Loaded in `app/layout.tsx` via the `GoogleTagManager` component

### Google reCAPTCHA
- **Purpose**: Form spam protection
- **Environment Variables**:
  - `RECAPTCHA_SITE_KEY`: Server-side site key (accessed via API)
  - `RECAPTCHA_SECRET_KEY`: Server-side secret key
- **Implementation**: Used in form submissions via the `recaptcha.ts` utility

### Resend
- **Purpose**: Transactional email delivery
- **Environment Variables**:
  - `RESEND_API_KEY`: API key for Resend service
- **Implementation**: Used in `lib/email.ts` for sending form notifications and autoresponders

### CallRail
- **Purpose**: Call tracking and analytics
- **Environment Variables**:
  - `NEXT_PUBLIC_CALLRAIL_ACCOUNT_ID`: Client-side account ID
  - `CALLRAIL_API_KEY`: Server-side API key
- **Implementation**: Used in `CallRailTracking.tsx` component

## Removed Integrations

### Supabase
- **Status**: Removed (unused)
- **Reason**: Not actively used in the codebase
- **Date Removed**: [Current Date]

### PostgreSQL
- **Status**: Removed (unused)
- **Reason**: Not actively used in the codebase
- **Date Removed**: [Current Date]

### Cloudinary
- **Status**: Removed (unused)
- **Reason**: Not actively used in the codebase
- **Date Removed**: [Current Date]

## Integration Guidelines

When adding new integrations to the project:

1. **Document the integration** in this file
2. **Add required environment variables** to `.env.example`
3. **Create utility functions** in the `lib` directory
4. **Implement proper error handling** for API failures
5. **Add security measures** like API key rotation and rate limiting
