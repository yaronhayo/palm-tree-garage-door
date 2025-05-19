"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface TestimonialCardProps {
  testimonial: {
    id: number | string
    name: string
    location: string
    rating: number
    quote: string
    serviceType?: string
    date?: string
  }
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-300 hover:border-accent-200"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
          />
        ))}
      </div>
      <p className="text-gray-600 italic mb-6 flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-auto">
        <p className="font-bold text-primary-900">{testimonial.name}</p>
        <p className="text-sm text-gray-500">{testimonial.location}</p>
        {testimonial.serviceType && <p className="text-xs text-gray-400 mt-1">Service: {testimonial.serviceType}</p>}
        {testimonial.date && (
          <time dateTime={testimonial.date} className="text-xs text-gray-400 block mt-1">
            {new Date(testimonial.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </div>
    </motion.div>
  )
}
