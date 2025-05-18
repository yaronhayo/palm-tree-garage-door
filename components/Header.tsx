"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, Calendar, Wrench, AlertTriangle, Star, HelpCircle, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { trackPhoneCall } from "@/lib/dataLayer"
import { SkipToContent, FocusTrap } from "./A11y"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Track scroll position for transparency effect and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Only track active section on homepage
      if (pathname === "/") {
        // Determine which section is currently in view
        const sections = ["services", "common-issues", "testimonials", "faq", "booking"]
        const headerHeight = headerRef.current?.offsetHeight || 80
        const buffer = 120 // Additional buffer to account for scroll margin

        // Find the active section
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= headerHeight + buffer && rect.bottom > headerHeight) {
              setActiveSection(section)
              break
            }
          }
        }

        // If at the top of the page, no section is active
        if (window.scrollY < 100) {
          setActiveSection(null)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const handlePhoneClick = useCallback(() => {
    trackPhoneCall("3213669723", "header")
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
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

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Only handle anchor links on the homepage
      if (pathname === "/" && href.startsWith("/#")) {
        e.preventDefault()
        const targetId = href.replace("/#", "")
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          // Close mobile menu if open
          if (isMenuOpen) {
            setIsMenuOpen(false)
          }

          // Scroll to the element
          targetElement.scrollIntoView({ behavior: "smooth" })

          // Set active section
          setActiveSection(targetId)
        }
      }
    },
    [pathname, isMenuOpen],
  )

  // Navigation items with icons
  const navItems = [
    {
      name: "Garage Door Repair",
      path: "/#services",
      id: "services",
      icon: <Wrench className="h-4 w-4 mr-2" aria-hidden="true" />,
    },
    {
      name: "Problems We Solve",
      path: "/#door-problems",
      id: "common-issues",
      icon: <AlertTriangle className="h-4 w-4 mr-2" aria-hidden="true" />,
    },
    {
      name: "Reviews",
      path: "/#testimonials",
      id: "testimonials",
      icon: <Star className="h-4 w-4 mr-2" aria-hidden="true" />,
    },
    {
      name: "FAQ",
      path: "/#faq",
      id: "faq",
      icon: <HelpCircle className="h-4 w-4 mr-2" aria-hidden="true" />,
    },
  ]

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      // If we're already on the homepage, prevent default and scroll to top
      if (pathname === "/") {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: "smooth" })
        setActiveSection(null)
      }
    },
    [pathname],
  )

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-primary-600/75 backdrop-blur-sm" : "bg-primary-600"} py-5`}
    >
      <SkipToContent contentId="main-content" />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Palm Tree Garage Door Repair - Home"
            onClick={handleLogoClick}
          >
            <Image src="/logo.png" alt="Palm Tree Garage Door Repair" width={60} height={60} className="h-auto w-14" />
          </Link>

          <div className="hidden md:flex items-center">
            <nav className="flex items-center mr-4" aria-label="Main Navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-white hover:text-accent-300 font-medium flex items-center mr-5 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-primary-600 rounded-md px-2 py-1 ${
                    activeSection === item.id ? "text-accent-300 font-bold" : ""
                  }`}
                  onClick={(e) => handleAnchorClick(e, item.path)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <Link
                href="#booking"
                className={`flex items-center bg-white hover:bg-gray-100 text-primary-600 font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 ${
                  activeSection === "booking" ? "bg-gray-100 ring-2 ring-white" : ""
                }`}
                aria-label="Book a service appointment"
                onClick={(e) => handleAnchorClick(e, "/#booking")}
              >
                <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Book Now</span>
              </Link>

              <Link
                href="tel:+13213669723"
                className="flex items-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-primary-600"
                onClick={handlePhoneClick}
                data-call-tracking="true"
                aria-label="Call us at (321) 366-9723"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>
                  <span className="font-medium">Call:</span> (321) 366-9723
                </span>
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <Link
              href="tel:+13213669723"
              className="mr-3 flex items-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-300"
              onClick={handlePhoneClick}
              data-call-tracking="true"
              aria-label="Call us at (321) 366-9723"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Call Now</span>
            </Link>

            <button
              className="text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-primary-600 active:scale-95 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <FocusTrap isActive={isMenuOpen} onEscape={() => setIsMenuOpen(false)}>
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden fixed inset-0 top-0 z-50 bg-primary-700/95 backdrop-blur-sm overflow-y-auto transition-all duration-300 ${
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
          aria-hidden={!isMenuOpen}
          role="navigation"
          style={{ paddingTop: "5rem" }}
        >
          <div className="container mx-auto px-4 pt-4 pb-6">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-white hover:bg-primary-600/50 font-medium flex items-center justify-between p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-300 active:scale-98 transition-all ${
                    activeSection === item.id ? "bg-primary-600/50 border-l-4 border-accent-300" : ""
                  }`}
                  onClick={(e) => handleAnchorClick(e, item.path)}
                >
                  <div className="flex items-center">
                    <div className="bg-primary-600/50 p-2 rounded-full mr-3">{item.icon}</div>
                    <span className="text-lg">{item.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-accent-300" aria-hidden="true" />
                </Link>
              ))}

              <div className="pt-6 space-y-4">
                <Link
                  href="#booking"
                  className={`flex items-center justify-between bg-white hover:bg-gray-100 text-primary-600 font-bold p-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white active:scale-98 ${
                    activeSection === "booking" ? "bg-gray-100 ring-2 ring-white" : ""
                  }`}
                  onClick={(e) => handleAnchorClick(e, "/#booking")}
                  aria-label="Book a service appointment"
                >
                  <div className="flex items-center">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <Calendar className="h-5 w-5 text-primary-600" aria-hidden="true" />
                    </div>
                    <span className="text-lg">Book Now</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-primary-400" aria-hidden="true" />
                </Link>

                <Link
                  href="tel:+13213669723"
                  className="flex items-center justify-between bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold p-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-300 active:scale-98"
                  onClick={() => {
                    handlePhoneClick()
                    setIsMenuOpen(false)
                  }}
                  data-call-tracking="true"
                  aria-label="Call us at (321) 366-9723"
                >
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg">Call Now</span>
                      <span className="text-sm font-normal">(321) 366-9723</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-primary-800" aria-hidden="true" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </FocusTrap>
    </header>
  )
}
