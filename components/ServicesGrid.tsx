import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"

const ServicesGrid = () => {
  return (
    <div>
      {/* Your service grid content here */}
      <div className="mt-12 text-center">
        <Link
          href="/#booking"
          className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center mx-auto"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Schedule your service
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  )
}

export default ServicesGrid
