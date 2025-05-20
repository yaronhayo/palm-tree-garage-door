"use client"

import { useState, useEffect } from "react"
import { Phone, X, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { trackPhoneCall } from "@/lib/dataLayer"

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handlePhoneClick = () => {
    trackPhoneCall("3213669723", "floating_button")
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-primary-600">Need Help?</h3>
                  <p className="text-sm text-gray-600">Contact us for immediate assistance</p>
                </div>

                <div className="space-y-3">
                  <a
                    href="tel:+13213669723"
                    className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-medium py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center w-full calltrk_numberswap calltrk_dnc"
                    onClick={handlePhoneClick}
                    data-call-tracking="true"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    <span>Call (321) 366-9723</span>
                  </a>

                  <Link
                    href="/#booking"
                    className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center w-full"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsOpen(false)
                      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Schedule Service</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-full shadow-lg p-4 flex items-center justify-center transition-all duration-300 ${
              isOpen ? "bg-gray-700 text-white rotate-45" : "bg-accent-500 text-primary-900"
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
