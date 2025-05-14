import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Project Gallery",
  description: "View our completed garage door installation and repair projects across Central Florida.",
}

// Gallery data - in a real application, this would come from a CMS or database
const galleryItems = [
  {
    id: 1,
    title: "Modern Garage Door Installation",
    description: "Custom installation of a modern aluminum and glass garage door in Winter Park.",
    category: "Installation",
    imageUrl: "/placeholder.svg?key=07b24",
  },
  {
    id: 2,
    title: "Traditional Carriage Door",
    description: "Beautiful carriage-style garage door installation for a colonial home in Orlando.",
    category: "Installation",
    imageUrl: "/placeholder.svg?key=tecs2",
  },
  {
    id: 3,
    title: "Commercial Overhead Door",
    description: "Heavy-duty commercial overhead door installation for a warehouse in Sanford.",
    category: "Commercial",
    imageUrl: "/placeholder.svg?key=knomy",
  },
  {
    id: 4,
    title: "Spring Replacement",
    description: "Emergency spring replacement service for a residential garage door in Kissimmee.",
    category: "Repair",
    imageUrl: "/placeholder.svg?key=vjqta",
  },
  {
    id: 5,
    title: "Smart Garage Door Opener",
    description: "Installation of a smart garage door opener with smartphone control in Lake Mary.",
    category: "Opener",
    imageUrl: "/smart-garage-door-opener.png",
  },
  {
    id: 6,
    title: "Custom Wood Garage Door",
    description: "Custom-built wooden garage door for a luxury home in Windermere.",
    category: "Installation",
    imageUrl: "/placeholder.svg?key=vsdjz",
  },
  {
    id: 7,
    title: "Hurricane-Resistant Door",
    description: "Installation of a hurricane-rated garage door for coastal property protection.",
    category: "Installation",
    imageUrl: "/placeholder.svg?key=th1t4",
  },
  {
    id: 8,
    title: "Multi-Door Commercial Project",
    description: "Installation of multiple commercial garage doors for a new business complex.",
    category: "Commercial",
    imageUrl: "/placeholder.svg?key=jz1fn",
  },
  {
    id: 9,
    title: "Garage Door Panel Replacement",
    description: "Replacement of damaged garage door panels for a home in Oviedo.",
    category: "Repair",
    imageUrl: "/placeholder.svg?height=600&width=800&query=garage%20door%20panel%20replacement",
  },
]

export default function GalleryPage() {
  // Group gallery items by category
  const categories = [...new Set(galleryItems.map((item) => item.category))]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Project Gallery</h1>
              <p className="text-xl text-gray-200 mb-8">
                Browse through our completed garage door projects across Central Florida
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/gallery"
                className="px-4 py-2 rounded-md bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                All Projects
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/gallery?category=${category.toLowerCase()}`}
                  className="px-4 py-2 rounded-md bg-white border border-gray-300 text-primary-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Link
                      href={`/gallery/${item.id}`}
                      className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800"
                    >
                      View Project Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-900 mb-6">Ready to Start Your Project?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your garage door needs and get a free quote for your project.
            </p>
            <Link
              href="/#contact"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center"
            >
              Get a Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
