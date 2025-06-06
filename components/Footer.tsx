"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  Award,
  Shield,
  Wrench,
  AlertTriangle,
  HelpCircle,
  Star,
  Calendar,
  MapPinned,
} from "lucide-react"
import { trackPhoneCall, trackEvent, GA_EVENTS, GA_CATEGORIES } from "@/lib/analytics"
import { usePathname } from "next/navigation"
import { useState, useCallback } from "react"
import { PrivacyPolicyModal } from "./PrivacyPolicyModal"
import { TermsOfServiceModal } from "./TermsOfServiceModal"

export default function Footer() {
  const pathname = usePathname()
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false)
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false)

  const handlePhoneClick = () => {
    trackPhoneCall("3213669723", "footer")
  }

  // Track navigation events
  const handleNavigation = useCallback((path: string, sectionName: string) => {
    trackEvent({
      action: GA_EVENTS.CLICK,
      category: GA_CATEGORIES.NAVIGATION,
      label: sectionName,
      path: path,
    })
  }, [])

  const handleLogoClick = (e: React.MouseEvent) => {
    // If we're already on the homepage, prevent default and scroll to top
    if (pathname === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })

      // Track home navigation
      handleNavigation("/", "home")
    }
  }

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Only handle anchor links on the homepage
      if (pathname === "/" && href.startsWith("/#")) {
        e.preventDefault()
        const targetId = href.replace("/#", "")
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Track navigation
          handleNavigation(href, targetId)

          // Scroll to the element
          targetElement.scrollIntoView({ behavior: "smooth" })
        }
      }
    },
    [pathname, handleNavigation],
  )

  return (
    <>
      <footer className="bg-gradient-to-b from-primary-800 to-primary-900 text-white pt-16 pb-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600"></div>
        <div className="hidden lg:block absolute -left-24 top-1/3 transform -translate-y-1/2 w-64 h-64 rounded-full bg-accent-500 opacity-5"></div>
        <div className="hidden lg:block absolute -right-24 top-2/3 transform -translate-y-1/2 w-80 h-80 rounded-full bg-primary-600 opacity-5"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="inline-block mb-6" onClick={handleLogoClick}>
                <div className="relative w-56 h-20 xs:w-64 xs:h-22 sm:w-72 sm:h-24 md:w-72 md:h-24 lg:w-80 lg:h-28">
                  <Image
                    src="/logo.png"
                    alt="Palm Tree Garage Door Repair"
                    fill
                    sizes="(max-width: 480px) 224px, (max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 288px, 320px"
                    style={{ objectFit: "contain", objectPosition: "left" }}
                    unoptimized={true} // Add this to ensure image works in static export
                  />
                </div>
              </Link>
              <p className="text-gray-300 mb-6">
                Professional garage door repair and installation services. Available 24/7 for all your garage door needs
                throughout South Florida.
              </p>
              <div className="flex space-x-4 mb-6">
                <a
                  href="https://facebook.com"
                  className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full text-white hover:text-accent-500 transition-colors"
                  aria-label="Facebook"
                  onClick={() => handleNavigation("https://facebook.com", "facebook")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full text-white hover:text-accent-500 transition-colors"
                  aria-label="Instagram"
                  onClick={() => handleNavigation("https://instagram.com", "instagram")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  className="bg-primary-700 hover:bg-primary-600 p-2 rounded-full text-white hover:text-accent-500 transition-colors"
                  aria-label="Twitter"
                  onClick={() => handleNavigation("https://twitter.com", "twitter")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-primary-700 rounded-md px-3 py-2 text-xs text-gray-300 flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-accent-500" />
                  Licensed & Insured
                </div>
                <div className="bg-primary-700 rounded-md px-3 py-2 text-xs text-gray-300 flex items-center">
                  <Award className="h-4 w-4 mr-1 text-accent-500" />
                  5-Star Rated
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 mt-0.5 text-accent-500" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href="tel:+13213669723"
                      className="text-gray-300 hover:text-accent-500 transition-colors calltrk_numberswap calltrk_dnc"
                      onClick={handlePhoneClick}
                      data-call-tracking="true"
                    >
                      (321) 366-9723
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-0.5 text-accent-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:palmtreegaragedoor@gmail.com"
                      className="text-gray-300 hover:text-accent-500 transition-colors"
                      onClick={() => handleNavigation("mailto:palmtreegaragedoor@gmail.com", "email")}
                    >
                      palmtreegaragedoor@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-accent-500" />
                  <div>
                    <p className="font-medium">Service Area</p>
                    <span className="text-gray-300">Serving all of South Florida</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-0.5 text-accent-500" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <span className="text-gray-300">24/7 Emergency Service</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#services"
                    className="text-gray-300 hover:text-accent-500 transition-colors flex items-center"
                    onClick={(e) => handleAnchorClick(e, "/#services")}
                  >
                    <Wrench className="h-4 w-4 mr-2 text-accent-500" />
                    Garage Door Repair
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#common-issues"
                    className="text-gray-300 hover:text-accent-500 transition-colors flex items-center"
                    onClick={(e) => handleAnchorClick(e, "/#common-issues")}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2 text-accent-500" />
                    Problems We Solve
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#faq"
                    className="text-gray-300 hover:text-accent-500 transition-colors flex items-center"
                    onClick={(e) => handleAnchorClick(e, "/#faq")}
                  >
                    <HelpCircle className="h-4 w-4 mr-2 text-accent-500" />
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#testimonials"
                    className="text-gray-300 hover:text-accent-500 transition-colors flex items-center"
                    onClick={(e) => handleAnchorClick(e, "/#testimonials")}
                  >
                    <Star className="h-4 w-4 mr-2 text-accent-500" />
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#booking"
                    className="text-gray-300 hover:text-accent-500 transition-colors flex items-center"
                    onClick={(e) => handleAnchorClick(e, "/#booking")}
                  >
                    <Calendar className="h-4 w-4 mr-2 text-accent-500" />
                    Book Now
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Service Areas</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-300 text-sm flex items-center">
                  <MapPinned className="h-4 w-4 mr-1 text-accent-500" />
                  Delray Beach
                </div>
                <div className="text-gray-300 text-sm flex items-center">
                  <MapPinned className="h-4 w-4 mr-1 text-accent-500" />
                  Plantation
                </div>
                <div className="text-gray-300 text-sm flex items-center">
                  <MapPinned className="h-4 w-4 mr-1 text-accent-500" />
                  Coral Springs
                </div>
                <div className="text-gray-300 text-sm flex items-center">
                  <MapPinned className="h-4 w-4 mr-1 text-accent-500" />
                  Boca Raton
                </div>
                <div className="text-gray-300 text-sm flex items-center">
                  <MapPinned className="h-4 w-4 mr-1 text-accent-500" />
                  Fort Lauderdale
                </div>
                <div className="text-gray-300 text-sm flex items-center">
                  <MapPinned className="h-4 w-4 mr-1 text-accent-500" />
                  Pompano Beach
                </div>
              </div>

              {/* Emergency callout */}
              <div className="mt-6 bg-primary-700 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-accent-500" />
                  Emergency Service
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  Garage door stuck or broken? We offer 24/7 emergency service.
                </p>
                <a
                  href="tel:+13213669723"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 text-sm font-bold py-2 px-4 rounded-md transition-colors flex items-center justify-center calltrk_numberswap calltrk_dnc"
                  onClick={handlePhoneClick}
                  data-call-tracking="true"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now: (321) 366-9723
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Palm Tree Garage Door Repair. All rights reserved.</p>

            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <button
                onClick={() => setIsPrivacyPolicyOpen(true)}
                className="text-gray-400 hover:text-accent-500 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setIsTermsOfServiceOpen(true)}
                className="text-gray-400 hover:text-accent-500 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>

            <div className="mt-4 text-sm flex items-center justify-center">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500 inline" fill="currentColor" />
              <span>by</span>
              <a
                href="https://gettmarketing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-accent-500 hover:text-accent-400 transition-colors"
                onClick={() => handleNavigation("https://gettmarketing.com", "gett_marketing")}
              >
                Gett Marketing
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyPolicyModal isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)} />
      <TermsOfServiceModal isOpen={isTermsOfServiceOpen} onClose={() => setIsTermsOfServiceOpen(false)} />
    </>
  )
}
