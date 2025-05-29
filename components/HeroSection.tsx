"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Clock, Shield, Award, ArrowRight, Phone, Calendar } from "lucide-react"
import { trackPhoneCall } from "@/lib/analytics"
import dynamic from "next/dynamic"

// Lazy load the form to improve initial page load
const QuickContactForm = dynamic(() => import("./forms/QuickContactForm"), {
  loading: () => <div className="animate-pulse bg-gray-100 rounded-lg h-[400px] w-full" />,
  ssr: false,
})

// Preload critical data
const heroImageBlurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Preload form component after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handlePhoneClick = () => {
    try {
      trackPhoneCall("3213669723", "hero_section")
    } catch (error) {
      console.error("Error tracking phone call:", error)
    }
  }

  return (
    <section className="hero-section relative pt-28 sm:pt-32 pb-20" id="hero">
      {/* Optimized Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/images/service-truck.png"
            alt="Palm Tree Garage Door Repairs service truck in South Florida"
            fill
            priority
            quality={85}
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            placeholder="blur"
            blurDataURL={heroImageBlurDataURL}
            sizes="100vw"
            style={{
              objectPosition: "center 40%",
            }}
          />
          {/* Overlay with CSS instead of additional div */}
          <div className="absolute inset-0 bg-primary-900/85" />
        </div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content Column - Optimized for text rendering */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
              <span className="text-accent-500">Fast & Reliable</span> Garage Door Repair in South Florida
            </h1>

            <p className="text-lg sm:text-xl text-white/90">
              We provide 24/7 emergency service with expert technicians. We fix all garage door problems quickly and
              affordably throughout South Florida.
            </p>

            {/* Features List - Optimized structure */}
            <ul className="space-y-3">
              {[
                { icon: Shield, text: "Lifetime Warranty" },
                { icon: Clock, text: "Free Estimates" },
                { icon: Award, text: "Seniors and Veterans Discounts Available" },
              ].map(({ icon: Icon, text }, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-accent-500/20 p-2 rounded-full flex-shrink-0">
                    <Icon className="h-5 w-5 text-accent-500" />
                  </div>
                  <span className="text-base sm:text-lg text-white">{text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons - Optimized for interaction */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="tel:+13213669723"
                className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-colors duration-200 touch-target"
                onClick={handlePhoneClick}
                data-call-tracking="true"
              >
                <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                <span>Call Now</span>
              </a>

              <Link
                href="/#booking"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-primary-900 font-bold py-3 px-6 rounded-md transition-colors duration-200 touch-target"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                Book Online
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Form Column - Lazy loaded */}
          <div className="bg-white rounded-lg shadow-xl p-6 border-l-4 border-accent-500 relative">
            {showForm && <QuickContactForm />}
          </div>
        </div>
      </div>
    </section>
  )
}
