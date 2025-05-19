import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"

// Import components
import HeroSection from "@/components/HeroSection"
import TrustBadges from "@/components/TrustBadges"
import ServicesGrid from "@/components/ServicesGrid"
import CommonIssuesSection from "@/components/CommonIssuesSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import FAQSection from "@/components/FAQSection"
import CallToAction from "@/components/CallToAction"
import ServiceAreas from "@/components/ServiceAreas"
import BookingSection from "@/components/BookingSection"

export const metadata: Metadata = {
  title: "Palm Tree Garage Door Repair | South Florida's Trusted Experts",
  description:
    "Fast, reliable garage door repair in South Florida. 24/7 emergency service, free estimates, and expert technicians. Call now!",
}

// Simple error boundary component
function ErrorBoundary({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  try {
    return <>{children}</>
  } catch (error) {
    console.error("Error in component:", error)
    return <>{fallback}</>
  }
}

// Simple component to display loading state
function LoadingFallback() {
  return <div className="p-8 text-center">Loading...</div>
}

// Wrap each section in its own error boundary to isolate issues
function SafeSection({ children, name }: { children: React.ReactNode; name: string }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 m-4 border border-red-300 bg-red-50 rounded-lg">
          <p className="text-red-700">Error loading {name} section</p>
        </div>
      }
    >
      <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default function Home() {
  return (
    <main>
      <SafeSection name="Hero">
        <HeroSection />
      </SafeSection>

      <SafeSection name="TrustBadges">
        <TrustBadges />
      </SafeSection>

      <SafeSection name="ServicesGrid">
        <ServicesGrid />
      </SafeSection>

      <SafeSection name="CommonIssues">
        <CommonIssuesSection />
      </SafeSection>

      <SafeSection name="Testimonials">
        <TestimonialsSection />
      </SafeSection>

      <SafeSection name="FAQ">
        <FAQSection />
      </SafeSection>

      <SafeSection name="CallToAction">
        <CallToAction />
      </SafeSection>

      <SafeSection name="ServiceAreas">
        <ServiceAreas />
      </SafeSection>

      <SafeSection name="Booking">
        <BookingSection />
      </SafeSection>
    </main>
  )
}
