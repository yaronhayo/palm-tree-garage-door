"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, Calendar, Wrench, AlertTriangle, Star, HelpCircle, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import { trackPhoneCall, trackEvent, GA_EVENTS, GA_CATEGORIES } from "@/lib/analytics"

// Simple SkipToContent component
const SkipToContent = ({ contentId }: { contentId: string }) => (
  <a
    href={`#${contentId}`}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-primary-600 focus:font-bold focus:rounded-md focus:shadow-md"
  >
    Skip to content
  </a>
)

// Simple FocusTrap component
const FocusTrap = ({
  children,
  isActive,
  onEscape,
}: {
  children: React.ReactNode
  isActive: boolean
  onEscape: () => void
}) => {
  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isActive, onEscape])

  return <>{children}</>
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [logoError, setLogoError] = useState(false)
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
        const buffer = headerHeight + 50 // Additional buffer for scroll detection

        // Find the active section
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= buffer && rect.bottom > buffer) {
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

  // Track navigation events
  const handleNavigation = useCallback((path: string, sectionName: string) => {
    trackEvent({
      action: GA_EVENTS.CLICK,
      category: GA_CATEGORIES.NAVIGATION,
      label: sectionName,
      path: path,
    })
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
      document.body.classList.add("mobile-menu-open")
    } else {
      document.body.style.overflow = ""
      document.body.classList.remove("mobile-menu-open")
    }

    return () => {
      document.body.style.overflow = ""
      document.body.classList.remove("mobile-menu-open")
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

          // Track navigation
          handleNavigation(href, targetId)

          // Small delay to ensure menu closes before scrolling
          setTimeout(() => {
            // Scroll to the element
            targetElement.scrollIntoView({ behavior: "smooth" })
            // Set active section
            setActiveSection(targetId)
          }, 100)
        }
      }
    },
    [pathname, isMenuOpen, handleNavigation],
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
      path: "/#common-issues",
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

        // Track home navigation
        handleNavigation("/", "home")
      }
    },
    [pathname, handleNavigation],
  )

  // Fallback logo content if image fails to load
  const renderFallbackLogo = () => (
    <div className="flex items-center h-full">
      <div className="text-white font-bold text-xl">Palm Tree Garage Door</div>
    </div>
  )

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? "bg-primary-600/75 backdrop-blur-sm" : "bg-primary-600"} py-3`}
    >
      <SkipToContent contentId="main-content" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Palm Tree Garage Door Repair - Home"
            onClick={handleLogoClick}
          >
            {!logoError ? (
              <div className="relative w-36 h-12 xs:w-40 xs:h-14 sm:w-48 sm:h-16 md:w-56 md:h-18 lg:w-64 lg:h-20">
                <Image
                  src="/logo.png"
                  alt="Palm Tree Garage Door Repair"
                  fill
                  sizes="(max-width: 320px) 144px, (max-width: 480px) 160px, (max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                  style={{ objectFit: "contain", objectPosition: "left" }}
                  priority
                  unoptimized={true} // Add this to ensure image works in static export
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              renderFallbackLogo()
            )}
          </Link>

          <div className="hidden md:flex items-center">
            <nav className="flex items-center mr-4" aria-label="Main Navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-white hover:text-accent-300 font-medium flex items-center mr-5 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-primary-600 rounded-md px-2 py-1 whitespace-nowrap ${
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
                href="/#booking"
                className={`flex items-center bg-white hover:bg-gray-100 text-primary-600 font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 whitespace-nowrap ${
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
                className="flex items-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-primary-600 whitespace-nowrap"
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
              href="/#booking"
              className="mr-2 flex items-center bg-white hover:bg-gray-100 text-primary-600 font-bold py-2 px-2 xs:px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
              onClick={(e) => handleAnchorClick(e, "/#booking")}
              aria-label="Book a service appointment"
            >
              <Calendar className="h-4 w-4 xs:mr-1" aria-hidden="true" />
              <span className="hidden xs:inline text-sm">Book</span>
            </Link>

            <Link
              href="tel:+13213669723"
              className="mr-2 flex items-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-2 xs:px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-300"
              onClick={handlePhoneClick}
              data-call-tracking="true"
              aria-label="Call us at (321) 366-9723"
            >
              <Phone className="h-4 w-4 xs:mr-1" aria-hidden="true" />
              <span className="hidden xs:inline text-sm">Call</span>
            </Link>

            <button
              className="text-white p-1.5 xs:p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-primary-600 active:scale-95 transition-transform z-[110]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 xs:h-6 xs:w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 xs:h-6 xs:w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Full viewport overlay */}
      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
        style={{
          height: "100vh",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Mobile menu */}
      <FocusTrap isActive={isMenuOpen} onEscape={() => setIsMenuOpen(false)}>
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden fixed inset-0 z-[9999] bg-primary-700/95 backdrop-blur-sm overflow-y-auto transition-all duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isMenuOpen}
          role="navigation"
          style={{
            height: "100vh",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: isMenuOpen ? "none" : "translateY(-100%)",
          }}
        >
          {/* Close button at the top */}
          <div className="sticky top-0 left-0 right-0 bg-primary-600 p-3 xs:p-4 flex justify-between items-center z-[100]">
            {!logoError ? (
              <div className="relative w-32 h-10 xs:w-40 xs:h-12 sm:w-44 sm:h-14">
                <Image
                  src="/logo.png"
                  alt="Palm Tree Garage Door Repair"
                  fill
                  sizes="(max-width: 320px) 128px, (max-width: 480px) 160px, (max-width: 640px) 176px, 192px"
                  style={{ objectFit: "contain", objectPosition: "left" }}
                  unoptimized={true} // Add this to ensure image works in static export
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <div className="text-white font-bold text-base xs:text-lg">Palm Tree Garage Door</div>
            )}
            <button
              type="button"
              className="p-1.5 xs:p-2 text-white hover:text-accent-300 focus:outline-none focus:ring-2 focus:ring-accent-300 rounded-md"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5 xs:h-6 xs:w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="container mx-auto px-3 xs:px-4 py-4 xs:py-6">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-white hover:bg-primary-600/50 font-medium flex items-center justify-between p-3 xs:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-300 active:scale-98 transition-all whitespace-nowrap ${
                    activeSection === item.id ? "bg-primary-600/50 border-l-4 border-accent-300" : ""
                  }`}
                  onClick={(e) => {
                    handleAnchorClick(e, item.path)
                    // Force close the menu
                    setIsMenuOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    <div className="bg-primary-600/50 p-1.5 xs:p-2 rounded-full mr-2 xs:mr-3">{item.icon}</div>
                    <span className="text-base xs:text-lg">{item.name}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5 text-accent-300" aria-hidden="true" />
                </Link>
              ))}

              <div className="pt-4 xs:pt-6 space-y-3 xs:space-y-4">
                <Link
                  href="/#booking"
                  className={`flex items-center justify-between bg-white hover:bg-gray-100 text-primary-600 font-bold p-3 xs:p-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white active:scale-98 whitespace-nowrap ${
                    activeSection === "booking" ? "bg-gray-100 ring-2 ring-white" : ""
                  }`}
                  onClick={(e) => {
                    handleAnchorClick(e, "/#booking")
                    // Force close the menu
                    setIsMenuOpen(false)
                  }}
                  aria-label="Book a service appointment"
                >
                  <div className="flex items-center">
                    <div className="bg-primary-100 p-1.5 xs:p-2 rounded-full mr-2 xs:mr-3">
                      <Calendar className="h-4 w-4 xs:h-5 xs:w-5 text-primary-600" aria-hidden="true" />
                    </div>
                    <span className="text-base xs:text-lg">Book Now</span>
                  </div>
                  <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5 text-primary-400" aria-hidden="true" />
                </Link>

                <Link
                  href="tel:+13213669723"
                  className="flex items-center justify-between bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold p-3 xs:p-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-300 active:scale-98 whitespace-nowrap"
                  onClick={() => {
                    handlePhoneClick()
                    setIsMenuOpen(false)
                  }}
                  data-call-tracking="true"
                  aria-label="Call us at (321) 366-9723"
                >
                  <div className="flex items-center">
                    <div className="bg-white/20 p-1.5 xs:p-2 rounded-full mr-2 xs:mr-3">
                      <Phone className="h-4 w-4 xs:h-5 xs:w-5" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base xs:text-lg">Call Now</span>
                      <span className="text-xs xs:text-sm font-normal">(321) 366-9723</span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5 text-primary-800" aria-hidden="true" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </FocusTrap>
    </header>
  )
}
