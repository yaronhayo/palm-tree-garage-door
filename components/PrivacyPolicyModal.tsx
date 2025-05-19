"use client"

import { useEffect, useRef } from "react"

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 p-2 sm:p-4 pt-12 sm:pt-16">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-[95%] sm:max-w-4xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto mt-10 sm:mt-20"
      >
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-3 sm:p-4 border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-primary-800">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 touch-manipulation"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="prose prose-sm max-w-none">
            <p className="mb-4 text-gray-600">Last Updated: May 14, 2025</p>

            <section className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-800 mb-4">1. Introduction</h3>
              <p className="mb-3 text-gray-700">
                Palm Tree Garage Door Repair ("we," "our," or "us") respects your privacy and is committed to protecting
                your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our garage door repair services.
              </p>
              <p className="mb-3 text-gray-700">
                Please read this Privacy Policy carefully. By accessing or using our website or services, you
                acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy
                Policy.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-primary-800 mb-4">2. Information We Collect</h3>

              <h4 className="text-base sm:text-lg font-medium text-primary-700 mb-2">Personal Information</h4>
              <p className="mb-3 text-gray-700">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Fill out forms on our website</li>
                <li>Request a quote or schedule a service</li>
                <li>Contact us via phone, email, or contact form</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="mb-3 text-gray-700">
                This information may include your name, email address, phone number, mailing address, and service
                details.
              </p>

              <h4 className="text-base sm:text-lg font-medium text-primary-700 mb-2">
                Automatically Collected Information
              </h4>
              <p className="mb-3 text-gray-700">
                When you visit our website, we may automatically collect certain information about your device,
                including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
                <li>Click patterns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">3. How We Use Your Information</h3>
              <p className="mb-3 text-gray-700">
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Providing and maintaining our services</li>
                <li>Processing and fulfilling service requests</li>
                <li>Communicating with you about appointments and services</li>
                <li>Sending promotional materials and newsletters (with your consent)</li>
                <li>Improving our website and services</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Protecting against fraudulent or unauthorized activity</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">4. Cookies and Tracking Technologies</h3>
              <p className="mb-3 text-gray-700">
                We use cookies and similar tracking technologies to track activity on our website and store certain
                information. Cookies are files with a small amount of data that may include an anonymous unique
                identifier.
              </p>
              <p className="mb-3 text-gray-700">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
                if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
              <p className="mb-3 text-gray-700">We use the following types of cookies:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Essential cookies: Necessary for the website to function properly</li>
                <li>Analytical/performance cookies: Allow us to recognize and count visitors</li>
                <li>Functionality cookies: Enable enhanced functionality and personalization</li>
                <li>Targeting cookies: Record your visit, pages visited, and links followed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">5. Third-Party Disclosure</h3>
              <p className="mb-3 text-gray-700">We may share your information with:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Service providers who perform services on our behalf</li>
                <li>Professional advisors, such as lawyers and accountants</li>
                <li>Government bodies when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
              <p className="mb-3 text-gray-700">
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties
                without your consent, except as described in this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">6. Data Security</h3>
              <p className="mb-3 text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <p className="mb-3 text-gray-700">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we
                strive to use commercially acceptable means to protect your personal information, we cannot guarantee
                its absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">7. Your Rights</h3>
              <p className="mb-3 text-gray-700">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="mb-3 text-gray-700">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">8. Children's Privacy</h3>
              <p className="mb-3 text-gray-700">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children. If you are a parent or guardian and believe your child has provided us with
                personal information, please contact us, and we will take steps to remove that information.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-primary-800 mb-4">9. Changes to This Privacy Policy</h3>
              <p className="mb-3 text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="mb-3 text-gray-700">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-primary-800 mb-4">10. Contact Us</h3>
              <p className="mb-3 text-gray-700">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none mb-4 text-gray-700">
                <li>By email: palmtreegaragedoor@gmail.com</li>
                <li>By phone: (321) 366-9723</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
