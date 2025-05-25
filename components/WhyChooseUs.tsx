import { Shield, Clock, Award, Percent, Home, Heart } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-600 mb-4">
            Why Choose Palm Tree Garage Door Repair?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Palm Tree Garage Door has been serving South Florida homeowners with reliable, professional garage door
            services for years. Here's why our customers trust us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 - Free Estimates */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="bg-primary-600/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Home className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-600 mb-3">Free On-Site Estimates</h3>
            <p className="text-gray-600">
              Palm Tree Garage Door provides completely free, no-obligation estimates for all services. Our technicians
              come to your home, assess your garage door needs, and provide transparent recommendations.
            </p>
          </div>

          {/* Card 2 - Lifetime Warranty */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="bg-primary-600/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Shield className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-600 mb-3">Lifetime Warranty on Parts</h3>
            <p className="text-gray-600">
              We stand behind our work with an industry-leading lifetime warranty on all parts we install. This
              exceptional coverage demonstrates our confidence in the quality of our materials and workmanship.
            </p>
          </div>

          {/* Card 3 - Discounts */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="bg-primary-600/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Percent className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-600 mb-3">Senior & Veteran Discounts</h3>
            <p className="text-gray-600">
              Palm Tree Garage Door proudly offers special discounts for seniors and veterans. We're honored to serve
              those who have served our country and our long-standing community members.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="bg-primary-600/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Clock className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-600 mb-3">Fast Response Times</h3>
            <p className="text-gray-600">
              Palm Tree Garage Door technicians arrive promptly to diagnose and fix your garage door issues. We
              understand that a malfunctioning garage door is more than an inconvenience—it's a security concern.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="bg-primary-600/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Award className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-600 mb-3">Experienced Technicians</h3>
            <p className="text-gray-600">
              Our Palm Tree technicians are certified, experienced, and continuously trained on the latest garage door
              systems. We've seen and fixed every type of garage door problem throughout South Florida.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="bg-primary-600/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Heart className="h-7 w-7 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-primary-600 mb-3">Customer Satisfaction</h3>
            <p className="text-gray-600">
              Palm Tree Garage Door has built our reputation on exceptional customer service. Our 5-star reviews and
              high referral rate speak to our commitment to your complete satisfaction on every job.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
