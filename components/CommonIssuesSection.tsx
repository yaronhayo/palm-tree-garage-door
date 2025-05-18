import { CheckCircle, AlertTriangle, ArrowRight, Phone } from "lucide-react"
import OptimizedImage from "./OptimizedImage"
import Link from "next/link"
import AnimatedSection from "./AnimatedSection"
import AnimatedElement from "./AnimatedElement"

export default function CommonIssuesSection() {
  const commonIssues = [
    {
      title: "Broken Springs",
      description:
        "Springs are under high tension and can break due to wear and tear. This is one of the most common issues and requires professional repair.",
      warning: "Never attempt to repair garage door springs yourself - they can cause serious injury.",
      icon: "/images/services/spring-replacement.png",
    },
    {
      title: "Door Off Track",
      description:
        "Garage doors can come off their tracks due to impact, worn rollers, or misalignment. This prevents proper operation and needs immediate attention.",
      warning: "A door off track can fall and cause damage or injury if not properly secured.",
      icon: "/images/services/door-repair.png",
    },
    {
      title: "Opener Malfunctions",
      description:
        "Issues with the garage door opener can include motor failure, remote control problems, or sensor misalignment.",
      warning: "Always ensure safety sensors are working properly to prevent door closure accidents.",
      icon: "/images/services/opener-repair.png",
    },
    {
      title: "Noisy Operation",
      description:
        "Excessive noise during operation often indicates worn parts, loose hardware, or lack of lubrication.",
      warning: "Ignoring unusual noises can lead to more serious mechanical failures.",
      icon: "/images/services/door-repair.png",
    },
    {
      title: "Slow Response",
      description:
        "If your door is slow to respond to controls or moves sluggishly, it may indicate motor problems or track obstructions.",
      warning: "Slow operation can worsen over time and lead to complete failure.",
      icon: "/images/services/opener-repair.png",
    },
    {
      title: "Weather Damage",
      description:
        "Exposure to harsh weather can damage door panels, seals, and hardware, affecting insulation and operation.",
      warning: "Water intrusion can damage your garage contents and lead to mold growth.",
      icon: "/images/services/new-installation.png",
    },
  ]

  return (
    <AnimatedSection id="common-issues" className="py-16 bg-gradient-to-b from-white to-gray-50" variant="fade">
      <div className="container mx-auto px-4">
        {/* Emergency Service Section - Now placed at the top */}
        <AnimatedElement variant="slide-up" delay={0.1}>
          <div className="mb-16 bg-primary-600 rounded-xl overflow-hidden shadow-xl">
            <div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Emergency Garage Door Service Available 24/7
                </h3>
                <p className="text-white/90 mb-6">
                  Don't wait when you have a garage door emergency. Our technicians are available 24/7 to handle urgent
                  repairs and get your door working again quickly.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-white">
                    <CheckCircle className="h-5 w-5 text-accent-500 mr-3" />
                    <span>Fast response times throughout South Florida</span>
                  </li>
                  <li className="flex items-center text-white">
                    <CheckCircle className="h-5 w-5 text-accent-500 mr-3" />
                    <span>Fully equipped service vehicles</span>
                  </li>
                  <li className="flex items-center text-white">
                    <CheckCircle className="h-5 w-5 text-accent-500 mr-3" />
                    <span>Transparent pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-center text-white">
                    <CheckCircle className="h-5 w-5 text-accent-500 mr-3" />
                    <span>All repairs guaranteed</span>
                  </li>
                </ul>
                <a
                  href="tel:+13213669723"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center self-start"
                  data-call-tracking="true"
                >
                  Call For Emergency Service
                </a>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* Add a new anchor point right after the emergency container */}
        <div id="door-problems" className="pt-4"></div>

        {/* Common Issues Heading - Now after the emergency section */}
        <AnimatedElement variant="slide-up" delay={0.2}>
          <div id="garage-issues" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Common Garage Door Issues</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Recognize these common problems? Our technicians can diagnose and fix these issues quickly and affordably.
            </p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commonIssues.map((issue, index) => (
            <AnimatedElement key={issue.title} variant="stagger" index={index} delay={0.3}>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-600/10 p-3 rounded-full mr-4 flex-shrink-0">
                    {issue.icon ? (
                      <div className="w-8 h-8 relative">
                        <OptimizedImage src={issue.icon} alt="" fill className="object-contain" />
                      </div>
                    ) : (
                      <CheckCircle className="h-8 w-8 text-primary-600" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-primary-600">{issue.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{issue.description}</p>
                <div className="flex items-start bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700">{issue.warning}</p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        {/* New CTA Section */}
        <AnimatedElement variant="slide-up" delay={0.4}>
          <div className="mt-16 text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-600 mb-6">
                Experiencing any of these issues?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Don't wait until a small problem becomes a major repair. Our expert technicians can diagnose and fix
                your garage door issues quickly and affordably.
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
                <Link
                  href="#booking"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                >
                  Schedule Service
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </AnimatedSection>
  )
}
