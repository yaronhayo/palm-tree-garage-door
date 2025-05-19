export type ServiceArea = {
  id: string
  name: string
  county: string
  population: string
  description: string
  zipCodes?: string[]
}

export type Testimonial = {
  id: number
  name: string
  location: string
  rating: number
  quote: string
  date?: string
  serviceType?: string
}
