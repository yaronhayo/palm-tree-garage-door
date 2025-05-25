"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import * as Collapsible from "@radix-ui/react-collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import Script from "next/script"

// Updated FAQ data with more relevant questions and answers (removed price mentions)
export const faqData = [
  {
    id: "faq-1",
    question: "How quickly can you respond to a garage door emergency in South Florida?",
    answer:
      "We offer 24/7 emergency service throughout South Florida and typically arrive within 1-2 hours of your call. For non-emergency appointments, we can usually schedule service within 24-48 hours.",
  },
  {
    id: "faq-2",
    question: "Do you provide free estimates for garage door repairs?",
    answer:
      "Yes, we provide free, no-obligation estimates for all garage door repairs and installations in South Florida. Our technician will assess the situation and provide a detailed quote before any work begins.",
  },
  {
    id: "faq-3",
    question: "How long does a typical garage door repair take?",
    answer:
      "Most standard repairs can be completed in 1-2 hours. More complex issues or full door installations may take 3-5 hours. We'll provide a time estimate before starting the work.",
  },
  {
    id: "faq-4",
    question: "What areas in South Florida do you service?",
    answer:
      "We service all of South Florida, including Miami-Dade, Broward, and Palm Beach counties. Our service area includes major cities like Miami, Fort Lauderdale, West Palm Beach, and all surrounding communities.",
  },
  {
    id: "faq-5",
    question: "Do you offer warranties on your garage door repairs?",
    answer:
      "Yes, we stand behind our work with a lifetime warranty on parts we install. Manufacturer warranties on new doors and openers vary by product, and we'll provide all warranty information before installation.",
  },
  {
    id: "faq-6",
    question: "How often should I have my garage door serviced?",
    answer:
      "We recommend professional maintenance once a year to ensure your garage door operates safely and efficiently. If you use your door frequently or have an older door, twice-yearly maintenance might be beneficial.",
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  // Prepare FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  return (
    <section className="py-16 bg-white" id="faq" ref={ref}>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary-600 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions About Garage Door Repair
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find answers to common questions about our garage door services in South Florida
          </motion.p>
        </div>

        <motion.div
          className="max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {faqData.map((item) => (
            <Collapsible.Root
              key={item.id}
              open={openItem === item.id}
              onOpenChange={() => toggleItem(item.id)}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <Collapsible.Trigger className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors">
                <span className="text-lg font-medium text-primary-900">{item.question}</span>
                <span className="ml-6 flex-shrink-0 text-primary-600">
                  {openItem === item.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </span>
              </Collapsible.Trigger>
              <Collapsible.Content className="overflow-hidden transition-all data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              </Collapsible.Content>
            </Collapsible.Root>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
