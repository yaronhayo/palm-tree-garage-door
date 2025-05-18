// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import "whatwg-fetch"
import { TextEncoder, TextDecoder } from "util"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    return null
  }
  unobserve() {
    return null
  }
  disconnect() {
    return null
  }
}

global.IntersectionObserver = MockIntersectionObserver

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock TextEncoder/TextDecoder
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock scrollTo
window.scrollTo = jest.fn()

// Mock Cloudinary
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock environment variables
process.env = {
  ...process.env,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "test-cloud",
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: "test-preset",
  SITE_URL: "https://palmtreegaragedoor.com",
  GTM_ID: "GTM-TEST",
}
