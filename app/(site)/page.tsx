import { Suspense } from "react"
import HeroSection from "@/components/HeroSection"
import ServicesGrid from "@/components/ServicesGrid"
import SchemaMarkup from "@/components/SchemaMarkup"

// Enhanced lazy loading with better loading states
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  loading: () => <SectionPlaceholder label="Why Choose Us" />,
})

const CommonIssuesSection = dynamic(() => import("@/components/CommonIssuesSection"), {
  loading: () => <SectionPlaceholder label="Common Issues" />,
})

const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"), {
  loading: () => <SectionPlaceholder label="Testimonials" />,
})

const ServiceAreas = dynamic(() => import("@/components/ServiceAreas"), {
  loading: () => <SectionPlaceholder label="Service Areas" />,
})

const FAQSection = dynamic(() => import("@/components/FAQSection"), {
  loading: () => <SectionPlaceholder label="FAQ" />,
})

const BookingSection = dynamic(() => import("@/components/BookingSection"), {
  loading: () => <SectionPlaceholder label="Booking" />,
})

// Import EmergencyServiceSection normally since it's relatively small
import EmergencyServiceSection from "@/components/EmergencyServiceSection"
import dynamic from "next/dynamic"

// Improved loading placeholder with label for better UX
const SectionPlaceholder = ({ label }: { label: string }) => (
  <div className="w-full py-16 bg-gray-100 animate-pulse rounded-lg">
    <div className="max-w-md mx-auto h-8 bg-gray-200 rounded mb-4"></div>
    <div className="max-w-sm mx-auto h-4 bg-gray-200 rounded"></div>
    <div className="sr-only">{label} section loading...</div>
  </div>
)

// Metadata for the page
export const metadata = {
  title: "Palm Tree Garage Door Repair | South Florida's Trusted Garage Door Experts",
  description:
    "Professional garage door repair and installation services in South Florida. 24/7 emergency service, free estimates, and expert technicians for all garage door needs.",
  alternates: {
    canonical: "https://palmtreegaragedoor.com",
  },
}

export default function Home() {
  return (
    <>
      {/* Critical above-the-fold content loaded immediately */}
      <HeroSection />

      <section id="services">
        <ServicesGrid />
      </section>

      {/* Lazy load below-the-fold content with improved Suspense boundaries */}
      <Suspense fallback={<SectionPlaceholder label="Why Choose Us" />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder label="Common Issues" />}>
        <section id="common-issues">
          <CommonIssuesSection />
        </section>
      </Suspense>

      <EmergencyServiceSection />

      <Suspense fallback={<SectionPlaceholder label="Testimonials" />}>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
      </Suspense>

      <Suspense fallback={<SectionPlaceholder label="Service Areas" />}>
        <section id="service-areas">
          <ServiceAreas />
        </section>
      </Suspense>

      <Suspense fallback={<SectionPlaceholder label="FAQ" />}>
        <section id="faq">
          <FAQSection />
        </section>
      </Suspense>

      <Suspense fallback={<SectionPlaceholder label="Booking" />}>
        <section id="booking">
          <BookingSection />
        </section>
      </Suspense>

      {/* Enhanced schema markup with active section tracking */}
      <SchemaMarkup page="home" activeSection={null} />
    </>
  )
}
