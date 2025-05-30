"use client"

import type React from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  onLearnMore: () => void
}

export default function ServiceCard({ title, description, icon, image, onLearnMore }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
      <div className="relative h-40 sm:h-48">
        <Image
          src={image || "/placeholder.png"}
          alt={`${title} service`}
          width={400}
          height={300}
          className="w-full h-full object-cover"
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/80 to-transparent"></div>
        <div className="absolute bottom-3 left-3 flex items-center">
          <div className="bg-accent-500 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 flex-shrink-0">{icon}</div>
          <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-3 sm:p-5 flex-grow flex flex-col">
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 flex-grow">{description}</p>
        <button
          onClick={onLearnMore}
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors mt-auto text-sm sm:text-base"
          aria-label={`Learn more about ${title}`}
        >
          Learn more{" "}
          <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
