"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import { trackPhoneCall } from "@/lib/dataLayer"

type FAQ = {
  question: string
  answer: string
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handlePhoneClick = () => {
    trackPhoneCall("3213669723", "faq_section")
  }

  const faqs: FAQ[] = [
    {
      question: "How much does garage door repair cost?",
      answer:
        "Garage door repair costs vary depending on the issue, parts needed, and labor required. Minor repairs like sensor alignment or track adjustments typically range from $100-$200, while spring replacements usually cost $150-$350. Opener repairs range from $150-$450 depending on the problem. We always provide a detailed estimate before beginning any work.",
    },
    {
      question: "How long does a typical garage door repair take?",
      answer:
        "Most standard garage door repairs can be completed in 1-2 hours. Spring replacements, opener repairs, and track adjustments typically take 60-90 minutes. More complex issues or full door replacements may take 3-5 hours. Our technicians work efficiently to minimize disruption to your day.",
    },
    {
      question: "Do you offer emergency garage door repair services?",
      answer:
        "Yes, we offer 24/7 emergency garage door repair services throughout South Florida. If your door is stuck open, won't close, or poses a security risk, we consider it an emergency and will prioritize your service call. Our technicians are available evenings, weekends, and holidays for urgent repairs.",
    },
    {
      question: "How often should garage door springs be replaced?",
      answer:
        "Garage door springs typically last 7-10 years or approximately 10,000 cycles (opening and closing). If you use your garage door multiple times daily, springs may need replacement sooner. Signs that springs need replacement include visible gaps or stretching in the springs, door closing unevenly, or difficulty opening manually.",
    },
    {
      question: "Can I repair my garage door myself?",
      answer:
        "While minor maintenance like lubricating parts or replacing weather stripping can be DIY projects, we strongly advise against attempting to repair springs, cables, or openers yourself. These components are under high tension and can cause serious injury if mishandled. Professional technicians have the proper tools, parts, and training to safely repair garage doors.",
    },
    {
      question: "Do you provide warranties on your repairs?",
      answer:
        "Yes, we stand behind our work with solid warranties. All our repairs come with a 90-day labor warranty. Additionally, most replacement parts carry manufacturer warranties ranging from 1-5 years depending on the component. New garage door installations include comprehensive warranties on both parts and labor. We'll explain all warranty details before completing your repair.",
    },
  ]

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our garage door repair services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className={`flex justify-between items-center w-full p-4 text-left font-medium transition-colors ${
                    openIndex === index ? "bg-primary-50 text-primary-700" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-4 bg-white border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary-50 rounded-xl p-6 border border-primary-100">
            <h3 className="text-xl font-bold text-primary-600 mb-4 text-center">Still have questions?</h3>
            <p className="text-gray-600 text-center mb-6">
              Our team is ready to answer any questions you may have about our garage door services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+13213669723"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
                onClick={handlePhoneClick}
                data-call-tracking="true"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </a>
              <Link
                href="#booking"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
