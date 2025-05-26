import { Suspense } from "react"
import HeroSection from "@/components/HeroSection"
import ServicesGrid from "@/components/ServicesGrid"
import dynamic from "next/dynamic"

// Enhanced lazy loading with better loading states - removed ssr option
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

// Improved loading placeholder with label for better UX
const SectionPlaceholder = ({ label }: { label: string }) => (
  <div className="w-full py-16 bg-gray-100 animate-pulse rounded-lg">
    <div className="max-w-md mx-auto h-8 bg-gray-200 rounded mb-4"></div>
    <div className="max-w-sm mx-auto h-4 bg-gray-200 rounded"></div>
    <div className="sr-only">{label} section loading...</div>
  </div>
)

export default function Home() {
  return (
    <>
      {/* Critical above-the-fold content loaded immediately */}
      <HeroSection />
      <ServicesGrid />

      {/* Lazy load below-the-fold content with improved Suspense boundaries */}
      <Suspense fallback={<SectionPlaceholder label="Why Choose Us" />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder label="Common Issues" />}>
        <CommonIssuesSection />
      </Suspense>

      <EmergencyServiceSection />

      <Suspense fallback={<SectionPlaceholder label="Testimonials" />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder label="Service Areas" />}>
        <ServiceAreas />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder label="FAQ" />}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={<SectionPlaceholder label="Booking" />}>
        <BookingSection />
      </Suspense>
    </>
  )
}
