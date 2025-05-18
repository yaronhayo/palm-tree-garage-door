export function preloadResources() {
  // Preload critical fonts
  const fontPreloads = [{ href: "/fonts/inter-var.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" }]

  // Preload critical images (hero section)
  const imagePreloads = [
    { href: "/images/garage-door-repair-service.png", as: "image" },
    { href: "/logo.png", as: "image" },
  ]

  // Preconnect to third-party domains
  const preconnects = [
    { href: "https://www.googletagmanager.com", crossOrigin: "anonymous" },
    { href: "https://res.cloudinary.com", crossOrigin: "anonymous" },
    { href: "https://www.google-analytics.com", crossOrigin: "anonymous" },
    { href: "https://fonts.googleapis.com", crossOrigin: "anonymous" },
    { href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  ]

  // Create and append link elements
  const createLinkElement = (attributes: Record<string, string>) => {
    const link = document.createElement("link")
    Object.entries(attributes).forEach(([key, value]) => {
      link.setAttribute(key, value)
    })
    document.head.appendChild(link)
  }

  // Add preloads
  fontPreloads.forEach((attrs) => createLinkElement(attrs))
  imagePreloads.forEach((attrs) => createLinkElement(attrs))
  preconnects.forEach((attrs) => createLinkElement(attrs))
}
