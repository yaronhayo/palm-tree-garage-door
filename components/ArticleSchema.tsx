import Script from "next/script"

interface ArticleSchemaProps {
  title: string
  description: string
  publishDate: string
  modifiedDate?: string
  authorName: string
  imageUrl: string
  slug: string
}

export default function ArticleSchema({
  title,
  description,
  publishDate,
  modifiedDate,
  authorName,
  imageUrl,
  slug,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Palm Tree Garage Door Repair",
      logo: {
        "@type": "ImageObject",
        url: "https://palmtreegaragedoor.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://palmtreegaragedoor.com/blog/${slug}`,
    },
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
