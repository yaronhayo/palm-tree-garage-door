"use client"

import { useState } from "react"
import { MapPin, X, Phone, ArrowRight, Info, CheckCircle, Clock, Star } from "lucide-react"
import { trackPhoneCall } from "@/lib/dataLayer"

// Define types for our data
type ServiceArea = {
  id: string
  name: string
  county: string
  population: string
  description: string
}

// Inline service areas data
const serviceAreas: ServiceArea[] = [
  {
    id: "delray-beach",
    name: "Delray Beach",
    county: "Palm Beach County",
    population: "65,000+",
    description:
      "Delray Beach combines coastal charm with urban amenities, featuring award-winning beaches, a vibrant arts scene, and a walkable downtown with exceptional dining and shopping options.",
  },
  {
    id: "boca-raton",
    name: "Boca Raton",
    county: "Palm Beach County",
    population: "100,000+",
    description:
      "Boca Raton offers a luxurious lifestyle with pristine beaches, world-class golf courses, upscale shopping at Mizner Park, and beautiful Mediterranean-inspired architecture throughout the city.",
  },
  {
    id: "coral-springs",
    name: "Coral Springs",
    county: "Broward County",
    population: "130,000+",
    description:
      "Coral Springs is a meticulously planned community known for its top-rated schools, abundant parks, family-friendly neighborhoods, and strong emphasis on arts and recreation.",
  },
  {
    id: "plantation",
    name: "Plantation",
    county: "Broward County",
    population: "90,000+",
    description:
      "Plantation offers a perfect blend of suburban tranquility and urban convenience with its lush landscaping, diverse neighborhoods, excellent schools, and proximity to major business centers.",
  },
  {
    id: "fort-lauderdale",
    name: "Fort Lauderdale",
    county: "Broward County",
    population: "180,000+",
    description:
      "Fort Lauderdale, the 'Venice of America,' features an intricate canal system, stunning beaches, a sophisticated downtown, and a booming cultural scene with museums, galleries, and performing arts.",
  },
  {
    id: "pompano-beach",
    name: "Pompano Beach",
    county: "Broward County",
    population: "110,000+",
    description:
      "Pompano Beach is undergoing exciting revitalization with its newly developed beachfront, historic downtown, excellent fishing and boating facilities, and growing culinary and arts districts.",
  },
  {
    id: "deerfield-beach",
    name: "Deerfield Beach",
    county: "Broward County",
    population: "80,000+",
    description:
      "Deerfield Beach is treasured for its Blue Wave certified beach, historic fishing pier, family-friendly atmosphere, and the popular Quiet Waters Park offering camping and water activities.",
  },
  {
    id: "boynton-beach",
    name: "Boynton Beach",
    county: "Palm Beach County",
    population: "75,000+",
    description:
      "Boynton Beach balances coastal living with natural beauty, featuring pristine beaches, the Loxahatchee National Wildlife Refuge, a revitalized downtown, and excellent waterfront dining options.",
  },
]

// Function to get city-specific data
const getCityData = (cityId: string) => {
  // Default data
  const defaultData = {
    testimonials: [
      {
        name: "John D.",
        text: "Excellent service! Fixed my garage door quickly and professionally.",
        rating: 5,
      },
      {
        name: "Sarah M.",
        text: "Very responsive and reasonably priced. Would recommend to anyone!",
        rating: 5,
      },
    ],
    commonIssues: ["Broken springs", "Door off track", "Opener malfunctions"],
    serviceCapabilities: "Full-service garage door repair and installation",
  }

  // City-specific overrides
  const cityData: Record<string, any> = {
    plantation: {
      testimonials: [
        {
          name: "Jennifer L.",
          text: "The technician arrived promptly and fixed our garage door spring in no time. Great service!",
          rating: 5,
        },
        {
          name: "Carlos R.",
          text: "I've used Palm Tree Garage Door twice now in Plantation and they never disappoint. Fair pricing and quality work.",
          rating: 5,
        },
      ],
      commonIssues: ["Spring replacements", "Sensor alignment", "Noisy operation"],
      serviceCapabilities: "Comprehensive garage door services throughout Plantation and surrounding neighborhoods",
    },
    "coral-springs": {
      testimonials: [
        {
          name: "David & Sarah K.",
          text: "Our garage door was stuck open on a Sunday. They came out within an hour and fixed it. Excellent emergency service!",
          rating: 5,
        },
        {
          name: "James T.",
          text: "Very professional team. They installed a new garage door opener and took the time to explain how everything works.",
          rating: 5,
        },
      ],
      commonIssues: ["Opener repairs", "Track alignment", "Weather stripping"],
      serviceCapabilities: "Complete garage door solutions for residential and commercial properties in Coral Springs",
    },
    "fort-lauderdale": {
      testimonials: [
        {
          name: "Michael P.",
          text: "Best garage door service in Fort Lauderdale! Fixed my commercial garage door quickly and at a reasonable price.",
          rating: 5,
        },
        {
          name: "Lisa R.",
          text: "I've recommended Palm Tree to all my neighbors in Fort Lauderdale. They're reliable and do quality work.",
          rating: 5,
        },
      ],
      commonIssues: ["Commercial door repairs", "Hurricane reinforcement", "Smart opener installation"],
      serviceCapabilities:
        "Specialized garage door services for Fort Lauderdale's residential, commercial, and marine properties",
    },
  }

  return cityData[cityId] || defaultData
}

export default function ServiceAreas() {
  const [selectedCity, setSelectedCity] = useState<ServiceArea | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openCityModal = (city: ServiceArea) => {
    setSelectedCity(city)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  const closeCityModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "" // Re-enable scrolling
  }

  const handlePhoneClick = () => {
    trackPhoneCall("3213669723", "service_areas")
  }

  return (
    <section id="service-areas" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">Our Service Areas</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide garage door repair and installation services throughout South Florida. Click on a city to learn
            more about our services in your area.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {serviceAreas.map((city) => (
            <div
              key={city.id}
              onClick={() => openCityModal(city)}
              className="bg-gray-50 hover:bg-primary-50 border border-gray-200 rounded-lg p-4 text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-col items-center">
                <MapPin className="h-6 w-6 text-primary-600 mb-2" />
                <h3 className="font-bold text-primary-700">{city.name}</h3>
                <p className="text-sm text-gray-500">{city.county}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary-50 border border-primary-100 rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-xl md:text-2xl font-bold text-primary-600 mb-2">Don't see your city listed?</h3>
              <p className="text-gray-600">
                We serve many more areas throughout South Florida. Contact us to check if we service your location.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+13213669723"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
                onClick={handlePhoneClick}
                data-call-tracking="true"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </a>
              <button
                onClick={() => (window.location.href = "#booking")}
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
              >
                <Info className="mr-2 h-5 w-5" />
                Request Information
              </button>
            </div>
          </div>
        </div>

        {/* City Modal */}
        {isModalOpen && selectedCity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center sm:items-start justify-center p-2 sm:p-4 pt-4 sm:pt-16">
            <div className="bg-white rounded-xl max-w-3xl w-[95%] sm:w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto mt-0 sm:mt-20">
              <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-xl">
                <div className="flex justify-between items-center p-4">
                  <h3 className="text-lg sm:text-xl font-bold text-primary-600 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-accent-500" />
                    {selectedCity.name}
                  </h3>
                  <button
                    onClick={closeCityModal}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 -mr-1"
                    aria-label="Close"
                  >
                    <X className="h-7 w-7" />
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-primary-600 mb-2">About {selectedCity.name}</h4>
                  <p className="text-gray-600 mb-4">{selectedCity.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">County</p>
                      <p className="font-medium text-gray-700">{selectedCity.county}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Population</p>
                      <p className="font-medium text-gray-700">{selectedCity.population}</p>
                    </div>
                  </div>
                </div>

                {/* City-specific data */}
                {(() => {
                  const cityData = getCityData(selectedCity.id)
                  return (
                    <>
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-primary-600 mb-2">
                          Common Garage Door Issues in {selectedCity.name}
                        </h4>
                        <ul className="space-y-2">
                          {cityData.commonIssues.map((issue: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-accent-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-primary-600 mb-2">
                          Our Services in {selectedCity.name}
                        </h4>
                        <p className="flex items-center text-gray-600">
                          <Clock className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0" />
                          {cityData.serviceCapabilities}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-primary-600 mb-2">
                          What Our {selectedCity.name} Customers Say
                        </h4>
                        <div className="space-y-4">
                          {cityData.testimonials.map((testimonial: any, index: number) => (
                            <div key={index} className="bg-gray-50 p-4 sm:p-4 rounded-lg">
                              <div className="flex items-center mb-2">
                                <div className="flex">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                                  ))}
                                </div>
                                <span className="ml-2 font-medium text-gray-700">{testimonial.name}</span>
                              </div>
                              <p className="text-gray-600 text-sm">{testimonial.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )
                })()}

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+13213669723"
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 sm:py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
                    onClick={handlePhoneClick}
                    data-call-tracking="true"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    <span className="text-base">Call For Service in {selectedCity.name}</span>
                  </a>
                  <button
                    onClick={() => {
                      closeCityModal()
                      setTimeout(() => {
                        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                      }, 100)
                    }}
                    className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-4 sm:py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    <span className="text-base">Book Service</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
