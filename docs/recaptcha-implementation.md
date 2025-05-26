# reCAPTCHA Implementation Guide

## Overview

This project uses Google reCAPTCHA v3 for form protection. To comply with deployment requirements, we've implemented a server-side approach for providing the reCAPTCHA site key to the client.

## How It Works

1. The site key is stored in a server-side environment variable (`RECAPTCHA_SITE_KEY`)
2. A server API endpoint (`/api/recaptcha`) provides the site key to the client
3. Client-side code fetches the site key from this endpoint
4. The reCAPTCHA script is loaded dynamically with the fetched site key

This approach keeps the site key out of client-side code while still making it available to the reCAPTCHA script.

## Implementation Details

### Server-Side

- `RECAPTCHA_SITE_KEY`: Environment variable storing the site key
- `RECAPTCHA_SECRET_KEY`: Environment variable storing the secret key
- `/api/recaptcha`: API endpoint that provides the site key to the client

### Client-Side

- `fetchSiteKey()`: Function that fetches the site key from the API
- `loadRecaptchaScript()`: Function that loads the reCAPTCHA script with the fetched site key
- `executeRecaptcha()`: Function that executes reCAPTCHA and returns a token

## Usage

To use reCAPTCHA in a form:

\`\`\`typescript
import { executeRecaptcha } from '@/lib/recaptcha';

// In your form submission handler
async function handleSubmit(event) {
  event.preventDefault();
  
  // Get reCAPTCHA token
  const token = await executeRecaptcha('form_submit');
  
  // Include token in form data
  const formData = new FormData(event.target);
  formData.append('recaptchaToken', token);
  
  // Submit form
  // ...
}
\`\`\`

## Validation

On the server, validate the token using:

\`\`\`typescript
import { validateRecaptcha } from '@/lib/recaptcha';

// In your API route or server action
async function handleFormSubmission(formData) {
  const token = formData.get('recaptchaToken');
  
  // Validate token
  const isValid = await validateRecaptcha(token);
  
  if (!isValid) {
    return { error: 'reCAPTCHA validation failed' };
  }
  
  // Process form submission
  // ...
}
\`\`\`

## Environment Variables

Make sure to set these environment variables:

\`\`\`
RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
