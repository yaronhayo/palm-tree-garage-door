"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useKeenSlider } from "keen-slider/react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import "keen-slider/keen-slider.min.css"

// Sample testimonials data
export const testimonialsData = [
  {
    id: 1,
    name: "Michael Johnson",
    location: "Orlando, FL",
    rating: 5,
    quote:
      "Palm Tree Garage Door came to my rescue when my door suddenly stopped working. They arrived within an hour and fixed the issue quickly. Great service at a fair price!",
  },
  {
    id: 2,
    name: "Jennifer Smith",
    location: "Winter Park, FL",
    rating: 5,
    quote:
      "I needed a new garage door and Palm Tree made the process so easy. They helped me choose the perfect door for my home and installed it flawlessly. Highly recommend!",
  },
  {
    id: 3,
    name: "Robert Davis",
    location: "Kissimmee, FL",
    rating: 5,
    quote:
      "Professional, punctual, and reasonably priced. The technician explained everything clearly and fixed my garage door spring quickly. I'll definitely use them again!",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    location: "Lake Mary, FL",
    rating: 5,
    quote:
      "Palm Tree installed a new smart garage door opener for me, and I couldn't be happier. The technician took the time to show me how to use all the features. The door operates so much quieter now!",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

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
          spacing: 16,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 16,
        },
      },
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <section className="py-16 bg-primary-600" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            className="text-lg text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Read testimonials from our satisfied customers
          </motion.p>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div ref={sliderRef} className="keen-slider">
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="keen-slider__slide">
                <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6 flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-auto">
                    <p className="font-bold text-primary-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loaded && instanceRef.current && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  instanceRef.current?.prev()
                }}
                className={`bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors ${
                  currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentSlide === 0}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-primary-600" />
              </button>

              <div className="flex gap-2">
                {[...Array(instanceRef.current.track.details.slides.length - 2)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={`h-3 w-3 rounded-full ${
                      currentSlide === idx ? "bg-primary-600" : "bg-gray-300"
                    } transition-colors`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  ></button>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  instanceRef.current?.next()
                }}
                className={`bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors ${
                  currentSlide === instanceRef.current.track.details.slides.length - 3
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={currentSlide === instanceRef.current.track.details.slides.length - 3}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-primary-600" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
