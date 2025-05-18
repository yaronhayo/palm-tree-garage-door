import { Phone } from "lucide-react"

export default function FallbackPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-primary-600 mb-4">Palm Tree Garage Door Repair</h1>
        <p className="text-gray-700 mb-6">
          We're experiencing some technical difficulties with our website. Please contact us directly for garage door
          repair services.
        </p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Services:</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Garage Door Repair</li>
            <li>Spring Replacement</li>
            <li>Opener Repair & Installation</li>
            <li>Panel Replacement</li>
            <li>24/7 Emergency Service</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <a
            href="tel:+13213669723"
            className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
          >
            <Phone className="mr-2 h-5 w-5" />
            <span>Call Now: (321) 366-9723</span>
          </a>
        </div>
      </div>
    </div>
  )
}
