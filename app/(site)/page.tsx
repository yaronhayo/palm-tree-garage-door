import HeroSection from "@/components/HeroSection"
import ServicesGrid from "@/components/ServicesGrid"
import CommonIssuesSection from "@/components/CommonIssuesSection"
import FAQSection from "@/components/FAQSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import TrustBadges from "@/components/TrustBadges"
import CallToAction from "@/components/CallToAction"
import BookingSection from "@/components/BookingSection"
import ServiceAreas from "@/components/ServiceAreas"
import type { Metadata } from "next"
import ResourcePreloader from "@/components/ResourcePreloader"
import { ErrorBoundary } from "@/components/ErrorBoundary"

export const metadata: Metadata = {
  title: "Palm Tree Garage Door Repair | South Florida's Trusted Experts",
  description:
    "Fast, reliable garage door repair in South Florida. 24/7 emergency service, free estimates, and expert technicians. Call now!",
}

export default function Home() {
  return (
    <ErrorBoundary fallback={<div className="p-8 text-center">Something went wrong. Please refresh the page.</div>}>
      <ResourcePreloader />
      <HeroSection />
      <TrustBadges />
      <ServicesGrid />
      <CommonIssuesSection />
      <TestimonialsSection />
      <FAQSection />
      <CallToAction />
      <ServiceAreas />
      <BookingSection />
    </ErrorBoundary>
  )
}
