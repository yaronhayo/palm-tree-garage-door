"use client"

import { useState, useEffect, useRef } from "react"
import { useKeenSlider } from "keen-slider/react"
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight, MessageCircle } from "lucide-react"
import "keen-slider/keen-slider.min.css"
import Link from "next/link"

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Michael Johnson",
    location: "Orlando, FL",
    rating: 5,
    service: "Spring Replacement",
    date: "2 weeks ago",
    image: "/images/testimonial-1.webp",
    quote:
      "I had a broken spring and couldn't get my car out of the garage. Called Palm Tree and they sent someone within an hour! The technician was professional, explained everything, and had my door working in no time. Fair price too. Highly recommend!",
  },
  {
    id: 2,
    name: "Jennifer Smith",
    location: "Winter Park, FL",
    rating: 5,
    service: "New Door Installation",
    date: "1 month ago",
    image: "/images/testimonial-2.webp",
    quote:
      "We needed to replace our old garage door and Palm Tree made the process so easy. They helped us choose the perfect door for our home's style and installed it flawlessly. The team was punctual, professional, and left our garage cleaner than they found it!",
  },
  {
    id: 3,
    name: "Robert Davis",
    location: "Kissimmee, FL",
    rating: 5,
    service: "Opener Repair",
    date: "3 weeks ago",
    image: "/images/testimonial-3.webp",
    quote:
      "My garage door opener stopped working suddenly. Called Palm Tree and they diagnosed the problem over the phone. When the technician arrived, he confirmed the issue and fixed it quickly. Great service at a reasonable price. Will definitely use them again!",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    location: "Lake Mary, FL",
    rating: 5,
    service: "Emergency Service",
    date: "1 week ago",
    image: "/images/testimonial-4.webp",
    quote:
      "I called Palm Tree when my garage door got stuck halfway open at 9 PM. They had someone at my house within 30 minutes! The technician was friendly despite the late hour and fixed the problem quickly. Amazing service when I really needed it.",
  },
  {
    id: 5,
    name: "David Thompson",
    location: "Sanford, FL",
    rating: 4,
    service: "Maintenance",
    date: "2 months ago",
    image: "/images/testimonial-5.webp",
    quote:
      "I scheduled a maintenance service to prevent future issues with my garage door. The technician was thorough, lubricating all moving parts, tightening hardware, and making minor adjustments. My door now operates more quietly and smoothly. Great preventative service!",
  },
  {
    id: 6,
    name: "Emily Rodriguez",
    location: "Altamonte Springs, FL",
    rating: 5,
    service: "Panel Replacement",
    date: "3 weeks ago",
    image: "/images/testimonial-1.webp",
    quote:
      "One of my garage door panels was dented badly after my teenager's driving practice. Palm Tree came out, assessed the damage, and replaced just the damaged panel instead of the whole door. Saved me a lot of money and looks perfect!",
  },
  {
    id: 7,
    name: "Thomas Wright",
    location: "Oviedo, FL",
    rating: 5,
    service: "Track Repair",
    date: "1 month ago",
    image: "/images/testimonial-2.webp",
    quote:
      "My garage door was making a horrible scraping noise and wouldn't close properly. The technician identified the bent track immediately and had it replaced within an hour. Door works perfectly now and the price was very reasonable.",
  },
  {
    id: 8,
    name: "Lisa Martinez",
    location: "Apopka, FL",
    rating: 5,
    service: "Spring Replacement",
    date: "2 weeks ago",
    image: "/images/testimonial-3.webp",
    quote:
      "The spring on my garage door broke with a loud bang that scared the whole family! Called Palm Tree and they explained it was a common issue and had someone out the same day. Fast, professional service at a fair price.",
  },
  {
    id: 9,
    name: "Kevin Anderson",
    location: "Casselberry, FL",
    rating: 4,
    service: "Opener Installation",
    date: "1 month ago",
    image: "/images/testimonial-4.webp",
    quote:
      "Upgraded to a new smart garage door opener with Palm Tree. The technician walked me through all the features and made sure I knew how to use the app before leaving. Very patient and knowledgeable service.",
  },
  {
    id: 10,
    name: "Amanda Nelson",
    location: "Longwood, FL",
    rating: 5,
    service: "Cable Repair",
    date: "3 weeks ago",
    image: "/images/testimonial-5.webp",
    quote:
      "One of my garage door cables snapped and I was worried it would be expensive to fix. Palm Tree gave me an honest quote over the phone and stuck to it. The repair was done quickly and professionally. Great experience!",
  },
]

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const [slidesPerView, setSlidesPerView] = useState(1)
  const ref = useRef<HTMLDivElement>(null)

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

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
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
    <section id="testimonials" className="py-20 bg-primary-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-white/70"></div>
            <span className="mx-4 text-white font-medium">TESTIMONIALS</span>
            <div className="h-px w-12 bg-white/70"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>

          <div className="flex justify-center mt-4">
            <div className="flex items-center bg-primary-700/50 px-4 py-2 rounded-full">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="ml-2 font-bold text-white">4.9 out of 5</span>
              <span className="mx-2 text-white/50 hidden sm:inline">•</span>
              <span className="text-white/90 hidden sm:inline">Based on 150+ reviews</span>
            </div>
          </div>
        </div>

        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div ref={sliderRef} className="keen-slider pb-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="keen-slider__slide">
                <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-300 hover:border-accent-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-primary-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {testimonial.date}
                    </div>
                  </div>

                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                      {testimonial.service}
                    </span>
                  </div>

                  <div className="relative flex-grow">
                    <Quote className="absolute top-0 left-0 h-8 w-8 text-primary-200 -translate-x-2 -translate-y-2 opacity-50" />
                    <p className="text-gray-700 relative z-10 pl-4 italic line-clamp-4 sm:line-clamp-none">
                      {testimonial.quote}
                    </p>
                  </div>
                </div>
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
            href="#booking"
            className="bg-white hover:bg-gray-100 text-primary-900 border border-primary-200 font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center group"
          >
            Join Our Satisfied Customers
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
