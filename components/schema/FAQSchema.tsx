import Script from "next/script"
import { faqData } from "@/data/faq-data"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs?: FAQItem[]
  citySpecific?: string
}

export default function FAQSchema({ faqs = faqData, citySpecific }: FAQSchemaProps) {
  // Process the answers to remove any formatting that shouldn't be in schema
  const processedFaqs = faqs.map((faq) => ({
    question: faq.question,
    // Remove numbered lists formatting for schema
    answer: faq.answer
      .replace(/\d+\)\s/g, "")
      .replace(/\n/g, " ")
      .trim(),
  }))

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: processedFaqs.map((faq) => ({
      "@type": "Question",
      name: citySpecific ? faq.question.replace(/garage door/gi, `garage door in ${citySpecific}`) : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: citySpecific ? faq.answer.replace(/South Florida/gi, citySpecific) : faq.answer,
      },
    })),
  }

  return (
    <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  )
}
