import { CheckCircle } from "lucide-react"

export default function EmergencyServiceSection() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-primary-600 rounded-xl overflow-hidden shadow-xl">
        <div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Emergency Garage Door Service Available 24/7
            </h3>
            <p className="text-white/90 mb-6">
              Don't wait when you have a garage door emergency. Our technicians are available 24/7 to handle urgent
              repairs and get your door working again quickly.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-white">
                <CheckCircle className="h-5 w-5 text-accent-500 mr-3" />
                <span>Fast response times throughout South Florida</span>
              </li>
              <li className="flex items-center text-white">
                <CheckCircle className="h-5 w-5 text-accent-500 mr-3" />
                <span>Fully equipped service vehicles</span>
              </li>
              <li className="flex items-center text-white">
                <CheckCircle className="h-5 w-5 text-accent-500 mr-3" />
                <span>Transparent pricing with no hidden fees</span>
              </li>
              <li className="flex items-center text-white">
                <CheckCircle className="h-5 w-5 text-accent-500 mr-3" />
                <span>All repairs guaranteed</span>
              </li>
            </ul>
            <a
              href="tel:+13213669723"
              className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center self-start"
              data-call-tracking="true"
            >
              Call For Emergency Service
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
