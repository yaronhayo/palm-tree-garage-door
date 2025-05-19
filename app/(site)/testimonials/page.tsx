import type { Metadata } from "next"
import Testimonials from "@/components/Testimonials"
import SchemaMarkup from "@/components/SchemaMarkup"

export const metadata: Metadata = {
  title: "Customer Testimonials | Palm Tree Garage Door Repair",
  description:
    "Read what our customers have to say about our garage door repair and installation services. Trusted by homeowners throughout South Florida.",
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen">
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-primary-900 mb-8">Customer Testimonials</h1>
          <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Don't just take our word for it. See what our customers have to say about our garage door repair and
            installation services. We're proud to have earned the trust of homeowners throughout South Florida.
          </p>
        </div>
      </div>

      <Testimonials />

      {/* Add more testimonials sections here if needed */}

      <SchemaMarkup page="testimonials" />
    </main>
  )
}
