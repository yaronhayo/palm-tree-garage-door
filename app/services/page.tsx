import Link from "next/link"
import { Check, ArrowRight, Phone } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ServiceSchema from "@/components/ServiceSchema"

export const metadata = {
  title: "Our Services",
  description:
    "Professional garage door repair, installation, and maintenance services for residential and commercial properties.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <ServiceSchema
        name="Garage Door Repair and Installation Services"
        description="Professional garage door repair, installation, and maintenance services for residential and commercial properties in Central Florida."
        imageUrl="https://palmtreegaragedoor.com/services-image.jpg"
        areaServed="Central Florida"
        provider="Palm Tree Garage Door Repair"
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Garage Door Services</h1>
              <p className="text-xl text-gray-200 mb-8">
                Professional garage door solutions for residential and commercial properties
              </p>
              <Link
                href="#contact"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Service 1 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-primary-100 p-6 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-primary-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-primary-900 mb-3">Garage Door Repair</h2>
                  <p className="text-gray-600 mb-4">
                    Our expert technicians can diagnose and repair any garage door issue quickly and efficiently.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Broken spring replacement</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Cable and track repair</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Panel and section replacement</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Roller and hinge replacement</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Service 2 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-primary-100 p-6 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-primary-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-primary-900 mb-3">New Door Installation</h2>
                  <p className="text-gray-600 mb-4">
                    Upgrade your home with a new garage door that enhances curb appeal and energy efficiency.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Wide selection of styles and materials</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Insulated options for energy efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Professional measurement and installation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Removal and disposal of old door</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Service 3 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-primary-100 p-6 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-primary-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="4"></circle>
                      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                      <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                    </svg>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-primary-900 mb-3">Opener Installation & Repair</h2>
                  <p className="text-gray-600 mb-4">
                    Upgrade to a modern garage door opener or get your existing one repaired.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Belt, chain, and screw drive openers</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Smart openers with WiFi connectivity</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Battery backup options</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Keypad and remote programming</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Service 4 */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-primary-100 p-6 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-primary-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-primary-900 mb-3">Maintenance & Tune-Ups</h2>
                  <p className="text-gray-600 mb-4">
                    Regular maintenance to prevent costly repairs and extend the life of your garage door.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Lubrication of moving parts</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Hardware tightening and adjustment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Safety sensor testing and alignment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-accent-500 mr-2 mt-0.5" />
                      <span>Spring tension adjustment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-900 mb-4">Commercial Garage Door Services</h2>
              <p className="text-lg text-gray-600">
                We provide specialized services for businesses and commercial properties
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Commercial Door Installation</h3>
                <p className="text-gray-600">
                  High-quality commercial doors designed for durability and frequent use, including rolling steel doors,
                  sectional doors, and high-speed doors.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Preventative Maintenance</h3>
                <p className="text-gray-600">
                  Regular maintenance programs to minimize downtime and ensure your commercial doors operate safely and
                  efficiently year-round.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Emergency Service</h3>
                <p className="text-gray-600">
                  24/7 emergency repair service to minimize business disruption when your commercial doors malfunction
                  or break down.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today for a free quote on any of our garage door services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="tel:3213669723"
                className="bg-white hover:bg-gray-100 text-primary-900 font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: (321) 366-9723
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
