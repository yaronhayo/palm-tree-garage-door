"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle, Plus, Minus } from "lucide-react"
import AnimatedSection from "./AnimatedSection"
import AnimatedElement from "./AnimatedElement"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showAllFaqs, setShowAllFaqs] = useState(false)

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
    // Additional FAQs that will show when expanded
    {
      question: "What are the signs that my garage door needs repair?",
      answer:
        "Common signs include unusual noises (grinding, scraping, or popping), slow or uneven movement, the door reversing unexpectedly, visible damage to panels or hardware, gaps when closed, and the door becoming stuck or unresponsive. If you notice any of these issues, it's best to schedule a professional inspection to prevent further damage.",
    },
    {
      question: "How often should I service my garage door?",
      answer:
        "We recommend professional garage door maintenance at least once a year to ensure safe and reliable operation. Regular maintenance includes lubricating moving parts, tightening hardware, checking spring tension, testing safety features, and inspecting for wear and tear. More frequent servicing may be needed for doors used multiple times daily.",
    },
    {
      question: "What's the difference between chain drive and belt drive garage door openers?",
      answer:
        "Chain drive openers use a metal chain to move the door and are typically more affordable and durable, but they tend to be noisier. Belt drive openers use a rubber belt that provides quieter operation, making them ideal for homes with living spaces above or adjacent to the garage. Belt drives are generally more expensive but offer smoother operation and require less maintenance.",
    },
    {
      question: "Why won't my garage door close completely?",
      answer:
        "Several issues can prevent a garage door from closing completely: misaligned safety sensors, obstructions in the door's path, damaged tracks, broken springs, worn rollers, or opener limit switch problems. Our technicians can quickly diagnose and resolve these issues to restore proper door function.",
    },
    {
      question: "Are your technicians certified and insured?",
      answer:
        "Yes, all our technicians are fully certified, trained, and insured. They undergo rigorous training on the latest garage door systems and safety protocols. We carry comprehensive liability insurance and workers' compensation coverage for your peace of mind. Our team follows industry best practices and adheres to all local building codes and safety standards.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const toggleShowAllFaqs = () => {
    setShowAllFaqs(!showAllFaqs)
  }

  return (
    <AnimatedSection id="faq" className="py-16 bg-gray-50" variant="fade">
      <div className="container mx-auto px-4">
        <AnimatedElement variant="slide-up" delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our garage door repair services.
            </p>
          </div>
        </AnimatedElement>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.slice(0, showAllFaqs ? faqs.length : 5).map((faq, index) => (
              <AnimatedElement key={index} variant="stagger" index={index} delay={0.2}>
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
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
              </AnimatedElement>
            ))}
          </div>

          <AnimatedElement variant="slide-up" delay={0.3}>
            <div className="mt-8 text-center">
              <button
                onClick={toggleShowAllFaqs}
                className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-md px-4 py-2"
                aria-expanded={showAllFaqs}
              >
                {showAllFaqs ? (
                  <>
                    Show fewer FAQs
                    <Minus className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show more FAQs
                    <Plus className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </AnimatedSection>
  )
}
