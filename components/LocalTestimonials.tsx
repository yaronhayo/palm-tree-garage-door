"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  name: string
  location: string
  date: string
  rating: number
  text: string
  image?: string
  service: string
}

// This would typically come from a database or API
const testimonialsByCity: Record<string, Testimonial[]> = {
  "Delray Beach": [
    {
      name: "Michael R.",
      location: "Seagate, Delray Beach",
      date: "March 15, 2023",
      rating: 5,
      text: "After my garage door was damaged in last year's hurricane, Palm Tree Garage Door installed a new hurricane-rated door that's already survived two major storms. Their knowledge of Delray Beach's building codes saved me a lot of headaches with permits.",
      image: "testimonials/michael-delray",
      service: "Hurricane-Rated Door Installation",
    },
    {
      name: "Lisa T.",
      location: "Pineapple Grove, Delray Beach",
      date: "January 8, 2023",
      rating: 5,
      text: "Living near the beach, our garage door springs were constantly rusting. Palm Tree installed special salt-resistant springs and they've been working perfectly for months. Great service and they really understand the unique challenges of Delray Beach homes.",
      image: "testimonials/lisa-delray",
      service: "Salt-Resistant Spring Replacement",
    },
    {
      name: "Robert J.",
      location: "Lake Ida, Delray Beach",
      date: "April 22, 2023",
      rating: 5,
      text: "I called Palm Tree when my garage door stopped working completely. They arrived within an hour, diagnosed a fried circuit board from a lightning strike (common in Delray), and had it replaced the same day. Excellent emergency service!",
      image: "testimonials/robert-delray",
      service: "Emergency Repair",
    },
  ],
  Plantation: [
    {
      name: "Jennifer L.",
      location: "Jacaranda, Plantation",
      date: "February 3, 2023",
      rating: 5,
      text: "After three different companies couldn't fix our garage door's persistent problems, Palm Tree Garage Door diagnosed the issue immediately - our foundation had shifted slightly, causing the track misalignment. They fixed it perfectly and now it works like new!",
      image: "testimonials/jennifer-plantation",
      service: "Track Realignment",
    },
    {
      name: "Carlos M.",
      location: "Plantation Acres, Plantation",
      date: "May 12, 2023",
      rating: 5,
      text: "Palm Tree installed a beautiful new garage door that perfectly matches our home's style and meets all of our HOA's strict requirements. The technicians were professional and cleaned up everything when they finished. Highly recommend!",
      image: "testimonials/carlos-plantation",
      service: "Complete Door Replacement",
    },
    {
      name: "Stephanie W.",
      location: "Central Plantation, Plantation",
      date: "March 30, 2023",
      rating: 4,
      text: "We had Palm Tree install a battery backup system for our garage door opener before hurricane season. When we lost power during a recent storm, we were still able to use our garage door normally. Great investment and professional installation.",
      image: "testimonials/stephanie-plantation",
      service: "Backup Battery Installation",
    },
  ],
  "Coral Springs": [
    {
      name: "David and Sarah T.",
      location: "Eagle Trace, Coral Springs",
      date: "April 5, 2023",
      rating: 5,
      text: "With three kids and all their sports equipment, our old garage door took a beating. Palm Tree installed a new impact-resistant door with a whisper-quiet opener that our neighbors appreciate! They even helped us get HOA approval with no hassle.",
      image: "testimonials/david-sarah-coral-springs",
      service: "Quiet Operation System",
    },
    {
      name: "James K.",
      location: "Cypress Run, Coral Springs",
      date: "February 18, 2023",
      rating: 5,
      text: "After a break-in attempt through our garage, Palm Tree upgraded our entire system with enhanced security features. They installed a secure door with smartphone monitoring that gives us peace of mind, especially when we're traveling.",
      image: "testimonials/james-coral-springs",
      service: "Enhanced Security Package",
    },
    {
      name: "Maria P.",
      location: "Maplewood, Coral Springs",
      date: "May 22, 2023",
      rating: 5,
      text: "Palm Tree Garage Door was the only company that could help us meet our HOA's strict requirements while staying within our budget. The new door looks fantastic and the whole process was smooth and stress-free.",
      image: "testimonials/maria-coral-springs",
      service: "HOA-Compliant Door Installation",
    },
  ],
  // Default testimonials for other cities
  default: [
    {
      name: "John D.",
      location: "South Florida",
      date: "March 10, 2023",
      rating: 5,
      text: "Palm Tree Garage Door provided excellent service from start to finish. Their technicians were knowledgeable, professional, and completed the work quickly. I highly recommend them to anyone needing garage door repairs or installation.",
      image: "testimonials/default-testimonial-1",
      service: "Spring Replacement",
    },
    {
      name: "Sarah M.",
      location: "South Florida",
      date: "April 15, 2023",
      rating: 5,
      text: "I was impressed with how quickly Palm Tree Garage Door responded to my emergency call when my garage door wouldn't close. They arrived within an hour, fixed the issue, and charged a fair price. Great service!",
      image: "testimonials/default-testimonial-2",
      service: "Emergency Repair",
    },
    {
      name: "Michael B.",
      location: "South Florida",
      date: "February 22, 2023",
      rating: 4,
      text: "Palm Tree installed a new hurricane-rated garage door for my home. The quality of the door is excellent, and the installation team was professional and efficient. They also helped with all the necessary permits.",
      image: "testimonials/default-testimonial-3",
      service: "Hurricane-Rated Door Installation",
    },
  ],
}

interface LocalTestimonialsProps {
  city: string
}

export default function LocalTestimonials({ city }: LocalTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Get testimonials for the city or use default
  const testimonials = testimonialsByCity[city] || testimonialsByCity["default"]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative bg-white rounded-lg shadow-md p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Removing the image section */}

        <div className="w-full md:w-2/3">
          <div className="flex items-center mb-2">
            {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <p className="text-lg italic mb-4">"{testimonials[currentIndex].text}"</p>

          <div className="mb-4">
            <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
            <p className="text-gray-600">{testimonials[currentIndex].location}</p>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500">{testimonials[currentIndex].date}</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-primary-600">{testimonials[currentIndex].service}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 flex space-x-1">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary-600" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
