"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Menu, Phone, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { trackPhoneCallConversion } from "@/lib/analytics"

interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

interface MobileNavigationProps {
  items: NavItem[]
  phoneNumber: string
  logo: React.ReactNode
}

export default function MobileNavigation({ items, phoneNumber, logo }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Toggle submenu
  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  // Track phone call
  const handlePhoneClick = () => {
    trackPhoneCallConversion(phoneNumber.replace(/\D/g, ""), {
      source: "mobile-nav",
    })
  }

  // Format phone number for display
  const formattedPhone = phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")

  return (
    <>
      {/* Mobile header */}
      <div className="flex items-center justify-between lg:hidden">
        <div className="flex-shrink-0">{logo}</div>

        <div className="flex items-center">
          <a
            href={`tel:${phoneNumber}`}
            className="mr-4 flex items-center text-white"
            onClick={handlePhoneClick}
            aria-label={`Call ${formattedPhone}`}
          >
            <Phone className="h-5 w-5 mr-1" />
            <span className="font-medium">{formattedPhone}</span>
          </a>

          <button type="button" className="p-2 text-white" onClick={() => setIsOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!isOpen}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-xs bg-white shadow-xl transition-transform transform lg:hidden overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-lg text-gray-900">Menu</div>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.label} className="py-1">
                {item.children ? (
                  <div>
                    <button
                      className={cn(
                        "flex w-full items-center justify-between py-2 text-left text-gray-900 hover:text-primary-600",
                        pathname.startsWith(item.href) && "text-primary-600 font-medium",
                      )}
                      onClick={() => toggleSubmenu(item.label)}
                      aria-expanded={expandedItems.includes(item.label)}
                    >
                      <span>{item.label}</span>
                      {expandedItems.includes(item.label) ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </button>

                    {expandedItems.includes(item.label) && (
                      <ul className="mt-2 ml-4 space-y-2 border-l-2 border-gray-200 pl-4">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className={cn(
                                "block py-2 text-gray-700 hover:text-primary-600",
                                pathname === child.href && "text-primary-600 font-medium",
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 text-gray-900 hover:text-primary-600",
                      pathname === item.href && "text-primary-600 font-medium",
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto p-4 border-t">
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center justify-center w-full py-3 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            onClick={handlePhoneClick}
          >
            <Phone className="h-5 w-5 mr-2" />
            <span className="font-medium">Call Now: {formattedPhone}</span>
          </a>
        </div>
      </div>
    </>
  )
}
