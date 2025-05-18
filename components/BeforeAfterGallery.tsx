"use client"

import { useState } from "react"
import Image from "next/image"

type BeforeAfterItem = {
  id: number
  title: string
  description: string
  beforeImage: string
  afterImage: string
  altText: string
}

const galleryItems: BeforeAfterItem[] = [
  {
    id: 1,
    title: "Broken Spring Replacement",
    description:
      "Customer had a broken torsion spring that was causing the door to be inoperable. We replaced both springs for balanced operation.",
    beforeImage: "/placeholder-i8tox.png",
    afterImage: "/repaired-garage-door-spring.png",
    altText: "Garage door spring replacement",
  },
  {
    id: 2,
    title: "Panel Replacement",
    description:
      "Customer had a damaged bottom panel from a vehicle impact. We replaced the panel and realigned the door.",
    beforeImage: "/placeholder-3nnlk.png",
    afterImage: "/placeholder.svg?height=400&width=600&query=replaced%20garage%20door%20panel",
    altText: "Garage door panel replacement",
  },
  {
    id: 3,
    title: "New Door Installation",
    description: "Customer wanted to upgrade their old wooden door to a modern insulated steel door with windows.",
    beforeImage: "/placeholder.svg?height=400&width=600&query=old%20wooden%20garage%20door",
    afterImage: "/placeholder.svg?height=400&width=600&query=new%20modern%20garage%20door",
    altText: "New garage door installation",
  },
]

export default function BeforeAfterGallery() {
  const [activeItem, setActiveItem] = useState<BeforeAfterItem>(galleryItems[0])
  const [showAfter, setShowAfter] = useState(false)

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Before & After Gallery</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          See the transformation our expert technicians can make with your garage door. Swipe or click to compare before
          and after images.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-lg">
            <div className="absolute inset-0 transition-opacity duration-500 ease-in-out z-10">
              <Image
                src={activeItem.beforeImage || "/placeholder.svg"}
                alt={`Before: ${activeItem.altText}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white p-2 text-sm">Before</div>
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${showAfter ? "opacity-100 z-20" : "opacity-0 z-0"}`}
            >
              <Image
                src={activeItem.afterImage || "/placeholder.svg"}
                alt={`After: ${activeItem.altText}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 text-white p-2 text-sm">After</div>
            </div>
            <button
              className="absolute inset-0 w-full h-full z-30 cursor-pointer focus:outline-none"
              onClick={() => setShowAfter(!showAfter)}
              aria-label={showAfter ? "Show before image" : "Show after image"}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 bg-white bg-opacity-80 px-3 py-1 rounded-full text-sm font-medium">
              {showAfter ? "Click to see before" : "Click to see after"}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3">{activeItem.title}</h3>
            <p className="text-gray-600 mb-6">{activeItem.description}</p>
            <div className="flex flex-wrap gap-2">
              {galleryItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item)
                    setShowAfter(false)
                  }}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    activeItem.id === item.id ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
