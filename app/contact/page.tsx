import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Palm Tree Garage Door Repair for all your garage door needs. Available 24/7 for emergency service.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl text-gray-200 mb-8">Get in touch with our team for all your garage door needs</p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6">Get In Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Have questions about our services or need to schedule a repair? Contact us using any of the methods
                  below or fill out the form to get started.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-4 mt-1 text-primary-600" />
                    <div>
                      <h3 className="text-xl font-bold text-primary-900 mb-1">Phone</h3>
                      <p className="text-lg">
                        <a href="tel:3213669723" className="text-primary-600 hover:text-primary-800">
                          (321) 366-9723
                        </a>
                      </p>
                      <p className="text-gray-600 mt-1">Available 24/7 for emergency service</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-4 mt-1 text-primary-600" />
                    <div>
                      <h3 className="text-xl font-bold text-primary-900 mb-1">Email</h3>
                      <p className="text-lg">
                        <a
                          href="mailto:info@palmtreegaragedoor.com"
                          className="text-primary-600 hover:text-primary-800"
                        >
                          info@palmtreegaragedoor.com
                        </a>
                      </p>
                      <p className="text-gray-600 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-4 mt-1 text-primary-600" />
                    <div>
                      <h3 className="text-xl font-bold text-primary-900 mb-1">Service Area</h3>
                      <p className="text-lg text-gray-800">Central Florida</p>
                      <p className="text-gray-600 mt-1">
                        Serving Orlando, Kissimmee, Winter Park, Sanford, Lake Mary, and surrounding areas
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 mr-4 mt-1 text-primary-600" />
                    <div>
                      <h3 className="text-xl font-bold text-primary-900 mb-1">Hours</h3>
                      <p className="text-lg text-gray-800">24/7 Emergency Service Available</p>
                      <div className="text-gray-600 mt-1">
                        <p>Regular Office Hours:</p>
                        <p>Monday - Saturday: 7:00 AM - 7:00 PM</p>
                        <p>Sunday: By appointment only</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-primary-900 mb-4">Emergency Service</h3>
                  <p className="text-gray-600 mb-4">
                    Experiencing an urgent garage door issue? Our emergency service is available 24/7.
                  </p>
                  <Link
                    href="tel:3213669723"
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-md transition-colors inline-flex items-center"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Our Emergency Line
                  </Link>
                </div>
              </div>

              <div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h3 className="text-2xl font-bold text-primary-900 mb-6">Send Us a Message</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-primary-900 mb-4">Our Service Areas</h2>
              <p className="text-lg text-gray-600">We proudly serve the following areas in Central Florida</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary-900 mb-3">Orlando</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Downtown Orlando</li>
                  <li>Lake Nona</li>
                  <li>Dr. Phillips</li>
                  <li>College Park</li>
                  <li>Baldwin Park</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary-900 mb-3">Kissimmee</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Downtown Kissimmee</li>
                  <li>Celebration</li>
                  <li>Poinciana</li>
                  <li>Buenaventura Lakes</li>
                  <li>Reunion</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary-900 mb-3">Winter Park</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Downtown Winter Park</li>
                  <li>Maitland</li>
                  <li>Casselberry</li>
                  <li>Goldenrod</li>
                  <li>Winter Springs</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary-900 mb-3">Sanford</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Downtown Sanford</li>
                  <li>Heathrow</li>
                  <li>Lake Mary</li>
                  <li>Longwood</li>
                  <li>Altamonte Springs</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary-900 mb-3">East Orlando</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Waterford Lakes</li>
                  <li>Avalon Park</li>
                  <li>UCF Area</li>
                  <li>Oviedo</li>
                  <li>Bithlo</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-primary-900 mb-3">West Orlando</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>MetroWest</li>
                  <li>Windermere</li>
                  <li>Winter Garden</li>
                  <li>Ocoee</li>
                  <li>Apopka</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't see your area listed? Contact us to check if we service your location.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
