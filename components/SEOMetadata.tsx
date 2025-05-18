import type { Metadata } from "next"

interface SEOMetadataProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
}

export default function SEOMetadata({
  title,
  description,
  keywords = [],
  ogImage = "/images/og-image.jpg",
  noIndex = false,
}: SEOMetadataProps): Metadata {
  // Default values
  const defaultTitle = "Palm Tree Garage Door - Professional Garage Door Services"
  const defaultDescription =
    "Palm Tree Garage Door provides professional garage door repair, installation, and maintenance services in South Florida. Available 24/7 for emergency repairs."

  // Computed values
  const metaTitle = title ? `${title} | Palm Tree Garage Door` : defaultTitle
  const metaDescription = description || defaultDescription

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: "website",
      siteName: "Palm Tree Garage Door",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}
