"use client"

import { useState, useRef } from "react"
import { MapPin, ArrowRight, Building, Home, Navigation } from "lucide-react"
import { serviceAreas } from "@/data/service-areas"
import { motion, useInView } from "framer-motion"
import OptimizedImage from "./OptimizedImage"
import { getCityData } from "@/data/city-specific-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function ServiceAreas() {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Get featured areas (first 8)
  const featuredAreas = serviceAreas.slice(0, 8)

  // Get a random icon for each area
  const getRandomIcon = (city: string) => {
    const icons = [MapPin, Building, Home, Navigation]
    // Use the city name to deterministically select an icon
    const index = city.charCodeAt(0) % icons.length
    const Icon = icons[index]
    return <Icon className="w-6 h-6" />
  }

  return (
    <section className="py-24 relative bg-gradient-to-b from-white to-gray-50" id="service-areas" ref={ref}>
      {/* Background with map image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <OptimizedImage
          src="/florida-map-outline.png"
          alt=""
          fill
          className="object-cover opacity-5"
          fallbackSrc="/placeholder.png" // Changed from abstract-map-background.png to placeholder.png
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 opacity-80 z-0"></div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-600 opacity-10 rounded-full blur-3xl"></div>
      </div>

      {/* Top decorative bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-accent-500"></div>
            <span className="mx-4 text-accent-500 font-semibold tracking-wider">SERVICE AREAS</span>
            <div className="h-px w-12 bg-accent-500"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-600 leading-tight">
            Our Service <span className="text-accent-500">Areas</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-700 leading-relaxed">
            We provide fast, reliable garage door repair services throughout South Florida. Our technicians are
            strategically located to ensure quick response times in all these areas.
          </p>
        </motion.div>

        {/* Featured Areas Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-primary-700">Featured Service Areas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredAreas.map((area) => (
              <div
                key={area.city}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onMouseEnter={() => setHoveredArea(area.city)}
                onMouseLeave={() => setHoveredArea(null)}
                onClick={() => {
                  setSelectedArea(area.city)
                  setIsDialogOpen(true)
                }}
              >
                <div
                  className={`
                    flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300
                    ${
                      hoveredArea === area.city
                        ? "bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg transform scale-[1.03]"
                        : "bg-white text-gray-800 hover:shadow-md hover:bg-gray-50 shadow"
                    }
                  `}
                >
                  <div
                    className={`
                        w-14 h-14 rounded-full flex items-center justify-center mb-4
                        ${hoveredArea === area.city ? "bg-white text-accent-500" : "bg-primary-50 text-primary-600"}
                      `}
                  >
                    {getRandomIcon(area.city)}
                  </div>
                  <span className="font-bold text-lg mb-1">{area.city}</span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      hoveredArea === area.city ? "bg-white/20 text-white" : "bg-primary-50 text-primary-600"
                    }`}
                  >
                    {area.zipCodes.length} zip codes
                  </span>

                  <div
                    className={`
                      absolute bottom-0 left-0 w-full h-0 bg-accent-500 transition-all duration-300 flex items-center justify-center
                      ${hoveredArea === area.city ? "h-10" : "h-0"}
                    `}
                  >
                    <span className="text-white text-sm font-medium flex items-center">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Service Guarantee */}
        <motion.div
          className="mt-16 bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto border-l-4 border-accent-500 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Decorative background element */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary-50 rounded-full opacity-50"></div>

          <h3 className="text-2xl font-bold mb-3 text-primary-600">Our Service Area Guarantee</h3>
          <p className="text-gray-700 mb-5 leading-relaxed relative z-10">
            Don't see your area listed? We likely still service your location! Our service area is constantly expanding
            to meet the needs of our customers throughout South Florida.
          </p>
          <div className="flex items-center text-primary-600 font-medium relative z-10">
            <a
              href="#booking"
              className="flex items-center px-5 py-2 bg-primary-50 rounded-full hover:bg-primary-100 transition-colors"
            >
              Contact us for availability <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Service Area Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          {selectedArea && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold text-primary-600">
                    {selectedArea} <span className="text-accent-500">Service Area</span>
                  </DialogTitle>
                </div>
                <DialogDescription className="text-gray-600">
                  Garage door repair services in {selectedArea}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                {/* City-specific content */}
                {(() => {
                  const cityData = getCityData(selectedArea)
                  return (
                    <div className="space-y-6">
                      {/* Hero Image */}
                      {cityData.heroImage && (
                        <div className="relative h-48 rounded-lg overflow-hidden">
                          <OptimizedImage
                            src={cityData.heroImage}
                            alt={`${selectedArea} garage door services`}
                            fill
                            className="object-cover"
                            fallbackSrc="/placeholder.png"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold">{selectedArea}</h3>
                            <p className="text-sm">Garage Door Repair Services</p>
                          </div>
                        </div>
                      )}

                      {/* Neighborhoods */}
                      <div>
                        <h4 className="text-lg font-semibold text-primary-600 mb-2">Neighborhoods We Serve</h4>
                        <div className="flex flex-wrap gap-2">
                          {cityData.neighborhoods.map((neighborhood) => (
                            <span
                              key={neighborhood}
                              className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full"
                            >
                              {neighborhood}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Common Issues */}
                      <div>
                        <h4 className="text-lg font-semibold text-primary-600 mb-2">
                          Common Garage Door Issues in {selectedArea}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {cityData.commonIssues.map((issue) => (
                            <div key={issue.title} className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                              <h5 className="font-medium text-primary-700">{issue.title}</h5>
                              <p className="text-sm text-gray-600">{issue.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Services */}
                      <div>
                        <h4 className="text-lg font-semibold text-primary-600 mb-2">Our Services in {selectedArea}</h4>
                        <div className="space-y-3">
                          {cityData.services.slice(0, 3).map((service) => (
                            <div
                              key={service.title}
                              className="p-3 bg-white border-l-4 border-accent-500 rounded-lg shadow-sm"
                            >
                              <div className="flex justify-between">
                                <h5 className="font-medium text-primary-700">{service.title}</h5>
                                <span className="text-accent-500 font-semibold">From ${service.startingPrice}</span>
                              </div>
                              <p className="text-sm text-gray-600">{service.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
                        <h4 className="text-lg font-semibold text-primary-600 mb-2">What Our Customers Say</h4>
                        <div className="italic text-gray-700">"{cityData.featuredTestimonial.quote}"</div>
                        <div className="mt-2 text-sm font-medium text-primary-700">
                          - {cityData.featuredTestimonial.name}, {cityData.featuredTestimonial.location}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex justify-center mt-4">
                        <a
                          href="#booking"
                          onClick={() => setIsDialogOpen(false)}
                          className="px-6 py-3 bg-accent-500 text-white rounded-full font-medium hover:bg-accent-600 transition-colors flex items-center"
                        >
                          Schedule Service in {selectedArea} <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
