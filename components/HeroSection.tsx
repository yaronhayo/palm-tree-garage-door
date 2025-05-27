"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Shield, Award, ArrowRight, Phone, Calendar } from "lucide-react"
import { trackPhoneCall } from "@/lib/analytics"
import QuickContactForm from "./forms/QuickContactForm"

export default function HeroSection() {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    if (!imageLoaded && !imageError) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          // Cap at 90% until the image actually loads
          const next = prev + (90 - prev) * 0.1
          return Math.min(next, 90)
        })
      }, 100)

      return () => clearInterval(interval)
    } else if (imageLoaded) {
      setLoadingProgress(100)
    }
  }, [imageLoaded, imageError])

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024)
    }

    // Initial check
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Safe tracking function
  const handlePhoneClick = () => {
    try {
      trackPhoneCall("3213669723", "hero_section")
    } catch (error) {
      console.error("Error tracking phone call:", error)
    }
  }

  // Get the appropriate object position based on screen size
  const getObjectPosition = () => {
    if (isMobile) {
      return "center center" // Center the subject for mobile
    } else if (isTablet) {
      return "center 30%" // Slightly higher focus for tablets
    } else {
      return "center 40%" // Standard position for desktop
    }
  }

  return (
    <section className="relative pt-28 sm:pt-32 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Loading background - brand color instead of purple */}
        <div
          className={`absolute inset-0 bg-primary-800 transition-opacity duration-500 ${
            imageLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundSize: "cover",
            backgroundPosition: getObjectPosition(),
          }}
        />

        {/* Loading progress bar */}
        <div
          className={`absolute top-0 left-0 h-1 bg-accent-500 transition-all duration-300 ${
            imageLoaded ? "opacity-0" : "opacity-100"
          }`}
          style={{ width: `${loadingProgress}%` }}
        />

        {!imageError ? (
          <div className="w-full h-full relative">
            <Image
              src="/images/service-truck.png"
              alt="Palm Tree Garage Door Repairs service truck in South Florida"
              fill
              priority
              className={`object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              sizes={isMobile ? "100vw" : isTablet ? "100vw" : "100vw"}
              quality={isMobile ? 80 : isTablet ? 85 : 90}
              onLoad={() => {
                setImageLoaded(true)
                setLoadingProgress(100)
              }}
              onError={() => {
                setImageError(true)
                setLoadingProgress(100)
              }}
              style={{ objectPosition: getObjectPosition() }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-primary-800 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-center max-w-md">
              <p className="font-medium">We couldn't load the image, but our service is still available!</p>
              <p className="text-sm mt-2 text-white/80">Please check your connection or try refreshing the page.</p>
            </div>
          </div>
        )}

        {/* Darker overlay for better text contrast */}
        <div
          className={`absolute inset-0 bg-primary-900/85 transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-70"
          }`}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              <span className="text-accent-500 animate-text-glow">Fast & Reliable</span> Garage Door Repair in South
              Florida
            </h1>

            <p className="text-lg sm:text-xl text-white mb-8">
              We provide 24/7 emergency service with expert technicians. We fix all garage door problems quickly and
              affordably throughout South Florida.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center">
                <div className="bg-accent-500/20 p-2 rounded-full mr-3 flex-shrink-0">
                  <Shield className="h-5 w-5 text-accent-500" />
                </div>
                <span className="text-base sm:text-lg text-white">Lifetime Warranty</span>
              </div>

              <div className="flex items-center">
                <div className="bg-accent-500/20 p-2 rounded-full mr-3 flex-shrink-0">
                  <Clock className="h-5 w-5 text-accent-500" />
                </div>
                <span className="text-base sm:text-lg text-white">Free Estimates</span>
              </div>

              <div className="flex items-center">
                <div className="bg-accent-500/20 p-2 rounded-full mr-3 flex-shrink-0">
                  <Award className="h-5 w-5 text-accent-500" />
                </div>
                <span className="text-base sm:text-lg text-white">Seniors and Veterans Discounts Available</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+13213669723"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
                onClick={handlePhoneClick}
                data-call-tracking="true"
              >
                <Phone className="mr-2 h-5 w-5" />
                <span>Call Now</span>
              </a>

              <Link
                href="/#booking"
                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Online
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-lg shadow-xl p-6 border-l-4 border-accent-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary-600/10 rounded-full -ml-8 -mb-8"></div>
            {typeof QuickContactForm === "function" ? (
              <QuickContactForm showBookingForm={showBookingForm} setShowBookingForm={setShowBookingForm} />
            ) : (
              <div className="p-4 text-center">
                <p className="text-gray-700">Contact form is currently unavailable.</p>
                <a
                  href="tel:+13213669723"
                  className="mt-4 inline-block bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md"
                >
                  Call Us
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
