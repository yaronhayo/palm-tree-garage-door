export interface FAQItem {
  question: string
  answer: string
  category: string
  relatedServices?: string[]
  datePublished?: string
  dateModified?: string
  author?: string
  upvoteCount?: number
  keywords?: string[]
}

export interface FAQCategory {
  name: string
  description: string
  slug: string
  items: FAQItem[]
}

// Comprehensive FAQ data organized by categories
export const faqCategories: FAQCategory[] = [
  {
    name: "Pricing & Costs",
    description: "Common questions about garage door repair and installation costs",
    slug: "pricing-costs",
    items: [
      {
        question: "How much does garage door repair cost?",
        answer:
          "Garage door repair costs vary depending on the specific issue and your door type. Simple repairs like sensor alignment or minor adjustments typically range from $85-$150. More complex repairs such as spring replacement cost $175-$300, while opener repairs range from $100-$350. We provide free on-site estimates for all services, and our technicians will explain all options before any work begins. Emergency service calls may include an additional fee of $50-$75.",
        category: "Pricing & Costs",
        relatedServices: ["Garage Door Repair", "Spring Replacement", "Opener Repair"],
        datePublished: "2023-01-15",
        dateModified: "2024-01-15",
        author: "Palm Tree Garage Door",
        upvoteCount: 127,
        keywords: ["garage door repair cost", "repair pricing", "service fees"],
      },
      {
        question: "What factors affect garage door repair costs?",
        answer:
          "Several factors influence repair costs: 1) Type of repair needed (springs, cables, opener, panels), 2) Door size and weight (single vs. double garage), 3) Door material (steel, aluminum, wood), 4) Quality of replacement parts, 5) Time of service (emergency vs. scheduled), 6) Accessibility and complexity of the repair. Premium materials and after-hours service typically cost more, but provide better long-term value.",
        category: "Pricing & Costs",
        relatedServices: ["Garage Door Repair"],
        datePublished: "2023-02-01",
        dateModified: "2024-01-20",
        author: "Palm Tree Garage Door",
        upvoteCount: 89,
        keywords: ["repair cost factors", "pricing variables", "cost breakdown"],
      },
      {
        question: "Do you offer financing for garage door installations?",
        answer:
          "Yes, we offer flexible financing options for new garage door installations and major repairs. We partner with leading financing companies to provide 0% interest for 12 months on approved credit, as well as extended payment plans up to 60 months. The application process is quick and can often be completed on-site. Minimum purchase requirements apply, typically $500 or more.",
        category: "Pricing & Costs",
        relatedServices: ["New Installation"],
        datePublished: "2023-03-10",
        dateModified: "2024-01-25",
        author: "Palm Tree Garage Door",
        upvoteCount: 64,
        keywords: ["financing", "payment plans", "0% interest"],
      },
    ],
  },
  {
    name: "Service & Timing",
    description: "Questions about service availability, timing, and scheduling",
    slug: "service-timing",
    items: [
      {
        question: "How long does it take to repair a garage door?",
        answer:
          "Most garage door repairs can be completed in 1-2 hours. Simple fixes like sensor realignment or remote programming take 30-45 minutes. Spring replacement typically takes 1-2 hours, while opener installation requires 2-3 hours. Full door replacements take 3-4 hours. We strive to complete all repairs in a single visit and carry common parts in our service vehicles to minimize wait times.",
        category: "Service & Timing",
        relatedServices: ["Garage Door Repair", "Spring Replacement", "Opener Repair"],
        datePublished: "2023-01-20",
        dateModified: "2024-01-18",
        author: "Palm Tree Garage Door",
        upvoteCount: 156,
        keywords: ["repair time", "service duration", "completion time"],
      },
      {
        question: "Do you offer emergency garage door repair?",
        answer:
          "Yes, we offer 24/7 emergency garage door repair services throughout South Florida. Our emergency technicians can typically arrive within 1-2 hours for urgent situations such as doors stuck open/closed, broken springs preventing access, or security concerns. Emergency service is available 365 days a year, including holidays. Call our emergency hotline at (954) 864-2525 for immediate assistance.",
        category: "Service & Timing",
        relatedServices: ["Emergency Service"],
        datePublished: "2023-01-25",
        dateModified: "2024-01-22",
        author: "Palm Tree Garage Door",
        upvoteCount: 203,
        keywords: ["emergency repair", "24/7 service", "urgent repair"],
      },
      {
        question: "How far in advance should I schedule service?",
        answer:
          "For routine maintenance and non-urgent repairs, we recommend scheduling 2-3 days in advance to secure your preferred time slot. We offer same-day service for urgent repairs when available. During peak seasons (hurricane preparation, holiday seasons), booking 5-7 days ahead ensures availability. Emergency services are always available without advance scheduling.",
        category: "Service & Timing",
        relatedServices: ["Maintenance & Tune-Up"],
        datePublished: "2023-02-15",
        dateModified: "2024-01-28",
        author: "Palm Tree Garage Door",
        upvoteCount: 72,
        keywords: ["scheduling", "appointment booking", "service availability"],
      },
    ],
  },
  {
    name: "Parts & Equipment",
    description: "Information about garage door parts, brands, and equipment",
    slug: "parts-equipment",
    items: [
      {
        question: "How long do garage door springs last?",
        answer:
          "Garage door springs typically last 7-10 years or about 10,000 cycles (one cycle = one open and close). Factors affecting lifespan include: 1) Spring quality (we use high-cycle springs rated for 15,000+ cycles), 2) Door weight and balance, 3) Frequency of use (average home: 3-5 cycles daily), 4) Climate conditions (humidity and salt air can accelerate wear), 5) Proper maintenance. Regular lubrication and professional tune-ups can extend spring life by 20-30%.",
        category: "Parts & Equipment",
        relatedServices: ["Spring Replacement", "Maintenance & Tune-Up"],
        datePublished: "2023-01-30",
        dateModified: "2024-01-24",
        author: "Palm Tree Garage Door",
        upvoteCount: 189,
        keywords: ["spring lifespan", "spring durability", "replacement frequency"],
      },
      {
        question: "What brands of garage door openers do you service?",
        answer:
          "We service all major brands of garage door openers including: LiftMaster, Chamberlain, Genie, Craftsman, Marantec, Linear, Overhead Door, Wayne Dalton, Amarr, and more. Our technicians are factory-trained and certified to repair and install these brands. We also work with smart home-enabled openers and can help integrate your opener with home automation systems like MyQ, Amazon Key, and Google Home.",
        category: "Parts & Equipment",
        relatedServices: ["Opener Repair", "New Installation"],
        datePublished: "2023-02-05",
        dateModified: "2024-01-26",
        author: "Palm Tree Garage Door",
        upvoteCount: 145,
        keywords: ["opener brands", "manufacturer support", "brand compatibility"],
      },
      {
        question: "What's the difference between belt drive and chain drive openers?",
        answer:
          "Belt drive openers use a reinforced rubber belt and are significantly quieter (ideal for attached garages or bedrooms above). They cost $50-100 more but require less maintenance. Chain drive openers use a metal chain, are more affordable, and extremely durable but noisier during operation. Both types offer similar lifting power and reliability. We recommend belt drives for attached garages and chain drives for detached garages where noise isn't a concern.",
        category: "Parts & Equipment",
        relatedServices: ["Opener Repair", "New Installation"],
        datePublished: "2023-02-20",
        dateModified: "2024-01-30",
        author: "Palm Tree Garage Door",
        upvoteCount: 112,
        keywords: ["belt drive", "chain drive", "opener types"],
      },
    ],
  },
  {
    name: "Maintenance & Troubleshooting",
    description: "DIY tips and maintenance advice for garage doors",
    slug: "maintenance-troubleshooting",
    items: [
      {
        question: "How often should I maintain my garage door?",
        answer:
          "Professional maintenance should be performed annually, ideally before summer heat or winter cold. Between professional services, perform monthly visual inspections and quarterly DIY maintenance: 1) Lubricate moving parts with silicone spray, 2) Test safety sensors and auto-reverse, 3) Check door balance, 4) Tighten loose hardware, 5) Clean tracks and weather seals. This routine prevents 80% of common problems and extends door life by 5-10 years.",
        category: "Maintenance & Troubleshooting",
        relatedServices: ["Maintenance & Tune-Up"],
        datePublished: "2023-02-10",
        dateModified: "2024-02-01",
        author: "Palm Tree Garage Door",
        upvoteCount: 234,
        keywords: ["maintenance schedule", "preventive care", "door upkeep"],
      },
      {
        question: "Why is my garage door making noise?",
        answer:
          "Common causes of garage door noise include: 1) Worn rollers (squeaking/grinding), 2) Loose hardware (rattling), 3) Unbalanced door (straining), 4) Dry hinges/springs (squealing), 5) Worn opener gears (grinding). Most noise issues are resolved with lubrication and minor adjustments. Persistent or loud noises may indicate worn parts needing replacement. Never ignore new or worsening sounds as they often precede failures.",
        category: "Maintenance & Troubleshooting",
        relatedServices: ["Garage Door Repair", "Maintenance & Tune-Up"],
        datePublished: "2023-03-01",
        dateModified: "2024-02-02",
        author: "Palm Tree Garage Door",
        upvoteCount: 178,
        keywords: ["noisy door", "garage door sounds", "noise troubleshooting"],
      },
      {
        question: "What should I do if my garage door won't open?",
        answer:
          "First, check these common issues: 1) Ensure opener is plugged in and circuit breaker hasn't tripped, 2) Replace remote batteries, 3) Check if manual lock is engaged, 4) Verify safety sensors are aligned and clean, 5) Test wall button to isolate remote issues. If door is stuck, never force it - this could cause injury or damage. For spring-related issues (door feels heavy or won't stay open), call a professional immediately as springs are under extreme tension.",
        category: "Maintenance & Troubleshooting",
        relatedServices: ["Emergency Service", "Garage Door Repair"],
        datePublished: "2023-03-05",
        dateModified: "2024-02-03",
        author: "Palm Tree Garage Door",
        upvoteCount: 267,
        keywords: ["door won't open", "troubleshooting", "common problems"],
      },
    ],
  },
  {
    name: "Warranty & Guarantees",
    description: "Information about warranties, guarantees, and service agreements",
    slug: "warranty-guarantees",
    items: [
      {
        question: "Do you provide warranties on your work?",
        answer:
          "Yes, we provide comprehensive warranties: 1) Lifetime warranty on all parts we install (springs, cables, rollers, hinges), 2) 5-year labor warranty on repairs, 3) 10-year warranty on new door installations, 4) 3-year warranty on opener installations. Our warranties cover defects in materials and workmanship. We also offer extended service agreements that include annual maintenance and priority emergency service. All warranties are transferable to new homeowners.",
        category: "Warranty & Guarantees",
        relatedServices: ["All Services"],
        datePublished: "2023-01-10",
        dateModified: "2024-01-15",
        author: "Palm Tree Garage Door",
        upvoteCount: 298,
        keywords: ["warranty", "guarantee", "service agreement"],
      },
      {
        question: "What does your satisfaction guarantee cover?",
        answer:
          "Our 100% satisfaction guarantee means: 1) If you're not satisfied with our repair, we'll return at no charge to make it right, 2) 30-day price match guarantee - we'll refund the difference if you find a lower price, 3) No surprise fees - quoted price is final price, 4) Clean work area - we protect your property and clean up completely, 5) On-time arrival or service call is free. This guarantee demonstrates our commitment to exceptional service.",
        category: "Warranty & Guarantees",
        relatedServices: ["All Services"],
        datePublished: "2023-02-25",
        dateModified: "2024-02-04",
        author: "Palm Tree Garage Door",
        upvoteCount: 156,
        keywords: ["satisfaction guarantee", "service promise", "customer protection"],
      },
    ],
  },
  {
    name: "Safety & Security",
    description: "Safety concerns and security features for garage doors",
    slug: "safety-security",
    items: [
      {
        question: "Are garage doors safe for children and pets?",
        answer:
          "Modern garage doors include multiple safety features: 1) Photo-eye sensors that reverse the door if obstruction detected, 2) Auto-reverse mechanism if door contacts an object, 3) Manual release for power outages, 4) Rolling code technology to prevent break-ins. We recommend: teaching children garage doors aren't toys, testing safety features monthly, keeping remotes away from children, and installing keypads at adult height. Consider smart openers with smartphone alerts for added peace of mind.",
        category: "Safety & Security",
        relatedServices: ["New Installation", "Opener Repair"],
        datePublished: "2023-03-15",
        dateModified: "2024-02-05",
        author: "Palm Tree Garage Door",
        upvoteCount: 145,
        keywords: ["garage door safety", "child safety", "pet safety"],
      },
      {
        question: "How can I improve my garage door security?",
        answer:
          "Enhance garage security with: 1) Smart opener with real-time alerts and auto-close timers, 2) Deadbolt locks on manual doors, 3) Security cameras and motion lights, 4) Frosted windows to prevent visibility, 5) Reinforced door panels and tracks, 6) Vacation mode to disable remote access, 7) Regular maintenance to ensure proper operation. We offer security assessments and can recommend upgrades based on your specific needs and neighborhood concerns.",
        category: "Safety & Security",
        relatedServices: ["New Installation", "Security Upgrades"],
        datePublished: "2023-03-20",
        dateModified: "2024-02-06",
        author: "Palm Tree Garage Door",
        upvoteCount: 189,
        keywords: ["garage security", "door security", "break-in prevention"],
      },
    ],
  },
]

// Flatten all FAQ items for easy access
export const faqItems: FAQItem[] = faqCategories.flatMap((category) => category.items)

// Get FAQs by category
export function getFAQsByCategory(categorySlug: string): FAQItem[] {
  const category = faqCategories.find((cat) => cat.slug === categorySlug)
  return category ? category.items : []
}

// Get related FAQs by service
export function getRelatedFAQs(serviceName: string): FAQItem[] {
  return faqItems.filter((item) => item.relatedServices?.includes(serviceName))
}

// Get popular FAQs (by upvote count)
export function getPopularFAQs(limit = 5): FAQItem[] {
  return [...faqItems].sort((a, b) => (b.upvoteCount || 0) - (a.upvoteCount || 0)).slice(0, limit)
}

// Search FAQs
export function searchFAQs(query: string): FAQItem[] {
  const lowerQuery = query.toLowerCase()
  return faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(lowerQuery) ||
      item.answer.toLowerCase().includes(lowerQuery) ||
      item.keywords?.some((keyword) => keyword.toLowerCase().includes(lowerQuery)),
  )
}
