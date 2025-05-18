import Script from "next/script"
import { Disclosure } from "@headlessui/react"
import { ChevronDown } from "lucide-react"
import { generateServiceFAQs } from "@/lib/seo-optimization"

interface ServiceFAQsProps {
  service: string
  location: string
  customFAQs?: Array<{ question: string; answer: string }>
}

export default function ServiceFAQs({ service, location, customFAQs }: ServiceFAQsProps) {
  // Use custom FAQs if provided, otherwise generate them
  const faqs = customFAQs || generateServiceFAQs(service, location)

  // Prepare schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary-700 mb-8">
          Frequently Asked Questions About {service} in {location}
        </h2>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div" className="py-4">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full text-left font-medium text-primary-600 focus:outline-none">
                    <span className="text-lg">{faq.question}</span>
                    <ChevronDown className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-accent-500`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="pt-4 pb-2 text-gray-600">{faq.answer}</Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>

      {/* FAQ Schema Markup */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  )
}
