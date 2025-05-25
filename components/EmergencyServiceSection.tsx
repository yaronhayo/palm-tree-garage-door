import { CheckCircle, Clock, PhoneCall } from "lucide-react"

export default function EmergencyServiceSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Column */}
          <div className="relative h-64 md:h-full min-h-[300px] order-1 md:order-2">
            {/* Regular img tag as fallback */}
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Car%20White%201-Qvrdum4WWdvilDKBHDmpN6T1zZEJKB.webp"
              alt="Palm Tree Garage Door emergency service truck in South Florida"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>

          {/* Content Column */}
          <div className="p-8 lg:p-10 flex flex-col justify-center order-2 md:order-1">
            <div className="inline-flex items-center px-4 py-2 bg-accent-500 text-primary-900 rounded-full font-bold text-sm mb-6 self-start">
              <Clock className="h-4 w-4 mr-2" />
              PALM TREE 24/7 EMERGENCY SERVICE
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Palm Tree Garage Door Emergency Service When You Need It Most
            </h2>

            <p className="text-white/90 mb-6">
              Don't wait when you have a garage door emergency. Palm Tree Garage Door technicians are available 24/7 to
              handle urgent repairs and get your door working again quickly throughout South Florida.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold">Fast Response Times from Palm Tree</h3>
                  <p className="text-white/80 text-sm">Our technicians arrive quickly throughout South Florida</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold">Fully Equipped Service Vehicles</h3>
                  <p className="text-white/80 text-sm">
                    Palm Tree brings everything needed to fix your door on the first visit
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold">Transparent Pricing</h3>
                  <p className="text-white/80 text-sm">No hidden fees or surprise charges from Palm Tree Garage Door</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-accent-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold">All Repairs Guaranteed</h3>
                  <p className="text-white/80 text-sm">
                    Palm Tree Garage Door stands behind our work with solid warranties
                  </p>
                </div>
              </div>
            </div>

            <a
              href="tel:+13213669723"
              className="bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center self-start shadow-lg hover:shadow-xl"
              data-call-tracking="true"
            >
              <PhoneCall className="h-5 w-5 mr-2" />
              Call Palm Tree For Emergency Service
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
