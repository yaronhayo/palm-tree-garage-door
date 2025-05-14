"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/#contact" },
  ]

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20High%20Quality-Photoroom-WyXaAcwAxsaLeDj75ZUFM1jehgHUIX.png"
              alt="Palm Tree Garage Door Repair"
              width={180}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path} className="text-primary-600 hover:text-primary-500 font-medium">
                  {item.name}
                </Link>
              ))}
            </nav>

            <Link
              href="tel:3213669723"
              className="flex items-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md transition-colors"
            >
              <Phone className="mr-2 h-4 w-4" />
              <span>(321) 366-9723</span>
            </Link>
          </div>

          <button className="md:hidden text-primary-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-primary-600 hover:text-primary-500 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="tel:3213669723"
              className="flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-2 px-4 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="mr-2 h-4 w-4" />
              <span>(321) 366-9723</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
