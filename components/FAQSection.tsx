"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FAQItem[] = [
    {
      question: "How much does garage door repair cost?",
      answer:
        "Garage door repair costs vary depending on the issue, parts needed, and service required. Minor repairs like sensor alignment or track adjustments typically range from $150-$250. Spring replacements usually cost $200-$300, while opener repairs range from $150-$350. For an accurate quote, we offer free estimates tailored to your specific situation.",
    },
    {
      question: "How long does a typical garage door repair take?",
      answer:
        "Most standard garage door repairs can be completed in 1-2 hours. Simple issues like sensor adjustments might take 30 minutes, while more complex repairs like spring replacements or opener installations typically take 1-3 hours. Our technicians arrive with fully-stocked service vehicles to complete most repairs in a single visit.",
    },
    {
      question: "Do you offer emergency garage door repair?",
      answer:
        "Yes, we offer 24/7 emergency garage door repair services throughout South Florida. Whether your door is stuck open, won't close, or has another urgent issue, our technicians are available around the clock to help secure your property and restore functionality to your garage door.",
    },
    {
      question: "How long do garage door springs last?",
      answer:
        "Garage door springs typically last 7-10 years or approximately 10,000 cycles (open/close operations). Factors affecting lifespan include the quality of the springs, frequency of use, door weight, and maintenance. Regular lubrication and professional tune-ups can extend spring life. We recommend replacing both springs even if only one breaks to ensure balanced operation.",
    },
    {
      question: "Can I repair my garage door myself?",
      answer:
        "While minor maintenance like lubricating parts or tightening hardware can be done yourself, most garage door repairs should be handled by professionals. Springs are under high tension and can cause serious injury if mishandled. Additionally, improper repairs can lead to further damage or safety issues. Our trained technicians have the proper tools, parts, and expertise to safely repair your garage door.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about our garage door repair services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  className="flex justify-between items-center w-full p-5 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 text-accent-500 mr-3 flex-shrink-0" />
                    <span className="font-medium text-primary-600">{faq.question}</span>
                  </div>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-primary-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`px-5 pb-5 transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center"
            >
              View all FAQs
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
