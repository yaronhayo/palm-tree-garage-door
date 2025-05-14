import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20High%20Quality-Photoroom-WyXaAcwAxsaLeDj75ZUFM1jehgHUIX.png"
              alt="Palm Tree Garage Door Repair"
              width={180}
              height={60}
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-300 mt-4">
              Professional garage door repair and installation services. Available 24/7 for all your garage door needs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-accent-500" />
                <span>(321) 366-9723</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-accent-500" />
                <span>info@palmtreegaragedoor.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-accent-500" />
                <span>Serving all of Central Florida</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-0.5 text-accent-500" />
                <span>24/7 Emergency Service</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-accent-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-accent-500 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-accent-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-accent-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-300 hover:text-accent-500 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-accent-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-300 hover:text-accent-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-accent-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-white hover:text-accent-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-white hover:text-accent-500 transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>

            <h3 className="text-xl font-bold mt-6 mb-4">Service Areas</h3>
            <p className="text-gray-300">Orlando, Kissimmee, Winter Park, Sanford, Lake Mary, and surrounding areas</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Palm Tree Garage Door Repair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
