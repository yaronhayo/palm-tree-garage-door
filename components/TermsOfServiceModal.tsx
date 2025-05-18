"use client"

import { Modal } from "@/components/ui/Modal"

interface TermsOfServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service" size="lg">
      <div className="prose prose-sm max-w-none">
        <p className="mb-4 text-gray-600">Last Updated: May 14, 2025</p>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">1. Acceptance of Terms</h3>
          <p className="mb-3 text-gray-700">
            By accessing or using the services provided by Palm Tree Garage Door Repair ("we," "our," or "us"),
            including our website, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to
            these Terms, please do not use our services.
          </p>
          <p className="mb-3 text-gray-700">
            These Terms constitute a legally binding agreement between you and Palm Tree Garage Door Repair regarding
            your use of our services.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">2. Services</h3>
          <p className="mb-3 text-gray-700">
            Palm Tree Garage Door Repair provides garage door repair, installation, and maintenance services for
            residential and commercial properties in South Florida.
          </p>
          <p className="mb-3 text-gray-700">
            We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without
            notice or liability.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">3. Scheduling and Appointments</h3>
          <p className="mb-3 text-gray-700">When scheduling a service appointment, you agree to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Provide accurate and complete information</li>
            <li>Be available during the scheduled service window</li>
            <li>Provide reasonable access to the garage door and related components</li>
            <li>Notify us at least 24 hours in advance if you need to reschedule</li>
          </ul>
          <p className="mb-3 text-gray-700">
            We will make every effort to arrive within the scheduled service window. However, due to unforeseen
            circumstances such as weather conditions, traffic, or emergency calls, arrival times may vary.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">4. Pricing and Payment</h3>
          <p className="mb-3 text-gray-700">
            Service fees are based on the type of service, parts required, and labor. We will provide a cost estimate
            before beginning any work.
          </p>
          <p className="mb-3 text-gray-700">
            Payment is due upon completion of service unless otherwise agreed upon. We accept cash, checks, and major
            credit cards.
          </p>
          <p className="mb-3 text-gray-700">Additional charges may apply for:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Emergency or after-hours service</li>
            <li>Additional parts or labor not included in the original estimate</li>
            <li>Service calls to locations outside our standard service area</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">5. Warranties and Guarantees</h3>
          <p className="mb-3 text-gray-700">
            We provide a 90-day warranty on labor for all services performed. Manufacturer warranties apply to parts and
            equipment installed by our technicians.
          </p>
          <p className="mb-3 text-gray-700">Our warranty does not cover:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Damage caused by misuse, abuse, or neglect</li>
            <li>Damage caused by unauthorized repairs or modifications</li>
            <li>Normal wear and tear</li>
            <li>Acts of nature (floods, fires, etc.)</li>
          </ul>
          <p className="mb-3 text-gray-700">
            To make a warranty claim, please contact our customer service department within the warranty period.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">6. Cancellation Policy</h3>
          <p className="mb-3 text-gray-700">
            If you need to cancel a scheduled appointment, please notify us at least 24 hours in advance. Late
            cancellations or no-shows may result in a cancellation fee.
          </p>
          <p className="mb-3 text-gray-700">
            We reserve the right to cancel or reschedule appointments due to inclement weather, emergencies, or other
            unforeseen circumstances. We will make every effort to notify you promptly and reschedule at your
            convenience.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">7. Customer Responsibilities</h3>
          <p className="mb-3 text-gray-700">As a customer, you are responsible for:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Providing accurate information about your garage door system</li>
            <li>Ensuring a safe working environment for our technicians</li>
            <li>Removing valuable or fragile items from the service area</li>
            <li>Securing pets during the service appointment</li>
            <li>Following proper operation and maintenance guidelines after service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">8. Limitation of Liability</h3>
          <p className="mb-3 text-gray-700">
            To the maximum extent permitted by law, Palm Tree Garage Door Repair shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, including without limitation, loss of profits,
            data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Your use or inability to use our services</li>
            <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
            <li>Any interruption or cessation of transmission to or from our services</li>
            <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services</li>
          </ul>
          <p className="mb-3 text-gray-700">
            Our total liability for any claim arising out of or relating to these Terms or our services shall not exceed
            the amount paid by you for the services giving rise to such claim.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">9. Indemnification</h3>
          <p className="mb-3 text-gray-700">
            You agree to defend, indemnify, and hold harmless Palm Tree Garage Door Repair, its officers, directors,
            employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including,
            without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your
            access to or use of our services or your violation of these Terms.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">10. Governing Law</h3>
          <p className="mb-3 text-gray-700">
            These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without
            regard to its conflict of law provisions.
          </p>
          <p className="mb-3 text-gray-700">
            Any dispute arising from or relating to these Terms or our services shall be resolved exclusively in the
            courts located in Miami-Dade County, Florida.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">11. Changes to Terms</h3>
          <p className="mb-3 text-gray-700">
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
            posting the updated Terms on our website and updating the "Last Updated" date.
          </p>
          <p className="mb-3 text-gray-700">
            Your continued use of our services after such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-primary-800 mb-4">12. Contact Information</h3>
          <p className="mb-3 text-gray-700">If you have any questions about these Terms, please contact us:</p>
          <ul className="list-none mb-4 text-gray-700">
            <li>By email: info@palmtreegaragedoor.com</li>
            <li>By phone: (321) 366-9723</li>
            <li>By mail: 123 Palm Tree Lane, South Florida, FL 33301</li>
          </ul>
        </section>
      </div>
    </Modal>
  )
}
