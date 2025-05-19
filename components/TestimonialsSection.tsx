"use client"

import { useState, useEffect, useRef } from "react"
import { useKeenSlider } from "keen-slider/react"
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import "keen-slider/keen-slider.min.css"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamically import the testimonial card component
const TestimonialCard = dynamic(() => import("@/components/TestimonialCard"), {
  loading: () => (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-20 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  ),
  ssr: false,
})

// Replace the testimonialsData import with this local array
const testimonialsData = [
  {
    id: 1,
    name: "Jennifer M.",
    location: "Plantation, FL",
    rating: 5,
    quote:
      "The technician arrived within an hour of my call and fixed my garage door that was stuck halfway open. Professional, quick, and reasonably priced. Couldn't ask for better service!",
    serviceType: "Emergency Repair",
    date: "2023-04-15",
  },
  {
    id: 2,
    name: "Carlos R.",
    location: "Coral Springs, FL",
    rating: 5,
    quote:
      "I've used them twice now for different properties. Both times they were punctual, knowledgeable, and got the job done right the first time. Their pricing is transparent with no hidden fees.",
    serviceType: "Spring Replacement",
    date: "2023-05-22",
  },
  {
    id: 3,
    name: "Stephanie W.",
    location: "Delray Beach, FL",
    rating: 5,
    quote:
      "After getting quotes from three companies, I chose them for my new garage door installation. The quality of work and attention to detail was impressive. My new door looks fantastic!",
    serviceType: "New Installation",
    date: "2023-06-10",
  },
  {
    id: 4,
    name: "David & Sarah T.",
    location: "Boca Raton, FL",
    rating: 5,
    quote:
      "Our garage door opener stopped working suddenly. They diagnosed the problem quickly and had the parts on hand to fix it the same day. Great service at a fair price.",
    serviceType: "Opener Repair",
    date: "2023-07-03",
  },
  {
    id: 5,
    name: "James L.",
    location: "Fort Lauderdale, FL",
    rating: 4,
    quote:
      "Very responsive and professional team. They came out to fix my off-track garage door and took the time to explain what caused the issue and how to prevent it in the future.",
    serviceType: "Off-Track Repair",
    date: "2023-08-17",
  },
  {
    id: 6,
    name: "Maria G.",
    location: "Pompano Beach, FL",
    rating: 5,
    quote:
      "I called on a Sunday morning when my garage door wouldn't close. They had someone at my house within 2 hours and fixed the sensor issue quickly. Excellent emergency service!",
    serviceType: "Sensor Repair",
    date: "2023-09-05",
  },
  {
    id: 7,
    name: "Robert K.",
    location: "Deerfield Beach, FL",
    rating: 5,
    quote:
      "The technician was extremely knowledgeable and took the time to show me maintenance tips to extend the life of my garage door. The spring replacement was done perfectly.",
    serviceType: "Spring Replacement",
    date: "2023-09-28",
  },
  {
    id: 8,
    name: "Lisa M.",
    location: "Boynton Beach, FL",
    rating: 5,
    quote:
      "I'm extremely satisfied with the new garage door they installed. The team was professional from start to finish, and the quality of the door exceeds my expectations.",
    serviceType: "New Installation",
    date: "2023-10-12",
  },
  {
    id: 9,
    name: "Thomas B.",
    location: "Plantation, FL",
    rating: 5,
    quote:
      "After my garage door cable snapped, they responded quickly and had it fixed within an hour. Fair pricing and excellent workmanship. I highly recommend their services.",
    serviceType: "Cable Repair",
    date: "2023-11-07",
  },
  {
    id: 10,
    name: "Nicole P.",
    location: "Coral Springs, FL",
    rating: 5,
    quote:
      "The annual maintenance service they provide has kept my garage door running smoothly for years. Their attention to detail and thoroughness is impressive.",
    serviceType: "Maintenance",
    date: "2023-11-25",
  },
  {
    id: 11,
    name: "Michael & Emma S.",
    location: "Delray Beach, FL",
    rating: 5,
    quote:
      "We had them install a new smart garage door opener, and we couldn't be happier. The technician set everything up, including the smartphone app, and made sure we knew how to use all the features.",
    serviceType: "Smart Opener Installation",
    date: "2023-12-08",
  },
  {
    id: 12,
    name: "Patricia H.",
    location: "Boca Raton, FL",
    rating: 4,
    quote:
      "They replaced a broken panel on my garage door and matched the color perfectly. You can't even tell it was repaired. Very satisfied with their craftsmanship.",
    serviceType: "Panel Replacement",
    date: "2024-01-14",
  },
  {
    id: 13,
    name: "Daniel W.",
    location: "Fort Lauderdale, FL",
    rating: 5,
    quote:
      "I've used many garage door companies over the years, but this one stands out for their honesty and quality of work. They didn't try to upsell me on unnecessary parts or services.",
    serviceType: "Roller Replacement",
    date: "2024-02-03",
  },
  {
    id: 14,
    name: "Amanda J.",
    location: "Pompano Beach, FL",
    rating: 5,
    quote:
      "The noise from my garage door was driving me crazy. Their technician identified the issue immediately and fixed it on the spot. It's now whisper quiet. Thank you!",
    serviceType: "Noise Reduction",
    date: "2024-02-27",
  },
  {
    id: 15,
    name: "Kevin & Laura M.",
    location: "Deerfield Beach, FL",
    rating: 5,
    quote:
      "We had them install a hurricane-rated garage door before storm season. The quality of the door and installation is excellent, giving us peace of mind during hurricane warnings.",
    serviceType: "Hurricane Door Installation",
    date: "2024-03-19",
  },
]

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const sliderRef = useRef<HTMLDivElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Calculate average rating - remove this calculation since we're hardcoding to 4.9
  // const averageRating =
  //   testimonialsData.reduce((sum, testimonial) => sum + testimonial.rating, 0) / testimonialsData.length

  // Update slides per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const [keenSliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 24,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 3,
          spacing: 32,
        },
      },
    },
    created() {
      setLoaded(true)
    },
  })

  // Handle autoplay
  useEffect(() => {
    if (!autoplay || !instanceRef.current) return

    const interval = setInterval(() => {
      if (!instanceRef.current) return
      instanceRef.current.next()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, instanceRef])

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  // Reduce motion for users who prefer reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setAutoplay(false)
    }
  }, [])

  return (
    <section id="testimonials" className="py-20 bg-primary-50 relative overflow-hidden" ref={ref}>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fillOpacity="0.4"%3E%3Cpath d="M0 0h10v10H0z"/%3E%3Cpath fill="%230D423A" d="M10 0h10v10H10z"/%3E%3Cpath fill="%230D423A" d="M0 10h10v10H0z"/%3E%3Cpath d="M10 10h10v10H10z"/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-8"></div>
          <p className="text-xl text-primary-700 max-w-3xl mx-auto">
            We take pride in delivering exceptional garage door services that exceed expectations. Here's what our
            satisfied customers have to say about their experience with us.
          </p>
        </div>

        <motion.div
          className="flex items-center justify-center gap-1 mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-6 w-6 ${i < 5 ? (i === 4 ? "text-yellow-500 fill-yellow-500 opacity-90" : "text-yellow-500 fill-current") : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-lg font-semibold">4.9 out of 5</span>
        </motion.div>
        <motion.p
          className="text-lg text-primary-700 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Based on <span className="font-semibold">268+</span> verified customer reviews
        </motion.p>
      </div>

      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div ref={keenSliderRef} className="keen-slider pb-12">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="keen-slider__slide">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {loaded && instanceRef.current && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                instanceRef.current?.prev()
              }}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 bg-white border border-gray-300 rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors ${
                currentSlide === 0 ? "opacity-50 cursor-not-allowed" : "opacity-90 hover:opacity-100"
              }`}
              disabled={currentSlide === 0}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-primary-600" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                instanceRef.current?.next()
              }}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 bg-white border border-gray-300 rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors ${
                currentSlide === instanceRef.current.track.details.slides.length - slidesPerView
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-90 hover:opacity-100"
              }`}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - slidesPerView}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-primary-600" />
            </button>
          </>
        )}

        {/* Pagination dots */}
        {loaded && instanceRef.current && (
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(instanceRef.current.track.details.slides.length - (slidesPerView - 1))].map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "bg-primary-600 w-6" : "bg-gray-300 hover:bg-primary-400"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/#booking"
          className="bg-white hover:bg-gray-100 text-primary-900 border border-primary-200 font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center group"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          Join Our Satisfied Customers
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
