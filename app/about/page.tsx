import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Phone, CheckCircle, Award, Users } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
  title: "About Us",
  description:
    "Learn about Palm Tree Garage Door Repair - your trusted garage door service provider in Central Florida.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Palm Tree Garage Door</h1>
              <p className="text-xl text-gray-200 mb-8">Your trusted garage door service provider in Central Florida</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Palm Tree Garage Door was founded in 2010 with a simple mission: to provide honest, reliable, and
                  high-quality garage door services to homeowners and businesses throughout Central Florida.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  What started as a small family business has grown into one of the most trusted garage door service
                  providers in the region, but we've never lost sight of our core values - integrity, quality
                  workmanship, and exceptional customer service.
                </p>
                <p className="text-lg text-gray-600">
                  Today, we're proud to serve thousands of satisfied customers across Orlando, Kissimmee, Winter Park,
                  and surrounding areas, providing everything from emergency repairs to new door installations and
                  regular maintenance.
                </p>
              </div>
              <div className="order-first md:order-last">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20High%20Quality-Photoroom-WyXaAcwAxsaLeDj75ZUFM1jehgHUIX.png"
                  alt="Palm Tree Garage Door Logo"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Integrity</h3>
                <p className="text-gray-600">
                  We believe in honest pricing, transparent communication, and doing what's right for our customers,
                  even when it's not the most profitable option.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Quality</h3>
                <p className="text-gray-600">
                  We never cut corners. From the products we install to the repairs we perform, quality is at the heart
                  of everything we do.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-primary-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">Customer Service</h3>
                <p className="text-gray-600">
                  We treat every customer like family, providing respectful, attentive service and going above and
                  beyond to ensure complete satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600">Skilled professionals dedicated to providing exceptional service</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_9077-VUBtBcQEwPBAmZUpmo43FnV4qsaC0n.webp"
                    alt="Team Member"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-900 mb-1">John Smith</h3>
                  <p className="text-accent-600 font-medium mb-4">Founder & Lead Technician</p>
                  <p className="text-gray-600">
                    With over 15 years of experience in the garage door industry, John leads our team with expertise and
                    dedication to quality.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-900 mb-1">Sarah Johnson</h3>
                  <p className="text-accent-600 font-medium mb-4">Customer Service Manager</p>
                  <p className="text-gray-600">
                    Sarah ensures that every customer receives prompt, friendly service and that all their needs are met
                    with care.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-900 mb-1">Mike Rodriguez</h3>
                  <p className="text-accent-600 font-medium mb-4">Senior Technician</p>
                  <p className="text-gray-600">
                    Mike specializes in complex repairs and installations, bringing technical expertise and
                    problem-solving skills to every job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-900 mb-4">Why Choose Palm Tree Garage Door</h2>
              <p className="text-lg text-gray-600">What sets us apart from other garage door companies</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-accent-500 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Licensed & Insured</h3>
                  <p className="text-gray-600">
                    We're fully licensed and insured, giving you peace of mind that your property is protected and your
                    work is being done by qualified professionals.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent-500 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Experienced Technicians</h3>
                  <p className="text-gray-600">
                    Our technicians have years of experience and undergo regular training to stay up-to-date with the
                    latest garage door technologies and techniques.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent-500 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">24/7 Emergency Service</h3>
                  <p className="text-gray-600">
                    Garage door problems don't wait for business hours, and neither do we. We're available 24/7 for
                    emergency repairs when you need us most.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent-500 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Satisfaction Guaranteed</h3>
                  <p className="text-gray-600">
                    We stand behind our work with a satisfaction guarantee. If you're not happy with our service, we'll
                    make it right.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent-500 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Competitive Pricing</h3>
                  <p className="text-gray-600">
                    We offer fair, transparent pricing with no hidden fees or surprise charges. We'll always provide a
                    detailed estimate before starting any work.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent-500 rounded-full p-2 flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary-900" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">Quality Products</h3>
                  <p className="text-gray-600">
                    We only use high-quality parts and products from trusted manufacturers, ensuring your garage door
                    will function reliably for years to come.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Experience the Palm Tree Difference?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Contact us today to schedule a service or get a free quote</p>
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
