import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Star, Quote } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Customer Testimonials",
  description: "Read what our satisfied customers have to say about Palm Tree Garage Door Repair services.",
}

// Testimonial data - in a real application, this would come from a CMS or database
const testimonials = [
  {
    id: 1,
    name: "Michael S.",
    location: "Orlando, FL",
    rating: 5,
    date: "2023-10-15",
    service: "Garage Door Repair",
    content:
      "Palm Tree Garage Door came to my rescue when my garage door suddenly stopped working. They arrived within an hour and fixed the issue quickly. The technician was professional, knowledgeable, and explained everything clearly. Great service at a fair price!",
    imageUrl: "/placeholder.svg?height=100&width=100&query=person",
  },
  {
    id: 2,
    name: "Jennifer L.",
    location: "Winter Park, FL",
    rating: 5,
    date: "2023-09-22",
    service: "New Door Installation",
    content:
      "I needed a new garage door and Palm Tree made the process so easy. They helped me choose the perfect door for my home and installed it flawlessly. The team was punctual, professional, and left my garage cleaner than they found it. Highly recommend!",
    imageUrl: "/placeholder.svg?height=100&width=100&query=person",
  },
  {
    id: 3,
    name: "Robert T.",
    location: "Kissimmee, FL",
    rating: 5,
    date: "2023-08-05",
    service: "Spring Replacement",
    content:
      "Professional, punctual, and reasonably priced. The technician explained everything clearly and fixed my garage door spring quickly. I'll definitely use them again for any garage door needs!",
    imageUrl: "/placeholder.svg?height=100&width=100&query=person",
  },
  {
    id: 4,
    name: "Sarah M.",
    location: "Lake Mary, FL",
    rating: 5,
    date: "2023-07-18",
    service: "Opener Installation",
    content:
      "Palm Tree installed a new smart garage door opener for me, and I couldn't be happier. The technician took the time to show me how to use all the features and set up the app on my phone. The door operates so much quieter now!",
    imageUrl: "/placeholder.svg?height=100&width=100&query=person",
  },
  {
    id: 5,
    name: "David K.",
    location: "Sanford, FL",
    rating: 4,
    date: "2023-06-30",
    service: "Garage Door Repair",
    content:
      "My garage door was making a terrible noise every time it opened. The technician from Palm Tree diagnosed the problem quickly and had it fixed within an hour. Very professional service and reasonable pricing.",
    imageUrl: "/placeholder.svg?height=100&width=100&query=person",
  },
  {
    id: 6,
    name: "Lisa R.",
    location: "Oviedo, FL",
    rating: 5,
    date: "2023-05-12",
    service: "New Door Installation",
    content:
      "We recently had Palm Tree install a new garage door, and we're extremely pleased with the results. The door looks beautiful and operates smoothly. The installation team was professional and efficient. Great experience from start to finish!",
    imageUrl: "/placeholder.svg?height=100&width=100&query=person",
  },
  {
    id: 7,
    name: "James W.",
    location: "Altamonte Springs, FL",
    rating: 5,
    date: "2023-04-25",
    service: "Emergency Repair",
    content:
      "My garage door broke at 9 PM, and Palm Tree had a technician at my house by 10:30 PM. They fixed the issue quickly and didn't charge extra for the late-night service. That's what I call excellent customer service!",
    imageUrl: "/placeholder.svg?height=100&width=100&query=person",
  },
  {
    id: 8,
    name: "Patricia H.",
    location: "Winter Garden, FL",
    rating: 5,
    date: "2023-03-18",
    service: "Maintenance",
    content:
      "I've been using Palm Tree for annual maintenance on my garage door for the past three years. They're always on time, thorough, and professional. My door continues to operate flawlessly thanks to their preventative care.",
    imageUrl: "/placeholder.svg?height=100&width=100&query=person",
  },
  {
    id: 9,
    name: "Thomas B.",
    location: "Apopka, FL",
    rating: 4,
    date: "2023-02-09",
    service: "Panel Replacement",
    content:
      "After accidentally backing into my garage door, I needed a panel replaced. Palm Tree had the exact match for my door and replaced it quickly. You can't even tell it was damaged! Great work at a fair price.",
    imageUrl: "/placeholder.svg?height=100&width=100&query=person",
  },
]

export default function TestimonialsPage() {
  // Group testimonials by service type
  const serviceTypes = [...new Set(testimonials.map((item) => item.service))]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Customer Testimonials</h1>
              <p className="text-xl text-gray-200 mb-8">
                Read what our satisfied customers have to say about our garage door services
              </p>
              <div className="flex justify-center">
                <div className="flex items-center bg-primary-500 px-4 py-2 rounded-lg">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold">4.9 out of 5</span>
                  <span className="mx-2">•</span>
                  <span>Based on 150+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/testimonials"
                className="px-4 py-2 rounded-md bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                All Reviews
              </Link>
              {serviceTypes.map((service) => (
                <Link
                  key={service}
                  href={`/testimonials?service=${service.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-4 py-2 rounded-md bg-white border border-gray-300 text-primary-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(testimonial.date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                        {testimonial.service}
                      </span>
                    </div>
                    <div className="relative mb-6">
                      <Quote className="absolute top-0 left-0 h-8 w-8 text-primary-200 -translate-x-2 -translate-y-2 opacity-50" />
                      <p className="text-gray-600 relative z-10 pl-4">{testimonial.content}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.imageUrl || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Review Platforms */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Find Us On Review Platforms</h2>
              <p className="text-lg text-gray-600 mb-8">
                Check out our reviews on these popular platforms or leave your own review
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-center">
                    <div className="mb-2 text-yellow-500 font-bold text-xl">Google</div>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600">4.9 (98 reviews)</p>
                  </div>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-center">
                    <div className="mb-2 text-blue-600 font-bold text-xl">Facebook</div>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-blue-600 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600">4.8 (42 reviews)</p>
                  </div>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-center">
                    <div className="mb-2 text-red-600 font-bold text-xl">Yelp</div>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-red-600 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600">4.7 (35 reviews)</p>
                  </div>
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-center">
                    <div className="mb-2 text-blue-800 font-bold text-xl">BBB</div>
                    <div className="flex justify-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-blue-800 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600">A+ Rating</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Leave a Review CTA */}
        <section className="bg-primary-600 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Had a Great Experience?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We appreciate your feedback! Share your experience with Palm Tree Garage Door.
            </p>
            <Link
              href="#"
              className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center"
            >
              Leave a Review
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
