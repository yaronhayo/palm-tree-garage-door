/**
 * Schema Utility Functions
 *
 * These functions generate JSON-LD schema markup for SEO.
 * They are used by the SchemaMarkup component to add structured data to pages.
 *
 * @export - These functions use named exports as they are utility functions
 */

import type { ServiceArea } from "@/data/service-areas"
import type { FAQItem } from "@/data/faq-items"
import type { Testimonial } from "@/components/Testimonials"
import type { FAQCategory } from "@/data/faq-categories"

// Company information - centralized for consistency
const COMPANY = {
  name: "Palm Tree Garage Door",
  legalName: "Palm Tree Garage Door LLC",
  url: "https://palmtreegaragedoor.com",
  logo: "https://palmtreegaragedoor.com/logo.png",
  email: "info@palmtreegaragedoor.com",
  phone: "+1-954-864-2525",
  description:
    "Palm Tree Garage Door provides professional garage door repair, installation, and maintenance services in South Florida. We offer 24/7 emergency service, free estimates, and guaranteed workmanship.",
  foundingDate: "2018-01-01",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Debit Card, Check, PayPal",
  taxID: "12-3456789", // Replace with actual tax ID if available
  vatID: "", // Add if applicable
  slogan: "South Florida's Most Trusted Garage Door Experts",
  awards: [
    "Best Garage Door Service 2022 - South Florida Business Awards",
    "Top-Rated Service Provider 2021 - HomeAdvisor",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "Certified Garage Door Technician",
      recognizedBy: {
        "@type": "Organization",
        name: "International Door Association",
      },
    },
  ],
  memberOf: [
    {
      "@type": "Organization",
      name: "International Door Association",
    },
    {
      "@type": "Organization",
      name: "Florida Garage Door Association",
    },
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "10",
  },
  social: {
    facebook: "https://facebook.com/palmtreegaragedoor",
    instagram: "https://instagram.com/palmtreegaragedoor",
    twitter: "https://twitter.com/palmtreegdoor",
    yelp: "https://yelp.com/biz/palm-tree-garage-door",
    google: "https://g.page/palm-tree-garage-door",
  },
  images: [
    "https://palmtreegaragedoor.com/images/storefront.jpg",
    "https://palmtreegaragedoor.com/images/service-truck.png",
    "https://palmtreegaragedoor.com/images/team.jpg",
  ],
  mainLocation: {
    name: "Palm Tree Garage Door - Headquarters",
    streetAddress: "123 Palm Tree Way",
    addressLocality: "Delray Beach",
    addressRegion: "FL",
    postalCode: "33444",
    addressCountry: "US",
    latitude: 26.4614625,
    longitude: -80.0728201,
    telephone: "+1-954-864-2525",
    faxNumber: "+1-954-864-2526", // If applicable
    email: "info@palmtreegaragedoor.com",
  },
  additionalLocations: [
    {
      name: "Palm Tree Garage Door - Coral Springs",
      streetAddress: "456 Coral Way",
      addressLocality: "Coral Springs",
      addressRegion: "FL",
      postalCode: "33065",
      addressCountry: "US",
      latitude: 26.271185,
      longitude: -80.270256,
      telephone: "+1-954-864-2527",
    },
    {
      name: "Palm Tree Garage Door - Plantation",
      streetAddress: "789 Plantation Blvd",
      addressLocality: "Plantation",
      addressRegion: "FL",
      postalCode: "33324",
      addressCountry: "US",
      latitude: 26.124,
      longitude: -80.2608,
      telephone: "+1-954-864-2528",
    },
  ],
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "16:00",
    },
    {
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "14:00",
    },
  ],
  specialOpeningHours: [
    {
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "23:59",
      validFrom: "2023-12-24",
      validThrough: "2023-12-24",
      description: "Christmas Eve - Emergency Service Only",
    },
    {
      dayOfWeek: "Sunday",
      opens: "00:00",
      closes: "23:59",
      validFrom: "2023-12-25",
      validThrough: "2023-12-25",
      description: "Christmas Day - Emergency Service Only",
    },
  ],
  services: [
    {
      name: "Garage Door Repair",
      description:
        "Professional garage door repair services for all makes and models. Fast, reliable service with a satisfaction guarantee.",
      price: "89.00",
      image: "https://palmtreegaragedoor.com/images/services/door-repair.png",
    },
    {
      name: "Spring Replacement",
      description:
        "Expert garage door spring replacement services. We use high-quality springs rated for 10,000+ cycles for lasting performance.",
      price: "175.00",
      image: "https://palmtreegaragedoor.com/images/services/spring-replacement.png",
    },
    {
      name: "Opener Repair",
      description:
        "Garage door opener repair and replacement services for all major brands. Fast diagnosis and affordable solutions.",
      price: "95.00",
      image: "https://palmtreegaragedoor.com/images/services/opener-repair.png",
    },
    {
      name: "New Installation",
      description:
        "Professional garage door installation services. Wide selection of styles, materials, and features to match your home.",
      price: "900.00",
      image: "https://palmtreegaragedoor.com/images/services/new-installation.png",
    },
    {
      name: "Maintenance & Tune-Up",
      description:
        "Comprehensive garage door maintenance services to keep your door operating smoothly and prevent costly repairs.",
      price: "75.00",
      image: "https://palmtreegaragedoor.com/images/services/maintenance.png",
    },
    {
      name: "Emergency Service",
      description:
        "24/7 emergency garage door repair services. Fast response times and reliable solutions when you need them most.",
      price: "125.00",
      image: "https://palmtreegaragedoor.com/images/services/emergency.png",
    },
  ],
}

// Generate LocalBusiness schema
export function generateLocalBusinessSchema(serviceAreas: ServiceArea[]) {
  // Get the main service area (first in the list)
  const mainArea = serviceAreas[0]

  // Create the base schema
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${COMPANY.url}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    alternateName: "Palm Tree Garage Doors",
    url: COMPANY.url,
    logo: {
      "@type": "ImageObject",
      url: COMPANY.logo,
      width: "180",
      height: "60",
    },
    image: COMPANY.images,
    description: COMPANY.description,
    slogan: COMPANY.slogan,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    faxNumber: COMPANY.mainLocation.faxNumber,
    taxID: COMPANY.taxID,
    vatID: COMPANY.vatID,
    foundingDate: COMPANY.foundingDate,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delray Beach",
        addressRegion: "FL",
        addressCountry: "US",
      },
    },
    founders: [
      {
        "@type": "Person",
        name: "John Smith", // Replace with actual founder name
        jobTitle: "Founder & CEO",
      },
    ],
    numberOfEmployees: COMPANY.numberOfEmployees,
    award: COMPANY.awards,
    hasCredential: COMPANY.hasCredential,
    memberOf: COMPANY.memberOf,
    priceRange: COMPANY.priceRange,
    currenciesAccepted: COMPANY.currenciesAccepted,
    paymentAccepted: COMPANY.paymentAccepted,
    openingHoursSpecification: COMPANY.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    specialOpeningHoursSpecification: COMPANY.specialOpeningHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
      validFrom: hours.validFrom,
      validThrough: hours.validThrough,
      description: hours.description,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garage Door Services",
      itemListElement: COMPANY.services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          url: `${COMPANY.url}/services/${service.name.toLowerCase().replace(/\s+/g, "-")}`,
          provider: {
            "@type": "LocalBusiness",
            name: COMPANY.name,
          },
          offers: {
            "@type": "Offer",
            price: service.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
          },
          image: service.image,
        },
        position: index + 1,
      })),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.mainLocation.streetAddress || mainArea.address || "123 Palm Tree Way",
      addressLocality: COMPANY.mainLocation.addressLocality || mainArea.city,
      addressRegion: COMPANY.mainLocation.addressRegion || "FL",
      postalCode: COMPANY.mainLocation.postalCode || mainArea.zipCode || "33444",
      addressCountry: COMPANY.mainLocation.addressCountry || "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.mainLocation.latitude || mainArea.latitude || 26.4614625,
      longitude: COMPANY.mainLocation.longitude || mainArea.longitude || -80.0728201,
    },
    location: [
      {
        "@type": "Place",
        name: COMPANY.mainLocation.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.mainLocation.streetAddress,
          addressLocality: COMPANY.mainLocation.addressLocality,
          addressRegion: COMPANY.mainLocation.addressRegion,
          postalCode: COMPANY.mainLocation.postalCode,
          addressCountry: COMPANY.mainLocation.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: COMPANY.mainLocation.latitude,
          longitude: COMPANY.mainLocation.longitude,
        },
        telephone: COMPANY.mainLocation.telephone,
        faxNumber: COMPANY.mainLocation.faxNumber,
      },
      ...COMPANY.additionalLocations.map((location) => ({
        "@type": "Place",
        name: location.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: location.streetAddress,
          addressLocality: location.addressLocality,
          addressRegion: location.addressRegion,
          postalCode: location.postalCode,
          addressCountry: location.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.latitude,
          longitude: location.longitude,
        },
        telephone: location.telephone,
      })),
    ],
    areaServed: [
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: COMPANY.mainLocation.latitude,
          longitude: COMPANY.mainLocation.longitude,
        },
        geoRadius: "50000",
      },
      ...serviceAreas.map((area) => ({
        "@type": "City",
        name: area.city,
        "@id": `${COMPANY.url}/service-areas#${area.city.toLowerCase().replace(/\s+/g, "-")}`,
      })),
    ],
    potentialAction: [
      {
        "@type": "ReserveAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${COMPANY.url}/book-service`,
          inLanguage: "en-US",
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform",
          ],
        },
        result: {
          "@type": "Reservation",
          name: "Garage Door Service Appointment",
        },
      },
      {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${COMPANY.url}/quote`,
          inLanguage: "en-US",
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/IOSPlatform",
            "http://schema.org/AndroidPlatform",
          ],
        },
        deliveryMethod: [
          "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
          "http://purl.org/goodrelations/v1#DeliveryModePickUp",
        ],
      },
    ],
    sameAs: [
      COMPANY.social.facebook,
      COMPANY.social.instagram,
      COMPANY.social.twitter,
      COMPANY.social.yelp,
      COMPANY.social.google,
    ],
  }

  return schema
}

// Generate Service schema
export function generateServiceSchema(
  name: string,
  description: string,
  price: string,
  image: string,
  serviceAreas: ServiceArea[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${name} - ${COMPANY.name}`,
    description: description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY.name,
      url: COMPANY.url,
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.city,
    })),
    offers: {
      "@type": "Offer",
      price: price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      acceptedPaymentMethod: [
        {
          "@type": "PaymentMethod",
          name: "Cash",
        },
        {
          "@type": "PaymentMethod",
          name: "Credit Card",
        },
        {
          "@type": "PaymentMethod",
          name: "Debit Card",
        },
      ],
      deliveryLeadTime: {
        "@type": "QuantitativeValue",
        value: "1",
        unitCode: "DAY",
      },
      seller: {
        "@type": "LocalBusiness",
        name: COMPANY.name,
        url: COMPANY.url,
      },
    },
    serviceOutput: {
      "@type": "Thing",
      name: `Repaired or Installed ${name}`,
    },
    termsOfService: `${COMPANY.url}/terms-of-service`,
    serviceType: "Garage Door Service",
    image: image,
    url: `${COMPANY.url}/services/${name.toLowerCase().replace(/\s+/g, "-")}`,
  }
}

// Enhanced FAQ schema generation
export function generateFAQSchema(
  faqItems: FAQItem[],
  options?: {
    includeMetadata?: boolean
    includeCategories?: boolean
    pageUrl?: string
  },
) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${COMPANY.url}/faq`,
    name: "Frequently Asked Questions - Palm Tree Garage Door",
    description:
      "Find answers to common questions about garage door repair, installation, maintenance, and costs in South Florida.",
    url: options?.pageUrl || `${COMPANY.url}/faq`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${COMPANY.url}/#website`,
      name: COMPANY.name,
      url: COMPANY.url,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: COMPANY.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "FAQ",
          item: `${COMPANY.url}/faq`,
        },
      ],
    },
    mainEntity: faqItems.map((item) => {
      const question: any = {
        "@type": "Question",
        "@id": `${COMPANY.url}/faq#${item.question
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")}`,
        name: item.question,
        answerCount: 1,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
          ...(options?.includeMetadata && {
            dateCreated: item.datePublished,
            dateModified: item.dateModified,
            author: {
              "@type": "Organization",
              name: item.author || COMPANY.name,
            },
            upvoteCount: item.upvoteCount || 0,
          }),
        },
      }

      // Add related services as mentions
      if (item.relatedServices && item.relatedServices.length > 0) {
        question.acceptedAnswer.mentions = item.relatedServices.map((service) => ({
          "@type": "Service",
          name: service,
          provider: {
            "@type": "LocalBusiness",
            name: COMPANY.name,
          },
        }))
      }

      // Add category information
      if (options?.includeCategories && item.category) {
        question.about = {
          "@type": "Thing",
          name: item.category,
        }
      }

      // Add keywords as tags
      if (item.keywords && item.keywords.length > 0) {
        question.keywords = item.keywords.join(", ")
      }

      return question
    }),
  }

  // Add aggregate rating if available
  const totalUpvotes = faqItems.reduce((sum, item) => sum + (item.upvoteCount || 0), 0)
  if (totalUpvotes > 0) {
    baseSchema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: totalUpvotes,
      bestRating: "5",
      worstRating: "1",
    }
  }

  // Add publisher information
  baseSchema.publisher = {
    "@type": "Organization",
    "@id": `${COMPANY.url}/#organization`,
    name: COMPANY.name,
    logo: {
      "@type": "ImageObject",
      url: COMPANY.logo,
    },
  }

  // Add date information
  const dates = faqItems
    .map((item) => item.dateModified || item.datePublished)
    .filter(Boolean)
    .sort()

  if (dates.length > 0) {
    baseSchema.datePublished = dates[0]
    baseSchema.dateModified = dates[dates.length - 1]
  }

  return baseSchema
}

// Generate FAQ Category schema
export function generateFAQCategorySchema(category: FAQCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${COMPANY.url}/faq/${category.slug}`,
    name: `${category.name} - Garage Door FAQ`,
    description: category.description,
    url: `${COMPANY.url}/faq/${category.slug}`,
    isPartOf: {
      "@type": "FAQPage",
      "@id": `${COMPANY.url}/faq`,
      name: "Frequently Asked Questions",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: COMPANY.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "FAQ",
          item: `${COMPANY.url}/faq`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: category.name,
          item: `${COMPANY.url}/faq/${category.slug}`,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: category.items.length,
      itemListElement: category.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Question",
          name: item.question,
          url: `${COMPANY.url}/faq#${item.question
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")}`,
        },
      })),
    },
  }
}

// Generate HowTo schema for maintenance FAQs
export function generateHowToSchema(faqItem: FAQItem) {
  // Convert FAQ answer to step-by-step instructions
  const steps = faqItem.answer.split(/\d+\)/).filter((step) => step.trim())

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: faqItem.question,
    description: steps[0] || faqItem.answer.substring(0, 160),
    image: {
      "@type": "ImageObject",
      url: `${COMPANY.url}/images/how-to/${faqItem.question
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}.jpg`,
    },
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0", // DIY cost
    },
    supply: [
      {
        "@type": "HowToSupply",
        name: "Silicone spray lubricant",
      },
      {
        "@type": "HowToSupply",
        name: "Adjustable wrench",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Screwdriver",
      },
      {
        "@type": "HowToTool",
        name: "Level",
      },
    ],
    step: steps.map((stepText, index) => ({
      "@type": "HowToStep",
      name: `Step ${index + 1}`,
      text: stepText.trim(),
      image: {
        "@type": "ImageObject",
        url: `${COMPANY.url}/images/how-to/step-${index + 1}.jpg`,
      },
    })),
    totalTime: "PT30M", // 30 minutes
    performTime: "PT20M", // 20 minutes
    prepTime: "PT10M", // 10 minutes
    yield: "1 maintained garage door",
  }
}

// Generate QAPage schema for individual questions
export function generateQAPageSchema(faqItem: FAQItem) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "@id": `${COMPANY.url}/faq/${faqItem.question
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}`,
    name: faqItem.question,
    description: faqItem.answer.substring(0, 160) + "...",
    url: `${COMPANY.url}/faq/${faqItem.question
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")}`,
    mainEntity: {
      "@type": "Question",
      name: faqItem.question,
      text: faqItem.question,
      answerCount: 1,
      upvoteCount: faqItem.upvoteCount || 0,
      dateCreated: faqItem.datePublished,
      dateModified: faqItem.dateModified,
      author: {
        "@type": "Person",
        name: "Customer",
      },
      acceptedAnswer: {
        "@type": "Answer",
        text: faqItem.answer,
        dateCreated: faqItem.datePublished,
        dateModified: faqItem.dateModified,
        upvoteCount: faqItem.upvoteCount || 0,
        author: {
          "@type": "Organization",
          name: COMPANY.name,
        },
      },
      suggestedAnswer: [
        {
          "@type": "Answer",
          text: "For personalized assistance with your specific situation, please contact our expert technicians at (954) 864-2525.",
          author: {
            "@type": "Organization",
            name: COMPANY.name,
          },
        },
      ],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: COMPANY.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "FAQ",
          item: `${COMPANY.url}/faq`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: faqItem.category,
          item: `${COMPANY.url}/faq/${faqItem.category.toLowerCase().replace(/\s+/g, "-")}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: faqItem.question,
          item: `${COMPANY.url}/faq/${faqItem.question
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")}`,
        },
      ],
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${COMPANY.url}/#website`,
      name: COMPANY.name,
      url: COMPANY.url,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".question", ".answer"],
    },
  }
}

// Generate Review schema
export function generateReviewSchema(testimonial: Testimonial) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY.name,
      url: COMPANY.url,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    reviewBody: testimonial.text,
    datePublished: testimonial.date,
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
    },
  }
}

// Generate AggregateRating schema
export function generateAggregateRatingSchema(testimonials: Testimonial[]) {
  // Calculate average rating
  const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0)
  const averageRating = (totalRating / testimonials.length).toFixed(1)

  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "HomeAndConstructionBusiness",
      name: COMPANY.name,
      url: COMPANY.url,
    },
    ratingValue: averageRating,
    bestRating: "5",
    worstRating: "1",
    ratingCount: testimonials.length,
    reviewCount: testimonials.length,
  }
}

// Generate BreadcrumbList schema
export function generateBreadcrumbListSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
