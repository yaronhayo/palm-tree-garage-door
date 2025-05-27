"use client"

import {
  AlertTriangle,
  ArrowRight,
  Phone,
  Wrench,
  SlidersHorizontal,
  Zap,
  Volume2,
  Clock,
  CloudRain,
  Calendar,
} from "lucide-react"

export default function CommonIssuesSection() {
  const commonIssues = [
    {
      title: "Broken Springs",
      description:
        "Springs are under high tension and can break due to wear and tear. This is one of the most common issues and requires professional repair.",
      warning: "Never attempt to repair garage door springs yourself - they can cause serious injury.",
      icon: <Wrench className="h-8 w-8 text-primary-600" />,
    },
    {
      title: "Door Off Track",
      description:
        "Garage doors can come off their tracks due to impact, worn rollers, or misalignment. This prevents proper operation and needs immediate attention.",
      warning: "A door off track can fall and cause damage or injury if not properly secured.",
      icon: <SlidersHorizontal className="h-8 w-8 text-primary-600" />,
    },
    {
      title: "Opener Malfunctions",
      description:
        "Issues with the garage door opener can include motor failure, remote control problems, or sensor misalignment.",
      warning: "Always ensure safety sensors are working properly to prevent door closure accidents.",
      icon: <Zap className="h-8 w-8 text-primary-600" />,
    },
    {
      title: "Noisy Operation",
      description:
        "Excessive noise during operation often indicates worn parts, loose hardware, or lack of lubrication.",
      warning: "Ignoring unusual noises can lead to more serious mechanical failures.",
      icon: <Volume2 className="h-8 w-8 text-primary-600" />,
    },
    {
      title: "Slow Response",
      description:
        "If your door is slow to respond to controls or moves sluggishly, it may indicate motor problems or track obstructions.",
      warning: "Slow operation can worsen over time and lead to complete failure.",
      icon: <Clock className="h-8 w-8 text-primary-600" />,
    },
    {
      title: "Weather Damage",
      description:
        "Exposure to harsh weather can damage door panels, seals, and hardware, affecting insulation and operation.",
      warning: "Water intrusion can damage your garage contents and lead to mold growth.",
      icon: <CloudRain className="h-8 w-8 text-primary-600" />,
    },
  ]

  return (
    <section id="common-issues" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Add a new anchor point right after the emergency container */}
        <div id="door-problems" className="pt-4"></div>

        {/* Common Issues Heading - Now after the emergency section */}
        <div id="garage-issues" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Common Garage Door Issues</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Recognize these common problems? Our technicians can diagnose and fix these issues quickly and affordably.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commonIssues.map((issue, index) => (
            <div
              key={issue.title}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary-600/10 p-3 rounded-full mr-4 flex-shrink-0">{issue.icon}</div>
                <h3 className="text-xl font-bold text-primary-600">{issue.title}</h3>
              </div>
              <p className="text-gray-600 mb-4 flex-grow">{issue.description}</p>
              <div className="flex items-start bg-amber-50 p-4 rounded-lg border border-amber-100">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-700">{issue.warning}</p>
              </div>
            </div>
          ))}
        </div>

        {/* New CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-600 mb-6">Experiencing any of these issues?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Don't wait until a small problem becomes a major repair. Our expert technicians can diagnose and fix your
              garage door issues quickly and affordably.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+13213669723"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                data-call-tracking="true"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
              <a
                href="#booking"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault()
                  const bookingSection = document.getElementById("booking")
                  if (bookingSection) {
                    const headerOffset = 80 // Adjust based on your header height
                    const elementPosition = bookingSection.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    })
                  }
                }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule your service
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
