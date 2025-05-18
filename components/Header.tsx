"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, Calendar, Wrench, AlertTriangle, Star, HelpCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { trackPhoneCall } from "@/lib/dataLayer" // Updated import
import { SkipToContent, FocusTrap } from "./A11y"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Track scroll position for transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handlePhoneClick = useCallback(() => {
    // Updated to use trackPhoneCall from dataLayer
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

  // Update the navItems array to include icons and link to homepage sections
  const navItems = [
    { name: "Garage Door Repair", path: "/#services", icon: <Wrench className="h-4 w-4 mr-2" aria-hidden="true" /> },
    {
      name: "Problems We Solve",
      path: "/#issues",
      icon: <AlertTriangle className="h-4 w-4 mr-2" aria-hidden="true" />,
    },
    { name: "Reviews", path: "/#testimonials", icon: <Star className="h-4 w-4 mr-2" aria-hidden="true" /> },
    { name: "FAQ", path: "/#faq", icon: <HelpCircle className="h-4 w-4 mr-2" aria-hidden="true" /> },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-primary-600/75 backdrop-blur-sm" : "bg-primary-600"} py-5`}
    >
      <SkipToContent contentId="main-content" />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Palm Tree Garage Door Repair - Home">
            <Image src="/logo.png" alt="Palm Tree Garage Door Repair" width={60} height={60} className="h-auto w-14" />
          </Link>

          <div className="hidden md:flex items-center">
            <nav className="flex items-center mr-4" aria-label="Main Navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="text-white hover:text-accent-300 font-medium flex items-center mr-5 focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-primary-600 rounded-md px-2 py-1"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <Link
                href="#booking"
                className="flex items-center bg-white hover:bg-gray-100 text-primary-600 font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                aria-label="Book a service appointment"
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

          <button
            className="md:hidden text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-300 focus:ring-offset-2 focus:ring-offset-primary-600"
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

      {/* Mobile menu */}
      <FocusTrap isActive={isMenuOpen} onEscape={() => setIsMenuOpen(false)}>
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden bg-primary-700 py-4 px-4 absolute w-full z-50 transition-all duration-300 ${
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
          aria-hidden={!isMenuOpen}
          role="navigation"
        >
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-white hover:text-accent-300 font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-accent-300 rounded-md px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-3">
              <Link
                href="#booking"
                className="flex items-center justify-center bg-white hover:bg-gray-100 text-primary-600 font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Book a service appointment"
              >
                <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Book Now</span>
              </Link>

              <Link
                href="tel:+13213669723"
                className="flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-accent-300"
                onClick={() => {
                  handlePhoneClick()
                  setIsMenuOpen(false)
                }}
                data-call-tracking="true"
                aria-label="Call us at (321) 366-9723"
              >
                <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>
                  <span className="font-medium">Call:</span> (321) 366-9723
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </FocusTrap>
    </header>
  )
}
