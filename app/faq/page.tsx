import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FAQAccordion from "@/components/FAQAccordion"
import FAQSchema from "@/components/FAQSchema"

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about garage door repair, installation, and maintenance.",
}

// FAQ data
const faqItems = [
  {
    question: "What areas do you service?",
    answer:
      "We proudly serve all of Central Florida, including Orlando, Kissimmee, Winter Park, Sanford, Lake Mary, and surrounding areas. If you're unsure if we service your area, please contact us.",
  },
  {
    question: "Do you offer emergency garage door service?",
    answer:
      "Yes, we offer 24/7 emergency garage door service. If your garage door is stuck, won't close, or has another urgent issue, call our emergency line at (321) 366-9723.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, Palm Tree Garage Door is fully licensed and insured. We carry comprehensive liability insurance and workers' compensation for all our technicians.",
  },
  {
    question: "How long has Palm Tree Garage Door been in business?",
    answer:
      "Palm Tree Garage Door has been serving Central Florida since 2010. We have over a decade of experience in garage door repair, installation, and maintenance.",
  },
  {
    question: "Do you offer warranties on your work?",
    answer:
      "Yes, we stand behind our work with warranties. We offer a 1-year warranty on labor and parts we install. Manufacturer warranties vary by product, and we'll provide all warranty information before installation.",
  },
  {
    question: "How long does a typical garage door repair take?",
    answer:
      "Most standard repairs can be completed in 1-2 hours. More complex issues might take longer. We'll provide an estimated timeframe when we assess the problem.",
  },
  {
    question: "My garage door is making noise. What could be wrong?",
    answer:
      "Noisy garage doors can be caused by several issues: loose hardware, worn rollers, lack of lubrication, or problems with the opener. Our technicians can diagnose and fix the specific cause of the noise.",
  },
  {
    question: "Can you repair any brand of garage door?",
    answer:
      "Yes, our technicians are trained to repair all major brands of garage doors and openers, including Chamberlain, LiftMaster, Genie, Amarr, Clopay, Wayne Dalton, and many others.",
  },
  {
    question: "My garage door won't close all the way. What's the problem?",
    answer:
      "This could be due to misaligned safety sensors, obstructions in the door's path, misaligned tracks, or issues with the limit settings on your opener. Our technicians can diagnose and fix the specific cause.",
  },
  {
    question: "Is it better to repair or replace my garage door?",
    answer:
      "It depends on the age and condition of your door, the extent of the damage, and the cost of repairs versus replacement. For doors over 15-20 years old with major issues, replacement might be more cost-effective in the long run. We can provide an honest assessment and recommendation.",
  },
  {
    question: "How long does it take to install a new garage door?",
    answer:
      "A standard garage door installation typically takes 3-5 hours. Custom installations or those requiring additional work may take longer. We'll provide a time estimate before beginning the installation.",
  },
  {
    question: "What types of garage doors do you offer?",
    answer:
      "We offer a wide variety of garage doors, including steel, aluminum, wood, and composite doors in various styles (traditional, carriage house, contemporary) and insulation options. We can help you choose the best door for your needs and budget.",
  },
  {
    question: "Do I need to be home during the installation?",
    answer:
      "Yes, we recommend that someone is home during the installation to answer any questions that may arise and to ensure the final result meets your expectations.",
  },
  {
    question: "Will you dispose of my old garage door?",
    answer:
      "Yes, we'll remove and properly dispose of your old garage door and hardware as part of our installation service at no additional charge.",
  },
  {
    question: "Can I install a garage door opener on my existing door?",
    answer:
      "In most cases, yes. We can install a new opener on your existing door as long as the door is in good working condition. We'll assess your door to ensure it's compatible with the opener you choose.",
  },
  {
    question: "How often should I have my garage door serviced?",
    answer:
      "We recommend professional maintenance once a year to ensure your garage door operates safely and efficiently. If you use your door frequently or have an older door, twice-yearly maintenance might be beneficial.",
  },
  {
    question: "What does a maintenance service include?",
    answer:
      "Our comprehensive maintenance service includes: inspecting and tightening all hardware, lubricating moving parts, checking spring tension, testing safety features, inspecting cables and rollers, adjusting the opener if needed, and a full safety inspection.",
  },
  {
    question: "Can I perform any maintenance myself?",
    answer:
      "Yes, there are some basic maintenance tasks homeowners can perform, such as visual inspections, cleaning tracks, and lubricating moving parts. However, we recommend leaving spring adjustments and other technical tasks to professionals for safety reasons.",
  },
  {
    question: "How can I extend the life of my garage door?",
    answer:
      "Regular maintenance, prompt repairs of minor issues, keeping tracks clean, lubricating moving parts, and avoiding hitting the door with your vehicle are all ways to extend your garage door's lifespan.",
  },
  {
    question: "Do you offer maintenance plans?",
    answer:
      "Yes, we offer annual and semi-annual maintenance plans that include priority scheduling, discounted rates, and comprehensive service. Contact us for details on our maintenance plan options.",
  },
  {
    question: "How much does garage door repair cost?",
    answer:
      "Repair costs vary depending on the specific issue, parts needed, and the type of door. Minor repairs typically range from $150-$350, while more complex repairs can cost more. We provide free estimates before beginning any work.",
  },
  {
    question: "How much does a new garage door cost?",
    answer:
      "New garage door prices vary widely based on material, size, style, insulation, and features. Basic single-car doors start around $800-$1,000 installed, while custom or high-end doors can cost $3,000 or more. We offer options for every budget and provide detailed quotes.",
  },
  {
    question: "Do you charge for estimates?",
    answer:
      "No, we provide free estimates for all garage door repairs, installations, and services. There's no obligation to proceed with the work after receiving an estimate.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes, we offer flexible financing options for new garage door installations and major repairs. We can discuss payment plans and financing during your consultation.",
  },
  {
    question: "Are there any additional fees I should be aware of?",
    answer:
      "We pride ourselves on transparent pricing. Your estimate will include all costs, including parts, labor, and any applicable fees. We don't add hidden charges or surprise fees after the work is completed.",
  },
]

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <FAQSchema faqs={faqItems} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
              <p className="text-xl text-gray-200 mb-8">
                Find answers to common questions about garage door repair, installation, and maintenance
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#general"
                className="px-4 py-2 rounded-md bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                General
              </a>
              <a
                href="#repairs"
                className="px-4 py-2 rounded-md bg-white border border-gray-300 text-primary-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Repairs
              </a>
              <a
                href="#installation"
                className="px-4 py-2 rounded-md bg-white border border-gray-300 text-primary-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Installation
              </a>
              <a
                href="#maintenance"
                className="px-4 py-2 rounded-md bg-white border border-gray-300 text-primary-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Maintenance
              </a>
              <a
                href="#pricing"
                className="px-4 py-2 rounded-md bg-white border border-gray-300 text-primary-700 font-medium hover:bg-gray-100 transition-colors"
              >
                Pricing
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* General FAQs */}
              <div id="general" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-primary-900 mb-6">General Questions</h2>
                <div className="space-y-4">
                  <FAQAccordion
                    question="What areas do you service?"
                    answer="We proudly serve all of Central Florida, including Orlando, Kissimmee, Winter Park, Sanford, Lake Mary, and surrounding areas. If you're unsure if we service your area, please contact us."
                  />
                  <FAQAccordion
                    question="Do you offer emergency garage door service?"
                    answer="Yes, we offer 24/7 emergency garage door service. If your garage door is stuck, won't close, or has another urgent issue, call our emergency line at (321) 366-9723."
                  />
                  <FAQAccordion
                    question="Are you licensed and insured?"
                    answer="Yes, Palm Tree Garage Door is fully licensed and insured. We carry comprehensive liability insurance and workers' compensation for all our technicians."
                  />
                  <FAQAccordion
                    question="How long has Palm Tree Garage Door been in business?"
                    answer="Palm Tree Garage Door has been serving Central Florida since 2010. We have over a decade of experience in garage door repair, installation, and maintenance."
                  />
                  <FAQAccordion
                    question="Do you offer warranties on your work?"
                    answer="Yes, we stand behind our work with warranties. We offer a 1-year warranty on labor and parts we install. Manufacturer warranties vary by product, and we'll provide all warranty information before installation."
                  />
                </div>
              </div>

              {/* Repair FAQs */}
              <div id="repairs" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-primary-900 mb-6">Repair Questions</h2>
                <div className="space-y-4">
                  <FAQAccordion
                    question="How long does a typical garage door repair take?"
                    answer="Most standard repairs can be completed in 1-2 hours. More complex issues might take longer. We'll provide an estimated timeframe when we assess the problem."
                  />
                  <FAQAccordion
                    question="My garage door is making noise. What could be wrong?"
                    answer="Noisy garage doors can be caused by several issues: loose hardware, worn rollers, lack of lubrication, or problems with the opener. Our technicians can diagnose and fix the specific cause of the noise."
                  />
                  <FAQAccordion
                    question="Can you repair any brand of garage door?"
                    answer="Yes, our technicians are trained to repair all major brands of garage doors and openers, including Chamberlain, LiftMaster, Genie, Amarr, Clopay, Wayne Dalton, and many others."
                  />
                  <FAQAccordion
                    question="My garage door won't close all the way. What's the problem?"
                    answer="This could be due to misaligned safety sensors, obstructions in the door's path, misaligned tracks, or issues with the limit settings on your opener. Our technicians can diagnose and fix the specific cause."
                  />
                  <FAQAccordion
                    question="Is it better to repair or replace my garage door?"
                    answer="It depends on the age and condition of your door, the extent of the damage, and the cost of repairs versus replacement. For doors over 15-20 years old with major issues, replacement might be more cost-effective in the long run. We can provide an honest assessment and recommendation."
                  />
                </div>
              </div>

              {/* Installation FAQs */}
              <div id="installation" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-primary-900 mb-6">Installation Questions</h2>
                <div className="space-y-4">
                  <FAQAccordion
                    question="How long does it take to install a new garage door?"
                    answer="A standard garage door installation typically takes 3-5 hours. Custom installations or those requiring additional work may take longer. We'll provide a time estimate before beginning the installation."
                  />
                  <FAQAccordion
                    question="What types of garage doors do you offer?"
                    answer="We offer a wide variety of garage doors, including steel, aluminum, wood, and composite doors in various styles (traditional, carriage house, contemporary) and insulation options. We can help you choose the best door for your needs and budget."
                  />
                  <FAQAccordion
                    question="Do I need to be home during the installation?"
                    answer="Yes, we recommend that someone is home during the installation to answer any questions that may arise and to ensure the final result meets your expectations."
                  />
                  <FAQAccordion
                    question="Will you dispose of my old garage door?"
                    answer="Yes, we'll remove and properly dispose of your old garage door and hardware as part of our installation service at no additional charge."
                  />
                  <FAQAccordion
                    question="Can I install a garage door opener on my existing door?"
                    answer="In most cases, yes. We can install a new opener on your existing door as long as the door is in good working condition. We'll assess your door to ensure it's compatible with the opener you choose."
                  />
                </div>
              </div>

              {/* Maintenance FAQs */}
              <div id="maintenance" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-primary-900 mb-6">Maintenance Questions</h2>
                <div className="space-y-4">
                  <FAQAccordion
                    question="How often should I have my garage door serviced?"
                    answer="We recommend professional maintenance once a year to ensure your garage door operates safely and efficiently. If you use your door frequently or have an older door, twice-yearly maintenance might be beneficial."
                  />
                  <FAQAccordion
                    question="What does a maintenance service include?"
                    answer="Our comprehensive maintenance service includes: inspecting and tightening all hardware, lubricating moving parts, checking spring tension, testing safety features, inspecting cables and rollers, adjusting the opener if needed, and a full safety inspection."
                  />
                  <FAQAccordion
                    question="Can I perform any maintenance myself?"
                    answer="Yes, there are some basic maintenance tasks homeowners can perform, such as visual inspections, cleaning tracks, and lubricating moving parts. However, we recommend leaving spring adjustments and other technical tasks to professionals for safety reasons."
                  />
                  <FAQAccordion
                    question="How can I extend the life of my garage door?"
                    answer="Regular maintenance, prompt repairs of minor issues, keeping tracks clean, lubricating moving parts, and avoiding hitting the door with your vehicle are all ways to extend your garage door's lifespan."
                  />
                  <FAQAccordion
                    question="Do you offer maintenance plans?"
                    answer="Yes, we offer annual and semi-annual maintenance plans that include priority scheduling, discounted rates, and comprehensive service. Contact us for details on our maintenance plan options."
                  />
                </div>
              </div>

              {/* Pricing FAQs */}
              <div id="pricing" className="mb-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-primary-900 mb-6">Pricing Questions</h2>
                <div className="space-y-4">
                  <FAQAccordion
                    question="How much does garage door repair cost?"
                    answer="Repair costs vary depending on the specific issue, parts needed, and the type of door. Minor repairs typically range from $150-$350, while more complex repairs can cost more. We provide free estimates before beginning any work."
                  />
                  <FAQAccordion
                    question="How much does a new garage door cost?"
                    answer="New garage door prices vary widely based on material, size, style, insulation, and features. Basic single-car doors start around $800-$1,000 installed, while custom or high-end doors can cost $3,000 or more. We offer options for every budget and provide detailed quotes."
                  />
                  <FAQAccordion
                    question="Do you charge for estimates?"
                    answer="No, we provide free estimates for all garage door repairs, installations, and services. There's no obligation to proceed with the work after receiving an estimate."
                  />
                  <FAQAccordion
                    question="Do you offer financing options?"
                    answer="Yes, we offer flexible financing options for new garage door installations and major repairs. We can discuss payment plans and financing during your consultation."
                  />
                  <FAQAccordion
                    question="Are there any additional fees I should be aware of?"
                    answer="We pride ourselves on transparent pricing. Your estimate will include all costs, including parts, labor, and any applicable fees. We don't add hidden charges or surprise fees after the work is completed."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="bg-primary-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary-900 mb-4">Still Have Questions?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our team is ready to help. Contact us for answers to any questions not covered here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="tel:3213669723"
                  className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center border border-gray-300"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: (321) 366-9723
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
