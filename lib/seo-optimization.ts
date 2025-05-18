// Function to generate location-specific meta titles
export function generateLocationTitle(service: string, location: string): string {
  const titles = [
    `${service} in ${location} | Fast & Reliable | Palm Tree Garage Door`,
    `${location} ${service} | 24/7 Emergency Service | Palm Tree Garage Door`,
    `Professional ${service} in ${location} | Palm Tree Garage Door`,
    `Expert ${service} in ${location} | Same-Day Service | Palm Tree Garage Door`,
  ]

  // Return a consistent title based on location to avoid changing titles
  const locationHash = location.length % titles.length
  return titles[locationHash]
}

// Function to generate location-specific meta descriptions
export function generateLocationDescription(service: string, location: string): string {
  const descriptions = [
    `Professional ${service.toLowerCase()} in ${location} with 24/7 emergency service. Licensed technicians, same-day appointments, and free estimates. Call now!`,
    `Need ${service.toLowerCase()} in ${location}? Our certified technicians provide fast, reliable service with upfront pricing. Available 24/7 for emergencies.`,
    `${location}'s trusted ${service.toLowerCase()} experts. We offer same-day service, free estimates, and 24/7 emergency repairs. 100% satisfaction guaranteed.`,
    `Looking for ${service.toLowerCase()} in ${location}? Palm Tree Garage Door offers fast response times, certified technicians, and upfront pricing. Call today!`,
  ]

  // Return a consistent description based on location
  const locationHash = location.length % descriptions.length
  return descriptions[locationHash]
}

// Function to generate location-specific keywords
export function generateLocationKeywords(service: string, location: string): string[] {
  const baseKeywords = [
    `${service} ${location}`,
    `${location} ${service}`,
    `${service} near ${location}`,
    `${service} company ${location}`,
    `best ${service} ${location}`,
    `emergency ${service} ${location}`,
    `24/7 ${service} ${location}`,
    `affordable ${service} ${location}`,
    `professional ${service} ${location}`,
    `expert ${service} ${location}`,
  ]

  return baseKeywords
}

// Function to check if a page has proper SEO elements
export function checkSEOElements(content: string): {
  hasH1: boolean
  hasMetaDescription: boolean
  hasCanonical: boolean
  hasSchema: boolean
  hasBreadcrumbs: boolean
  keywordDensity: number
} {
  return {
    hasH1: content.includes("<h1"),
    hasMetaDescription: content.includes('<meta name="description"'),
    hasCanonical: content.includes('<link rel="canonical"'),
    hasSchema: content.includes("application/ld+json"),
    hasBreadcrumbs: content.includes("Breadcrumb"),
    keywordDensity: 0, // This would require more complex analysis
  }
}

// Function to generate FAQ items for a specific service and location
export function generateServiceFAQs(service: string, location: string): Array<{ question: string; answer: string }> {
  return [
    {
      question: `How quickly can you respond to ${service.toLowerCase()} calls in ${location}?`,
      answer: `We offer fast response times for ${service.toLowerCase()} in ${location}, typically within 30-60 minutes for emergency calls. For non-emergency service, we can usually schedule same-day appointments.`,
    },
    {
      question: `What is the cost of ${service.toLowerCase()} in ${location}?`,
      answer: `The cost of ${service.toLowerCase()} in ${location} varies depending on the specific issue and parts required. We provide free estimates and transparent pricing with no hidden fees. Our service call fee starts at $89, which is waived if you proceed with the repair.`,
    },
    {
      question: `Do you offer warranties on ${service.toLowerCase()} in ${location}?`,
      answer: `Yes, all our ${service.toLowerCase()} services in ${location} come with a warranty. We offer a 90-day warranty on labor and up to a lifetime warranty on certain parts, depending on the manufacturer.`,
    },
    {
      question: `Are your technicians certified for ${service.toLowerCase()} in ${location}?`,
      answer: `Absolutely. All our technicians are fully certified, licensed, and insured to perform ${service.toLowerCase()} in ${location} and surrounding areas. They undergo regular training to stay updated on the latest garage door technologies and repair techniques.`,
    },
    {
      question: `Do you service all types of garage doors for ${service.toLowerCase()} in ${location}?`,
      answer: `Yes, we service all types and brands of garage doors in ${location}, including residential and commercial doors, roll-up doors, sectional doors, and custom installations. Our technicians are experienced with all major brands and models.`,
    },
  ]
}
