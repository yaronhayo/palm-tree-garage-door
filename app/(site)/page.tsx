import type React from "react"
import { Suspense, lazy } from "react"
import HeroSection from "@/components/HeroSection"
import ServicesGrid from "@/components/ServicesGrid"

// Lazy load below-the-fold components
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"))
const CommonIssuesSection = lazy(() => import("@/components/CommonIssuesSection"))
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"))
const ServiceAreas = lazy(() => import("@/components/ServiceAreas"))
const FAQSection = lazy(() => import("@/components/FAQSection"))
const BookingSection = lazy(() => import("@/components/BookingSection"))
import EmergencyServiceSection from "@/components/EmergencyServiceSection"

// Simple loading placeholders
const SectionPlaceholder = () => <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg"></div>

const SafeSection = ({ children, name }: { children: React.ReactNode; name: string }) => (
  <Suspense fallback={<SectionPlaceholder />}>{children}</Suspense>
)

export default function Home() {
  return (
    <>
      {/* Critical above-the-fold content loaded immediately */}
      <HeroSection />
      <ServicesGrid />

      {/* Lazy load below-the-fold content */}
      <SafeSection name="WhyChooseUs">
        <WhyChooseUs />
      </SafeSection>

      <SafeSection name="CommonIssues">
        <CommonIssuesSection />
      </SafeSection>

      <SafeSection name="EmergencyService">
        <EmergencyServiceSection />
      </SafeSection>

      <SafeSection name="Testimonials">
        <TestimonialsSection />
      </SafeSection>

      <SafeSection name="ServiceAreas">
        <ServiceAreas />
      </SafeSection>

      <SafeSection name="FAQSection">
        <FAQSection />
      </SafeSection>

      <SafeSection name="BookingSection">
        <BookingSection />
      </SafeSection>
    </>
  )
}
