"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wrench, Home, ArrowUpRight, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const customerTypes = [
  {
    id: "repair",
    title: "I Need Repair Service",
    description: "Fast, reliable repairs for any garage door issue",
    icon: <Wrench className="h-6 w-6" />,
    cta: "Schedule Repair",
    link: "#repair-form",
    detailedContent:
      "Our expert technicians can diagnose and fix any garage door problem quickly. We service all major brands and models with same-day service available in most areas. Our repair service includes a thorough inspection, diagnosis of the issue, transparent pricing, and a 100% satisfaction guarantee on all work performed.",
    formType: "repair",
  },
  {
    id: "new-door",
    title: "Looking to Install a New Door",
    description: "Beautiful, durable garage doors for your home",
    icon: <Home className="h-6 w-6" />,
    cta: "Explore New Doors",
    link: "#installation-form",
    detailedContent:
      "Upgrade your home with a beautiful, reliable new garage door. We offer a wide selection of styles, materials, and features to match your home perfectly. Our installation process includes a free consultation, precise measurements, removal of your old door, professional installation, and setup of all components including openers and smart home integration.",
    formType: "installation",
  },
  {
    id: "maintenance",
    title: "I Need Ongoing Maintenance",
    description: "Regular service plans to prevent costly breakdowns",
    icon: <ArrowUpRight className="h-6 w-6" />,
    cta: "View Maintenance Plans",
    link: "#maintenance-form",
    detailedContent:
      "Prevent costly repairs with our regular maintenance plans. Our technicians will inspect, adjust, and lubricate all moving parts, check safety features, test the balance, and ensure your garage door operates smoothly and safely. Choose from quarterly, bi-annual, or annual maintenance packages to keep your garage door in optimal condition year-round.",
    formType: "maintenance",
  },
]

export default function CustomerTypeSection() {
  const [activeType, setActiveType] = useState(customerTypes[0].id)

  const currentType = customerTypes.find((type) => type.id === activeType) || customerTypes[0]

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">How Can We Help You?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your situation below and we'll tailor our service to your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {customerTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={cn(
                "p-6 rounded-lg transition-all duration-300 text-left h-full",
                activeType === type.id
                  ? "bg-primary-600 text-white shadow-lg scale-105"
                  : "bg-green-50 hover:bg-green-100 hover:shadow-md text-primary-600 hover:text-primary-700 border border-green-200",
              )}
            >
              <div className="flex flex-col h-full items-center text-center">
                <div
                  className={cn(
                    "p-2 rounded-full w-12 h-12 flex items-center justify-center mb-4",
                    activeType === type.id ? "bg-white text-primary-600" : "bg-primary-100 text-primary-600",
                  )}
                >
                  {type.icon}
                </div>
                <h3 className={cn("font-bold text-lg mb-2", activeType === type.id ? "text-white" : "")}>
                  {type.title}
                </h3>
                <p className={cn("text-sm", activeType === type.id ? "text-gray-100" : "text-gray-600")}>
                  {type.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-50 rounded-lg shadow-md p-8"
        >
          <div className="flex flex-col md:flex-row md:items-start">
            <div className="md:flex-1">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">{currentType.title}</h3>
              <p className="text-gray-700 mb-6">{currentType.detailedContent}</p>

              {/* Service-specific benefits */}
              <div className="mb-6">
                <h4 className="font-semibold text-primary-600 mb-2">What's included:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentType.id === "repair" && (
                    <>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Same-day service available
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> All major brands serviced
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Upfront, transparent pricing
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> 90-day repair warranty
                      </li>
                    </>
                  )}
                  {currentType.id === "new-door" && (
                    <>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Free in-home consultation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Wide selection of styles
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Professional installation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Manufacturer warranty
                      </li>
                    </>
                  )}
                  {currentType.id === "maintenance" && (
                    <>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Regular scheduled service
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Priority scheduling
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Discounted repair rates
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-accent-500 mr-2" /> Extended warranty options
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="md:w-96 flex-shrink-0 bg-white p-6 rounded-lg shadow-sm" id={currentType.link.substring(1)}>
              <h4 className="font-bold text-lg mb-4 text-primary-600">
                Get a{" "}
                {currentType.id === "repair"
                  ? "Repair Quote"
                  : currentType.id === "new-door"
                    ? "Free Installation Estimate"
                    : "Maintenance Plan"}
              </h4>

              {/* Service-specific form */}
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input type="tel" id="phone" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input type="text" id="address" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>

                {/* Service-specific questions */}
                {currentType.id === "repair" && (
                  <div>
                    <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">
                      What issue are you experiencing?
                    </label>
                    <select id="issue" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select an issue</option>
                      <option value="door-wont-open">Door won't open</option>
                      <option value="door-wont-close">Door won't close</option>
                      <option value="noisy-operation">Noisy operation</option>
                      <option value="broken-spring">Broken spring</option>
                      <option value="off-track">Door off track</option>
                      <option value="opener-issues">Opener issues</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}

                {currentType.id === "new-door" && (
                  <>
                    <div>
                      <label htmlFor="door-type" className="block text-sm font-medium text-gray-700 mb-1">
                        What type of door are you interested in?
                      </label>
                      <select id="door-type" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">Select door type</option>
                        <option value="steel">Steel</option>
                        <option value="wood">Wood</option>
                        <option value="aluminum">Aluminum</option>
                        <option value="composite">Composite</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="door-size" className="block text-sm font-medium text-gray-700 mb-1">
                        Approximate door size
                      </label>
                      <select id="door-size" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="">Select size</option>
                        <option value="single">Single (8-9ft wide)</option>
                        <option value="double">Double (16-18ft wide)</option>
                        <option value="custom">Custom size</option>
                        <option value="not-sure">Not sure</option>
                      </select>
                    </div>
                  </>
                )}

                {currentType.id === "maintenance" && (
                  <div>
                    <label htmlFor="plan-type" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred maintenance schedule
                    </label>
                    <select id="plan-type" className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Select plan</option>
                      <option value="quarterly">Quarterly (4x/year)</option>
                      <option value="biannual">Bi-annual (2x/year)</option>
                      <option value="annual">Annual (1x/year)</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional information
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-colors"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
