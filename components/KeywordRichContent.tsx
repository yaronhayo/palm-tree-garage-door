interface KeywordRichContentProps {
  serviceType: string
  location: string
  keywords: string[]
}

export default function KeywordRichContent({ serviceType, location, keywords }: KeywordRichContentProps) {
  // Generate a paragraph with natural keyword inclusion
  const generateKeywordParagraph = () => {
    const sentences = [
      `Our professional ${serviceType.toLowerCase()} services in ${location} are designed to provide fast, reliable solutions for homeowners and businesses.`,
      `We understand that garage door issues can be frustrating and potentially dangerous, which is why we offer 24/7 emergency ${keywords[0]} services.`,
      `Our team of certified technicians specializes in ${keywords[1]} and ${keywords[2]}, ensuring your garage door operates safely and efficiently.`,
      `With years of experience in ${keywords[3]} throughout ${location}, we've built a reputation for quality workmanship and exceptional customer service.`,
      `Whether you need ${keywords[4]} or comprehensive ${keywords[5]}, our experts have the skills and equipment to get the job done right the first time.`,
    ]

    return sentences.join(" ")
  }

  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{generateKeywordParagraph()}</p>
          <h3 className="text-xl font-semibold text-primary-700 mt-6">
            Why Choose Our {serviceType} Services in {location}?
          </h3>
          <ul className="mt-4 space-y-2">
            <li className="flex items-start">
              <span className="text-accent-500 font-bold mr-2">✓</span>
              <span>Fast response times with 24/7 availability for emergency {keywords[0]}</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-500 font-bold mr-2">✓</span>
              <span>
                Experienced technicians specialized in {keywords[1]} and {keywords[2]}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-500 font-bold mr-2">✓</span>
              <span>Transparent pricing with no hidden fees for all {keywords[3]} services</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-500 font-bold mr-2">✓</span>
              <span>
                High-quality parts and materials for {keywords[4]} and {keywords[5]}
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-accent-500 font-bold mr-2">✓</span>
              <span>Satisfaction guaranteed on all our work in {location} and surrounding areas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
