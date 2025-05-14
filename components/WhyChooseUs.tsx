"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Award, Shield, Truck } from "lucide-react"

// Sample benefits data
export const benefitsData = [
  {
    id: "fast-service",
    title: "Fast Service",
    description: "24/7 emergency service with quick response times to get your door working again.",
    icon: Clock,
  },
  {
    id: "experienced",
    title: "Experienced Technicians",
    description: "Our certified technicians have years of experience solving all garage door problems.",
    icon: Award,
  },
  {
    id: "warranty",
    title: "Guaranteed Work",
    description: "All repairs and installations come with our satisfaction guarantee and warranty.",
    icon: Shield,
  },
  {
    id: "fair-pricing",
    title: "Fair & Transparent Pricing",
    description: "No hidden fees or surprise charges - just honest, upfront pricing for quality work.",
    icon: Truck,
  },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary-600 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            What sets Palm Tree Garage Door apart from the competition
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefitsData.map((benefit) => (
            <motion.div key={benefit.id} className="text-center" variants={itemVariants}>
              <div className="bg-accent-500 p-4 rounded-full inline-flex items-center justify-center mb-4 mx-auto">
                <benefit.icon className="h-8 w-8 text-primary-900" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
