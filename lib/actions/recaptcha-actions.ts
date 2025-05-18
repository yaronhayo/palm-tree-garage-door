"use server"

import { verifyRecaptchaToken, getRecaptchaSiteKey } from "../server/recaptcha-server"

/**
 * Server action to get the reCAPTCHA site key
 * This keeps the key secure on the server
 */
export async function getRecaptchaKey(): Promise<string> {
  return getRecaptchaSiteKey()
}

/**
 * Server action to verify a reCAPTCHA token
 */
export async function verifyToken(token: string): Promise<boolean> {
  return verifyRecaptchaToken(token)
}
