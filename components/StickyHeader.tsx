"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"

export default function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 10)
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary-600/25 backdrop-blur-md py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          {!logoError ? (
            <Image
              src="/logo.png"
              alt="Palm Tree Garage Door Repair"
              width={160}
              height={60}
              className="h-12 w-auto"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="h-12 flex items-center">
              <span className="text-white font-bold text-xl">Palm Tree Garage Door</span>
            </div>
          )}
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="tel:+13213669723"
            className="hidden md:flex items-center text-white hover:text-accent-500 transition-colors"
          >
            <Phone className="mr-2 h-5 w-5" />
            <span className="font-bold">(321) 366-9723</span>
          </a>

          <a
            href="tel:+13213669723"
            className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md transition-colors inline-flex items-center group"
          >
            <span className="animate-pulse-on-hover">Call Now</span>
          </a>
        </div>
      </div>
    </header>
  )
}
