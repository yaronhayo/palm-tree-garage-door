"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Menu, X, Calendar, ArrowRight, MapPin } from "lucide-react"
import { trackPhoneCallConversion } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 300) {
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 400)
      } else {
        setIsVisible(false)
      }

      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handlePhoneClick = () => {
    trackPhoneCallConversion("3213669723", {
      location: "sticky header",
      source: "scroll",
    })
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && !(e.target as Element).closest(".mobile-menu-container")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  // Handle anchor link clicks
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const targetId = href.replace("#", "")
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Close mobile menu if open
        if (isMenuOpen) {
          setIsMenuOpen(false)
        }

        // Scroll to element
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 right-0 bg-primary-600/95 backdrop-blur-sm shadow-md z-[100]"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-white font-bold text-lg">
                Palm Tree Garage Door
              </Link>

              <div className="flex items-center space-x-3">
                <Link
                  href="#booking"
                  className="bg-white hover:bg-gray-100 text-primary-600 font-bold py-2 px-4 rounded-md transition-colors hidden sm:flex items-center"
                  onClick={(e) => handleAnchorClick(e, "#booking")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Book Now</span>
                </Link>

                <a
                  href="tel:+13213669723"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md transition-colors flex items-center"
                  onClick={handlePhoneClick}
                  data-call-tracking="true"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">(321) 366-9723</span>
                  <span className="sm:hidden">Call</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          isVisible
            ? ""
            : scrollDirection === "down"
              ? "-translate-y-full"
              : "bg-primary-600/90 backdrop-blur-md shadow-md py-2",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-[110] hover:opacity-90 transition-all duration-300 hover:scale-105">
              <Image
                src="/logo.png"
                alt="Palm Tree Garage Door Repair"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                <Link
                  href="/#services"
                  className="text-white hover:text-accent-500 transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-500 after:transition-all hover:after:w-full"
                  onClick={(e) => handleAnchorClick(e, "#services")}
                >
                  Garage Door Repair
                </Link>
                <Link
                  href="/#door-problems"
                  className="text-white hover:text-accent-500 transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-500 after:transition-all hover:after:w-full"
                  onClick={(e) => handleAnchorClick(e, "#door-problems")}
                >
                  Common Issues
                </Link>
                <Link
                  href="/#faq"
                  className="text-white hover:text-accent-500 transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-500 after:transition-all hover:after:w-full"
                  onClick={(e) => handleAnchorClick(e, "#faq")}
                >
                  FAQ
                </Link>
                <Link
                  href="/#testimonials"
                  className="text-white hover:text-accent-500 transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent-500 after:transition-all hover:after:w-full"
                  onClick={(e) => handleAnchorClick(e, "#testimonials")}
                >
                  Testimonials
                </Link>
              </nav>

              <div className="flex items-center space-x-3">
                <a
                  href="#booking"
                  className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-2 px-4 rounded-md transition-all duration-300 flex items-center hover:shadow-lg hover:scale-105 group"
                  onClick={(e) => handleAnchorClick(e, "#booking")}
                >
                  <Calendar className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  <span>Book Now</span>
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </a>
                <a
                  href="tel:+13213669723"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md transition-all duration-300 flex items-center hover:shadow-lg hover:scale-105 group"
                  onClick={handlePhoneClick}
                  data-call-tracking="true"
                >
                  <Phone className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                  <span className="group-hover:font-extrabold">(321) 366-9723</span>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 transition-transform duration-300 hover:scale-110 active:scale-95 z-[110]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Fullscreen overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-primary-900 z-[9999] mobile-menu-container overflow-auto transition-all duration-300 ${
            isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 py-20">
            <nav className="flex flex-col space-y-6">
              <Link
                href="/#services"
                className="text-white text-2xl font-medium hover:text-accent-500 transition-all duration-300 flex items-center"
                onClick={(e) => {
                  handleAnchorClick(e, "#services")
                  setIsMenuOpen(false)
                }}
              >
                <span>Garage Door Repair</span>
                <ArrowRight className="ml-2 h-5 w-5 opacity-70" />
              </Link>
              <Link
                href="/#door-problems"
                className="text-white text-2xl font-medium hover:text-accent-500 transition-all duration-300 flex items-center"
                onClick={(e) => {
                  handleAnchorClick(e, "#door-problems")
                  setIsMenuOpen(false)
                }}
              >
                <span>Common Issues</span>
                <ArrowRight className="ml-2 h-5 w-5 opacity-70" />
              </Link>
              <Link
                href="/#faq"
                className="text-white text-2xl font-medium hover:text-accent-500 transition-all duration-300 flex items-center"
                onClick={(e) => {
                  handleAnchorClick(e, "#faq")
                  setIsMenuOpen(false)
                }}
              >
                <span>FAQ</span>
                <ArrowRight className="ml-2 h-5 w-5 opacity-70" />
              </Link>
              <Link
                href="/#testimonials"
                className="text-white text-2xl font-medium hover:text-accent-500 transition-all duration-300 flex items-center"
                onClick={(e) => {
                  handleAnchorClick(e, "#testimonials")
                  setIsMenuOpen(false)
                }}
              >
                <span>Testimonials</span>
                <ArrowRight className="ml-2 h-5 w-5 opacity-70" />
              </Link>

              <div className="pt-6 border-t border-primary-800"></div>

              <div className="flex flex-col space-y-4">
                <a
                  href="#booking"
                  className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-4 px-6 rounded-md transition-all duration-300 flex items-center justify-center hover:shadow-lg group"
                  onClick={(e) => {
                    handleAnchorClick(e, "#booking")
                    setIsMenuOpen(false)
                  }}
                >
                  <Calendar className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  <span>Book Now</span>
                  <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </a>

                <a
                  href="tel:+13213669723"
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-4 px-6 rounded-md transition-all duration-300 flex items-center justify-center hover:shadow-lg group"
                  onClick={(e) => {
                    handlePhoneClick()
                    setIsMenuOpen(false)
                  }}
                  data-call-tracking="true"
                >
                  <Phone className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  <span className="group-hover:font-extrabold">Call Now: (321) 366-9723</span>
                </a>
              </div>

              {/* Service areas teaser */}
              <div className="mt-8 bg-primary-800 rounded-lg p-6">
                <h3 className="text-white text-lg font-medium mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-accent-500" />
                  Service Areas
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary-700 text-white rounded-full text-sm">Delray Beach</span>
                  <span className="px-3 py-1 bg-primary-700 text-white rounded-full text-sm">Plantation</span>
                  <span className="px-3 py-1 bg-primary-700 text-white rounded-full text-sm">Coral Springs</span>
                  <span className="px-3 py-1 bg-primary-700 text-white rounded-full text-sm">Boca Raton</span>
                </div>
                <Link
                  href="/#service-areas"
                  className="text-accent-500 hover:text-accent-400 text-sm flex items-center"
                  onClick={(e) => {
                    handleAnchorClick(e, "#service-areas")
                    setIsMenuOpen(false)
                  }}
                >
                  View all service areas
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Contact info */}
              <div className="text-white text-sm mt-8">
                <p className="mb-2 opacity-80">24/7 Emergency Service Available</p>
                <p className="opacity-80">Palm Tree Garage Door Repair</p>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </AnimatePresence>
  )
}
