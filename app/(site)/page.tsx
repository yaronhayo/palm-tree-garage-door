import type { Metadata } from "next"
import StickyHeader from "@/components/StickyHeader"
import HeroSection from "@/components/HeroSection"
import ServicesGrid from "@/components/ServicesGrid"
import WhyChooseUs from "@/components/WhyChooseUs"
import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import LeadForm from "@/components/LeadForm"

export const metadata: Metadata = {
  title: "Garage Door Repair South Florida | Palm Tree Garage Door",
  description:
    "24/7 emergency garage door repair in South Florida. Fast response, certified technicians, and free estimates. Call now for same-day service!",
  openGraph: {
    title: "Garage Door Repair South Florida | Palm Tree Garage Door",
    description:
      "24/7 emergency garage door repair in South Florida. Fast response, certified technicians, and free estimates. Call now for same-day service!",
    images: [
      {
        url: "/images/og-cover.webp",
        width: 1200,
        height: 630,
        alt: "Palm Tree Garage Door Repair South Florida",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <StickyHeader />
      <HeroSection />
      <ServicesGrid />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <LeadForm />
    </>
  )
}
