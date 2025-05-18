"use client"

import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import OptimizedImage from "./OptimizedImage"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  image: string
  onLearnMore: () => void
}

export default function ServiceCard({ title, description, icon, image, onLearnMore }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
      <div className="relative h-48">
        <OptimizedImage
          src={image || "/placeholder.png"}
          alt={`${title} service`}
          width={400}
          height={300}
          className="w-full h-full"
          objectFit="cover"
          priority={false}
          lazyLoad={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-600/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center">
          <div className="bg-accent-500 p-2 rounded-full mr-3 flex-shrink-0">{icon}</div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <button
          onClick={onLearnMore}
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors mt-auto"
          aria-label={`Learn more about ${title}`}
        >
          Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
