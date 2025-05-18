"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock, Award, Shield, Truck, CheckCircle } from "lucide-react"
import OptimizedImage from "./OptimizedImage"

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
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src="/images/subtle-pattern.webp"
          alt=""
          fill
          className="object-cover opacity-5"
          decorative={true}
          priority={false}
          lazyLoad={true}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600"></div>
      <div className="hidden lg:block absolute -left-24 top-1/2 transform -translate-y-1/2 w-64 h-64 rounded-full bg-accent-500 opacity-10"></div>
      <div className="hidden lg:block absolute -right-24 top-1/3 transform -translate-y-1/2 w-80 h-80 rounded-full bg-primary-600 opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center justify-center mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-px w-12 bg-accent-500"></div>
            <span className="mx-4 text-accent-500 font-medium">WHY CHOOSE US</span>
            <div className="h-px w-12 bg-accent-500"></div>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary-600 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Sets Us Apart
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Palm Tree Garage Door is committed to excellence in every service we provide
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div key={benefit.id} className="group" variants={itemVariants}>
              <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] border border-gray-100 hover:border-accent-200">
                <div className="bg-accent-500 p-4 rounded-full inline-flex items-center justify-center mb-5 group-hover:bg-primary-600 transition-colors">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>

                {/* Feature list with checkmarks */}
                <div className="mt-4 text-left w-full">
                  <div className="flex items-start mt-2">
                    <CheckCircle className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      {index === 0
                        ? "30-minute average response time"
                        : index === 1
                          ? "Certified and background-checked"
                          : index === 2
                            ? "1-year labor warranty on all work"
                            : "Upfront pricing before work begins"}
                    </span>
                  </div>
                  <div className="flex items-start mt-2">
                    <CheckCircle className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">
                      {index === 0
                        ? "Available nights and weekends"
                        : index === 1
                          ? "Ongoing training and certification"
                          : index === 2
                            ? "Satisfaction guarantee"
                            : "No surprise fees or hidden costs"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-primary-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="bg-primary-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">5,000+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-primary-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Emergency Service</div>
          </div>
          <div className="bg-primary-50 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
