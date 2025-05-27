// Types for schema generation
interface LocalBusinessSchemaOptions {
  name: string
  description: string
  logo: string
  url: string
  telephone: string
  email: string
  priceRange: string
  openingHours: string
}

interface WebPageSchemaOptions {
  url: string
  name: string
  description: string
  activeSection?: string
}

interface FAQSchemaOptions {
  includeMetadata?: boolean
  includeCategories?: boolean
  pageUrl?: string
}

/**
 * Generate LocalBusiness schema for the company
 */
export function generateLocalBusinessSchema(serviceAreas: any[], options: Partial<LocalBusinessSchemaOptions> = {}) {
  const defaultOptions: LocalBusinessSchemaOptions = {
    name: "Palm Tree Garage Door Repair",
    description: "Professional garage door repair and installation services in South Florida.",
    logo: "https://palmtreegaragedoor.com/logo.png",
    url: "https://palmtreegaragedoor.com",
    telephone: "(321) 366-9723",
    email: "palmtreegaragedoor@gmail.com",
    priceRange: "$$$",
    openingHours: "Mo-Su 00:00-23:59", // 24/7 service
  }

  const opts = { ...defaultOptions, ...options }

  // Create service area locations
  const serviceAreaLocations = serviceAreas.map((area) => ({
    "@type": "City",
    name: area.city,
    address: {
      "@type": "PostalAddress",
      addressLocality: area.city,
      addressRegion: area.state,
      postalCode: area.zipCodes[0], // Use first zip code as example
    },
  }))

  return {
    "@context": "https://schema.org",
    "@type": "GarageDoorRepair", // More specific type than just LocalBusiness
    "@id": `${opts.url}#localbusiness`,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    telephone: opts.telephone,
    email: opts.email,
    logo: {
      "@type": "ImageObject",
      url: opts.logo,
    },
    image: opts.logo,
    priceRange: opts.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: "South Florida",
      addressRegion: "FL",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.1224386, // South Florida coordinates (approximate)
      longitude: -80.1373174,
    },
    areaServed: serviceAreaLocations,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.facebook.com/palmtreegaragedoor",
      "https://www.instagram.com/palmtreegaragedoor",
      "https://twitter.com/palmtreegaragedoor",
    ],
    paymentAccepted: "Cash, Credit Card",
    currenciesAccepted: "USD",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garage Door Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Garage Door Repair",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Garage Door Installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Garage Door Spring Replacement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Garage Door Opener Repair",
          },
        },
      ],
    },
  }
}

/**
 * Generate WebPage schema for the current page
 */
export function generateWebPageSchema(options: WebPageSchemaOptions) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${options.url}#webpage`,
    url: options.url,
    name: options.name,
    description: options.description,
    isPartOf: {
      "@id": `${options.url.split("/")[0]}//#website`,
    },
    inLanguage: "en-US",
    datePublished: "2023-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
  }

  // Add mainEntity if there's an active section
  if (options.activeSection) {
    schema.mainEntity = {
      "@id": `${options.url}#${options.activeSection}`,
    }
  }

  return schema
}

/**
 * Generate Service schema for a specific service
 */
export function generateServiceSchema(
  serviceName: string,
  serviceDescription: string,
  servicePrice: string,
  serviceImage: string,
  serviceAreas: any[],
) {
  // Create area served array
  const areaServed = serviceAreas.map((area) => ({
    "@type": "City",
    name: `${area.city}, ${area.state}`,
  }))

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Palm Tree Garage Door Repair",
      url: "https://palmtreegaragedoor.com",
    },
    areaServed: areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garage Door Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceName,
            description: serviceDescription,
            image: serviceImage,
            offers: {
              "@type": "Offer",
              price: servicePrice.replace(/[^0-9.]/g, ""),
              priceCurrency: "USD",
            },
          },
        },
      ],
    },
  }
}

/**
 * Generate FAQ schema for FAQ sections
 */
export function generateFAQSchema(faqItems: any[], options: FAQSchemaOptions = {}) {
  const mainEntity = faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
    ...(item.category && options.includeCategories
      ? {
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${options.pageUrl || "https://palmtreegaragedoor.com/faq"}#${item.category
              .toLowerCase()
              .replace(/\s+/g, "-")}`,
          },
        }
      : {}),
  }))

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(options.includeMetadata
      ? {
          name: "Frequently Asked Questions About Garage Door Repair",
          description: "Find answers to common questions about garage door repair and installation services.",
        }
      : {}),
    mainEntity,
  }
}

/**
 * Generate FAQ Category schema
 */
export function generateFAQCategorySchema(category: any) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://palmtreegaragedoor.com/faq#${category.id}`,
    name: `${category.name} - Frequently Asked Questions`,
    description: `Answers to common questions about ${category.name.toLowerCase()} for garage doors.`,
    isPartOf: {
      "@id": "https://palmtreegaragedoor.com/faq#webpage",
    },
  }
}

/**
 * Generate Review schema for testimonials
 */
export function generateReviewSchema(testimonial: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "Palm Tree Garage Door Repair",
      image: "https://palmtreegaragedoor.com/logo.png",
      telephone: "(321) 366-9723",
      address: {
        "@type": "PostalAddress",
        addressLocality: testimonial.location || "South Florida",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating || 5,
      bestRating: 5,
    },
    name: `${testimonial.name}'s review of Palm Tree Garage Door Repair`,
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    datePublished: testimonial.date || new Date().toISOString().split("T")[0],
    reviewBody: testimonial.text,
  }
}

/**
 * Generate AggregateRating schema for overall ratings
 */
export function generateAggregateRatingSchema(testimonials: any[]) {
  // Calculate average rating
  const totalRating = testimonials.reduce((sum, testimonial) => sum + (testimonial.rating || 5), 0)
  const averageRating = (totalRating / testimonials.length).toFixed(1)

  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: "Palm Tree Garage Door Repair",
      image: "https://palmtreegaragedoor.com/logo.png",
    },
    ratingValue: averageRating,
    bestRating: "5",
    worstRating: "1",
    ratingCount: testimonials.length,
    reviewCount: testimonials.length,
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbListSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  }
}
