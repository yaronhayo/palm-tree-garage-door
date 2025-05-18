import { Shield, Award, ThumbsUp, Star } from "lucide-react"

export default function TrustBadges() {
  return (
    <section className="py-10 bg-white hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-600/10 p-3 rounded-full mb-3">
              <Shield className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-primary-600 mb-1">Licensed & Insured</h3>
            <p className="text-sm text-gray-600">Fully licensed and insured for your protection</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-600/10 p-3 rounded-full mb-3">
              <Award className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-primary-600 mb-1">Certified Technicians</h3>
            <p className="text-sm text-gray-600">Trained and certified garage door experts</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-600/10 p-3 rounded-full mb-3">
              <ThumbsUp className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-primary-600 mb-1">Satisfaction Guaranteed</h3>
            <p className="text-sm text-gray-600">We're not satisfied until you are</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="bg-primary-600/10 p-3 rounded-full mb-3">
              <Star className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-bold text-primary-600 mb-1">5-Star Service</h3>
            <p className="text-sm text-gray-600">Hundreds of 5-star reviews from happy customers</p>
          </div>
        </div>
      </div>
    </section>
  )
}
