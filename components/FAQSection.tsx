"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Phone, Calendar, Plus } from "lucide-react"
import Link from "next/link"
import { trackPhoneCall } from "@/lib/analytics"

type FAQ = {
  question: string
  answer: string
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [visibleCount, setVisibleCount] = useState(6)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handlePhoneClick = () => {
    trackPhoneCall("3213669723", "faq_section")
  }

  const loadMoreFaqs = () => {
    setVisibleCount((prev) => Math.min(prev + 6, faqs.length))
  }

  const faqs = [
    {
      question: "What are the benefits of insulated garage doors?",
      answer:
        "Insulated doors provide energy efficiency (especially important in Florida's climate), noise reduction, increased durability, and improved temperature control in the garage. They're particularly beneficial if your garage is attached to your home or if you use the space for activities beyond parking. We offer a range of insulated options with different R-values to suit your needs.",
    },
    {
      question: "How do I manually open my garage door during a power outage?",
      answer:
        "Locate the emergency release cord (usually a red rope hanging from the opener trolley), pull it down to disconnect the door from the opener, and then manually lift the door. Important safety note: Only do this when the door is fully closed to prevent it from falling rapidly. If you're unsure, we can demonstrate this important safety procedure during a service call.",
    },
    {
      question: "Do you offer emergency garage door repair services?",
      answer:
        "Yes, we offer 24/7 emergency garage door repair services throughout South Florida. If your door is stuck open, won't close, or poses a security risk, we consider it an emergency and will prioritize your service call. Our technicians are available evenings, weekends, and holidays for urgent repairs.",
    },
    {
      question: "What should I do if my garage door is making unusual noises?",
      answer:
        "Different noises indicate different problems: grinding often means track issues, popping suggests spring or hinge problems, and rattling typically indicates loose hardware. First, ensure all hardware is tight. If noises persist, it's best to have a professional inspection as continuing to use a problematic door can lead to more extensive damage or safety hazards.",
    },
    {
      question: "How long does a typical garage door repair take?",
      answer:
        "Most standard garage door repairs can be completed in 1-2 hours. Spring replacements, opener repairs, and track adjustments typically take 60-90 minutes. More complex issues or full door replacements may take 3-5 hours. Our technicians work efficiently to minimize disruption to your day.",
    },
    {
      question: "What smart garage door features do you offer?",
      answer:
        "We install and service smart garage systems that allow remote operation and monitoring via smartphone, integration with home automation systems (like Alexa, Google Home, and HomeKit), real-time alerts when the door opens or closes, scheduled operations, and access management for multiple users. These features provide convenience, enhanced security, and peace of mind, especially for rental properties or when traveling.",
    },
    {
      question: "How do I choose the right garage door for my home?",
      answer:
        "Consider these factors: architectural style of your home, desired insulation value, maintenance requirements, budget, and local climate considerations. Our design consultants can help you navigate options including steel, aluminum, wood, and composite materials, as well as various panel designs, window options, and hardware styles to complement your home's aesthetic.",
    },
    {
      question: "Can I repair my garage door myself?",
      answer:
        "While minor maintenance like lubricating parts or replacing weather stripping can be DIY projects, we strongly advise against attempting to repair springs, cables, or openers yourself. These components are under high tension and can cause serious injury if mishandled. Professional technicians have the proper tools, parts, and training to safely repair garage doors.",
    },
    {
      question: "How secure are modern garage doors?",
      answer:
        "Modern garage doors offer excellent security when properly installed and maintained. Today's openers use rolling code technology that changes the access code after each use, preventing code capturing. Additional security features include vacation mode (disables remote operation), automatic closing timers, and smart features allowing you to monitor and control your door remotely. We can help you select the best security options for your needs.",
    },
    {
      question: "Do you offer special discounts?",
      answer:
        "Yes, we offer special discounts for seniors, veterans, and first responders. We also run seasonal promotions throughout the year. All our current offers will be explained during your free estimate, or feel free to ask about applicable discounts when you call to schedule service.",
    },
    {
      question: "How often should garage door springs be replaced?",
      answer:
        "Garage door springs typically last 7-10 years or approximately 10,000 cycles (opening and closing). If you use your garage door multiple times daily, springs may need replacement sooner. Signs that springs need replacement include visible gaps or stretching in the springs, door closing unevenly, or difficulty opening manually.",
    },
    {
      question: "What maintenance should I perform on my garage door?",
      answer:
        "Regular maintenance includes: lubricating moving parts (hinges, rollers, springs) with silicone-based lubricant every 3-6 months, tightening hardware, testing the auto-reverse safety feature monthly, inspecting cables and springs for wear (visual inspection only), and keeping tracks clean. We also offer annual maintenance plans that include comprehensive inspections and preventative care.",
    },
    {
      question: "How quickly can you respond to an emergency garage door issue?",
      answer:
        "We offer 24/7 emergency service with typical response times of 1-2 hours throughout South Florida. For urgent situations like a door stuck open or security concerns, we prioritize your call and dispatch the nearest available technician immediately.",
    },
    {
      question: "What causes garage door cables to break?",
      answer:
        "Cables typically break due to normal wear and tear, rust/corrosion, improper installation, or sudden strain (like when springs break). Warning signs include fraying, visible wear spots, or unusual door operation. Cables should always be replaced in pairs by professionals, as they're under extreme tension and can cause serious injury if mishandled.",
    },
    {
      question: "Do you provide warranties on your repairs?",
      answer:
        "Yes, we provide a lifetime warranty on all parts we install. Our labor is covered by a comprehensive warranty as well. New garage door installations include both manufacturer warranties and our own service guarantee. We'll explain all warranty details before completing your repair.",
    },
    {
      question: "How do extreme weather conditions affect my garage door?",
      answer:
        "Florida's heat, humidity, and occasional severe weather can impact garage doors through warping, rusting, deterioration of weather seals, and stress on mechanical components. Salt air in coastal areas accelerates corrosion. We recommend doors with appropriate weather resistance, regular maintenance to prevent weather-related issues, and storm-rated doors in hurricane-prone areas.",
    },
    {
      question: "What should I do if my garage door won't close completely?",
      answer:
        "First, check for obstructions blocking the safety sensors (usually located near the floor on both sides of the door). Clean the sensor lenses and ensure they're properly aligned (indicator lights should be steady, not blinking). Also check for debris in the tracks. If these steps don't resolve the issue, the close limit switch may need adjustment or there could be a mechanical problem requiring professional service.",
    },
    {
      question: "How do I know if my garage door springs are broken?",
      answer:
        "Signs of broken springs include: a loud banging noise when the door is in operation, the door opening unevenly or jerking during movement, the door falling rapidly when closing, or the garage door opener straining to lift the door. If you notice any of these symptoms, it's best to call a professional immediately as continuing to use the door could cause further damage.",
    },
    {
      question: "Can you match my existing garage door if I only need to replace one?",
      answer:
        "In many cases, yes. We work with a wide range of manufacturers and can often match existing doors, particularly newer models. For older doors, we can sometimes find suitable replacements or recommend options that will complement your remaining door. During your free estimate, we'll assess the feasibility of matching and present all available options.",
    },
    {
      question: "How long should a garage door opener last?",
      answer:
        "Most quality garage door openers last 10-15 years with proper maintenance. Factors affecting lifespan include frequency of use, quality of the unit, and environmental conditions. Signs you may need a replacement include increased noise, intermittent operation, or safety features not working properly. We can help you determine if repair or replacement is the better option.",
    },
    {
      question: "Do you offer free estimates for garage door replacement?",
      answer:
        "Yes, we provide free, no-obligation on-site estimates for all garage door replacements and installations. Our technician will measure your opening, discuss style and material options, review insulation choices, and provide a detailed written estimate. We never use high-pressure sales tactics and are happy to answer all your questions.",
    },
    {
      question: "How do garage door safety sensors work?",
      answer:
        "Safety sensors use an invisible infrared beam across the door opening. If anything breaks this beam while the door is closing, the door automatically reverses to prevent entrapment. This is a critical safety feature required on all openers manufactured since 1993. We check sensor function during every service call and can replace or upgrade malfunctioning safety systems.",
    },
    {
      question: "What are the signs that my garage door tracks need adjustment?",
      answer:
        "Signs include: the door making grinding or scraping noises, visible gaps between rollers and track, door movement appearing jerky or uneven, or the door getting stuck at certain points. Misaligned tracks can cause significant damage if not addressed promptly. Our technicians can quickly diagnose and correct track alignment issues.",
    },
    {
      question: "How do I program a new garage door remote?",
      answer:
        "Programming varies by opener brand, but typically involves pressing the learn button on your opener unit, then pressing the button on your remote within 30 seconds. For specific instructions for your model, we can guide you through the process over the phone or during a service call. We also provide programming for all remotes we sell or install.",
    },
    {
      question: "What's the difference between belt drive and chain drive openers?",
      answer:
        "Belt drive openers use a reinforced belt instead of a metal chain, resulting in significantly quieter operation. They're ideal for homes with living spaces adjacent to or above the garage. Chain drives are typically more economical and extremely durable, but produce more noise. Both types offer similar reliability and lifting power. We can demonstrate the difference to help you choose.",
    },
    {
      question: "Are your technicians certified and insured?",
      answer:
        "Yes, all our technicians are fully certified, licensed, and insured. They undergo rigorous training and certification processes, including manufacturer-specific training for major brands. We carry comprehensive liability insurance and workers' compensation coverage for your protection and peace of mind.",
    },
    {
      question: "How can I make my garage door more energy efficient?",
      answer:
        "Improve energy efficiency by: installing an insulated door (R-value 9 or higher recommended for Florida), adding or replacing weatherstripping around the perimeter, installing a bottom seal to prevent air infiltration, insulating the back of the door if replacement isn't an option, and ensuring proper door alignment so it seals correctly when closed. These improvements can help reduce energy costs and improve comfort.",
    },
    {
      question: "What's involved in converting a manual garage door to an automatic one?",
      answer:
        "The process involves installing an opener unit, connecting it to power, mounting the rail assembly, attaching the door to the opener, installing safety sensors, and programming the unit. We'll also ensure your door is properly balanced and in good condition before adding an opener. The conversion typically takes 3-4 hours and includes testing all safety features and providing operational instructions.",
    },
    {
      question: "Do you service commercial garage doors?",
      answer:
        "Yes, we provide comprehensive service for commercial overhead doors, including high-cycle doors, fire doors, rolling steel doors, and high-speed doors. Our commercial services include preventative maintenance programs, emergency repairs, safety inspections, and complete installations. We understand the importance of minimizing downtime for your business operations.",
    },
    {
      question: "How do I prepare for a garage door installation?",
      answer:
        "Clear the area around the garage door (inside and outside), ensure electrical outlets are accessible, remove items hanging on walls near the door tracks, and secure or remove items stored near the ceiling where the opener will be installed. Plan for the installation to take 4-6 hours during which you won't have access to the garage. Our team will handle all the heavy lifting and clean up after the installation.",
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
            {faqs.slice(0, visibleCount).map((faq, index) => (
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

          {visibleCount < faqs.length && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMoreFaqs}
                className="bg-primary-50 hover:bg-primary-100 text-primary-700 font-medium py-3 px-6 rounded-md transition-all duration-300 flex items-center mx-auto"
              >
                <Plus className="mr-2 h-5 w-5" />
                Show More Questions
              </button>
            </div>
          )}

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
                href="/#booking"
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
