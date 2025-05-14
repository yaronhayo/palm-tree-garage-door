import type { Metadata } from "next"

const SITE_URL = process.env.SITE_URL || "https://palmtreegaragedoor.com"

export const seo = {
  defaultMetadata: {
    title: {
      default: "Palm Tree Garage Door Repair",
      template: "%s | Palm Tree Garage Door Repair",
    },
    description: "24/7 emergency garage-door repair & installation in South Florida. Fast, certified, trustworthy.",
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: "Palm Tree Garage Door Repair",
      title: "Palm Tree Garage Door Repair",
      description: "24/7 emergency garage-door repair & installation in South Florida. Fast, certified, trustworthy.",
      images: [
        {
          url: `${SITE_URL}/images/og-cover.webp`,
          width: 1200,
          height: 630,
          alt: "Palm Tree Garage Door Repair",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Palm Tree Garage Door Repair",
      description: "24/7 emergency garage-door repair & installation in South Florida. Fast, certified, trustworthy.",
      images: [`${SITE_URL}/images/og-cover.webp`],
    },
    robots: {
      index: true,
      follow: true,
    },
  },

  // Helper function to generate page-specific metadata
  getPageMetadata: (title: string, description?: string): Metadata => {
    return {
      title,
      description:
        description ||
        "24/7 emergency garage-door repair & installation in South Florida. Fast, certified, trustworthy.",
      openGraph: {
        title,
        description:
          description ||
          "24/7 emergency garage-door repair & installation in South Florida. Fast, certified, trustworthy.",
      },
      twitter: {
        title,
        description:
          description ||
          "24/7 emergency garage-door repair & installation in South Florida. Fast, certified, trustworthy.",
      },
    }
  },
}
