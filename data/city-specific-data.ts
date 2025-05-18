interface CommonIssue {
  title: string
  description: string
}

interface RecentProject {
  image: string
  description: string
}

interface Service {
  title: string
  description: string
  startingPrice: number
}

interface BuildingCodes {
  windLoad: string
  permits: string
  hoa: string
  insurance: string
}

interface Testimonial {
  name: string
  location: string
  quote: string
  image?: string
}

interface CityData {
  heroImage?: string
  neighborhoods: string[]
  landmarks: string[]
  commonIssues: CommonIssue[]
  recentProjects: RecentProject[]
  services: Service[]
  buildingCodes: BuildingCodes
  featuredTestimonial: Testimonial
}

const cityData: Record<string, CityData> = {
  "Delray Beach": {
    heroImage: "/images/delray-beach-garage-door.jpg",
    neighborhoods: [
      "Pineapple Grove",
      "Lake Ida",
      "Seagate",
      "Delray Beach Shores",
      "Tropic Isle",
      "Delray Dunes",
      "Tierra Del Rey",
      "Rainberry Bay",
    ],
    landmarks: [
      "Atlantic Avenue",
      "Delray Beach Tennis Center",
      "Morikami Museum and Japanese Gardens",
      "Delray Municipal Beach",
      "Old School Square",
      "Wakodahatchee Wetlands",
      "Delray Marketplace",
      "Veterans Park",
    ],
    commonIssues: [
      {
        title: "Salt Air Corrosion",
        description:
          "Proximity to the ocean causes accelerated rusting of springs, tracks, and hardware in Delray Beach garage doors.",
      },
      {
        title: "Hurricane Damage",
        description:
          "Storm damage to garage doors is common, requiring reinforcement and repair to meet Delray Beach's strict wind codes.",
      },
      {
        title: "Humidity-Related Issues",
        description: "Delray Beach's high humidity causes wood doors to warp and electronic components to malfunction.",
      },
      {
        title: "Power Surges",
        description:
          "Florida's frequent lightning storms cause power surges that damage garage door openers in Delray Beach homes.",
      },
    ],
    recentProjects: [
      {
        image: "/images/projects/delray-beach-1.png",
        description: "Hurricane-rated garage door installation in Seagate",
      },
      {
        image: "/images/projects/delray-beach-2.png",
        description: "Custom wood garage door in Pineapple Grove",
      },
      {
        image: "/images/projects/delray-beach-3.png",
        description: "Spring replacement for beachfront property",
      },
      {
        image: "/images/projects/delray-beach-4.png",
        description: "Smart opener installation in Lake Ida",
      },
      {
        image: "/images/projects/delray-beach-5.png",
        description: "Track repair after storm damage",
      },
      {
        image: "/images/projects/delray-beach-6.png",
        description: "Full garage door system replacement",
      },
    ],
    services: [
      {
        title: "Hurricane-Rated Door Installation",
        description:
          "Wind-resistant garage doors that meet or exceed Delray Beach building codes for hurricane protection.",
        startingPrice: 1299,
      },
      {
        title: "Salt-Resistant Spring Replacement",
        description: "Specialized springs designed to withstand Delray Beach's corrosive salt air environment.",
        startingPrice: 249,
      },
      {
        title: "Smart Opener Installation",
        description: "Modern, WiFi-enabled garage door openers with smartphone control for Delray Beach homes.",
        startingPrice: 399,
      },
      {
        title: "Preventative Maintenance",
        description:
          "Regular service to prevent common Delray Beach garage door issues caused by humidity and salt air.",
        startingPrice: 149,
      },
      {
        title: "Emergency Storm Repair",
        description: "Fast response for garage doors damaged during Delray Beach's frequent storms and hurricanes.",
        startingPrice: 199,
      },
      {
        title: "Custom Door Design",
        description: "Beautiful, custom garage doors that complement Delray Beach's unique architectural styles.",
        startingPrice: 1899,
      },
    ],
    buildingCodes: {
      windLoad:
        "Delray Beach requires garage doors to withstand wind speeds of at least 170 mph in accordance with Florida Building Code for High-Velocity Hurricane Zones (HVHZ).",
      permits:
        "Permits are required for new garage door installations and most major repairs in Delray Beach. Our team handles all permitting paperwork.",
      hoa: "Many Delray Beach communities have specific requirements for garage door styles, colors, and materials. We work with all local HOAs to ensure compliance.",
      insurance:
        "Installing a code-compliant garage door may qualify Delray Beach homeowners for insurance discounts. We provide all necessary documentation.",
    },
    featuredTestimonial: {
      name: "Michael R.",
      location: "Seagate, Delray Beach",
      quote:
        "After my garage door was damaged in last year's hurricane, Palm Tree Garage Door installed a new hurricane-rated door that's already survived two major storms. Their knowledge of Delray Beach's building codes saved me a lot of headaches with permits.",
      image: "/images/testimonials/michael-delray.jpg",
    },
  },
  Plantation: {
    heroImage: "/images/plantation-garage-door.jpg",
    neighborhoods: [
      "Plantation Acres",
      "Jacaranda",
      "Plantation Isles",
      "Central Plantation",
      "Plantation Golf Estates",
      "Plantation Park",
      "Lauderdale West",
      "Country Club Estates",
    ],
    landmarks: [
      "Plantation Preserve Golf Course",
      "Volunteer Park",
      "Plantation Heritage Park",
      "Westfield Broward Mall",
      "Plantation Central Park",
      "Plantation Historical Museum",
      "Seminole Hard Rock Hotel & Casino",
      "The Fountains Shopping Center",
    ],
    commonIssues: [
      {
        title: "Tropical Storm Damage",
        description:
          "Plantation's exposure to tropical storms often leads to bent tracks and damaged panels requiring professional repair.",
      },
      {
        title: "Insect Infestation",
        description: "Florida's termites and other insects can damage wooden garage doors in Plantation homes.",
      },
      {
        title: "Opener Malfunctions",
        description: "Plantation's frequent power fluctuations during storm season cause garage door opener failures.",
      },
      {
        title: "Track Misalignment",
        description: "Plantation's sandy soil can cause foundation shifts that lead to garage door track misalignment.",
      },
    ],
    recentProjects: [
      {
        image: "/images/projects/plantation-1.png",
        description: "Modern aluminum garage door in Jacaranda",
      },
      {
        image: "/images/projects/plantation-2.png",
        description: "Double garage door replacement in Plantation Acres",
      },
      {
        image: "/images/projects/plantation-3.png",
        description: "Opener upgrade with battery backup in Plantation Isles",
      },
      {
        image: "/images/projects/plantation-4.png",
        description: "Track and roller system replacement",
      },
      {
        image: "/images/projects/plantation-5.png",
        description: "Storm damage repair in Central Plantation",
      },
      {
        image: "/images/projects/plantation-6.png",
        description: "Custom carriage-style door installation",
      },
    ],
    services: [
      {
        title: "Complete Door Replacement",
        description:
          "Full garage door replacement with styles that complement Plantation's diverse architectural styles.",
        startingPrice: 1099,
      },
      {
        title: "Storm Preparation Service",
        description: "Pre-hurricane season inspection and reinforcement for Plantation garage doors.",
        startingPrice: 179,
      },
      {
        title: "Insect-Resistant Door Installation",
        description: "Composite and metal doors that resist Plantation's termites and other insects.",
        startingPrice: 1299,
      },
      {
        title: "Backup Battery Installation",
        description:
          "Battery backup systems for garage door openers to function during Plantation's frequent power outages.",
        startingPrice: 249,
      },
      {
        title: "Track Realignment",
        description:
          "Precision adjustment of garage door tracks to correct Plantation's common foundation settlement issues.",
        startingPrice: 189,
      },
      {
        title: "Weatherstripping Replacement",
        description: "Heavy-duty weatherstripping to protect against Plantation's heavy rains and humidity.",
        startingPrice: 149,
      },
    ],
    buildingCodes: {
      windLoad:
        "Plantation requires garage doors to withstand wind speeds of at least 160 mph according to Florida Building Code standards.",
      permits:
        "Plantation requires permits for new installations and major structural repairs to garage doors. Our team manages the entire permitting process.",
      hoa: "Many Plantation communities, especially in Jacaranda and Plantation Isles, have specific guidelines for garage door appearance. We ensure all installations meet HOA requirements.",
      insurance:
        "Installing a code-compliant garage door can reduce home insurance premiums in Plantation. We provide documentation for insurance purposes.",
    },
    featuredTestimonial: {
      name: "Jennifer L.",
      location: "Jacaranda, Plantation",
      quote:
        "After three different companies couldn't fix our garage door's persistent problems, Palm Tree Garage Door diagnosed the issue immediately - our foundation had shifted slightly, causing the track misalignment. They fixed it perfectly and now it works like new!",
      image: "/images/testimonials/jennifer-plantation.png",
    },
  },
  "Coral Springs": {
    heroImage: "/images/coral-springs-garage-door.jpg",
    neighborhoods: [
      "Eagle Trace",
      "Coral Springs Country Club",
      "Maplewood",
      "The Hammocks",
      "Cypress Run",
      "Cypress Pointe",
      "Ramblewood",
      "Westchester",
    ],
    landmarks: [
      "Coral Springs Center for the Arts",
      "Coral Springs Museum of Art",
      "Sportsplex at Coral Springs",
      "Tall Cypress Natural Area",
      "Coral Springs Aquatic Complex",
      "The Walk of Coral Springs",
      "Betti Stradling Park",
      "Coral Square Mall",
    ],
    commonIssues: [
      {
        title: "Impact Damage",
        description:
          "Coral Springs' active families often cause accidental damage to garage doors from bikes, sports equipment, and vehicles.",
      },
      {
        title: "Noise Complaints",
        description:
          "Older garage doors in Coral Springs communities generate noise complaints from neighbors, requiring quieter systems.",
      },
      {
        title: "Security Concerns",
        description:
          "Coral Springs homeowners frequently request security upgrades for garage doors to protect valuable items stored in garages.",
      },
      {
        title: "HOA Compliance Issues",
        description:
          "Many Coral Springs communities have strict HOA regulations regarding garage door appearance and maintenance.",
      },
    ],
    recentProjects: [
      {
        image: "/images/projects/coral-springs-1.png",
        description: "Quiet belt-drive opener installation in Eagle Trace",
      },
      {
        image: "/images/projects/coral-springs-2.png",
        description: "Security-enhanced garage door in Maplewood",
      },
      {
        image: "/images/projects/coral-springs-3.png",
        description: "HOA-compliant door replacement in Cypress Run",
      },
      {
        image: "/images/projects/coral-springs-4.png",
        description: "Child-safe sensor system installation",
      },
      {
        image: "/images/projects/coral-springs-5.png",
        description: "Impact-resistant door panel replacement",
      },
      {
        image: "/images/projects/coral-springs-6.png",
        description: "Smart home integration for garage access",
      },
    ],
    services: [
      {
        title: "Quiet Operation Systems",
        description:
          "Ultra-quiet belt drive openers and noise-reducing hardware perfect for Coral Springs' close-knit neighborhoods.",
        startingPrice: 349,
      },
      {
        title: "Enhanced Security Packages",
        description:
          "Advanced security features including rolling code technology and smartphone monitoring for Coral Springs homes.",
        startingPrice: 299,
      },
      {
        title: "HOA-Compliant Door Installation",
        description: "Garage doors that meet the specific requirements of Coral Springs' many homeowners associations.",
        startingPrice: 1199,
      },
      {
        title: "Child-Safe System Installation",
        description: "Enhanced safety features designed for Coral Springs families with young children.",
        startingPrice: 199,
      },
      {
        title: "Impact-Resistant Panel Replacement",
        description: "Durable replacement panels that withstand the active lifestyle of Coral Springs residents.",
        startingPrice: 289,
      },
      {
        title: "Smart Home Integration",
        description: "Integration of garage door systems with popular smart home platforms used in Coral Springs.",
        startingPrice: 249,
      },
    ],
    buildingCodes: {
      windLoad:
        "Coral Springs requires garage doors to meet the 160 mph wind resistance standard per Florida Building Code.",
      permits:
        "Coral Springs has specific permit requirements for garage door replacements. Our team handles all necessary paperwork and inspections.",
      hoa: "Coral Springs has some of the strictest HOA regulations in South Florida. We maintain relationships with local HOAs to ensure smooth approval processes.",
      insurance:
        "Many insurance companies offer discounts to Coral Springs homeowners who install code-compliant garage doors. We provide all necessary certification.",
    },
    featuredTestimonial: {
      name: "David and Sarah T.",
      location: "Eagle Trace, Coral Springs",
      quote:
        "With three kids and all their sports equipment, our old garage door took a beating. Palm Tree installed a new impact-resistant door with a whisper-quiet opener that our neighbors appreciate! They even helped us get HOA approval with no hassle.",
      image: "/images/testimonials/david-sarah-coral-springs.png",
    },
  },
  // Default data for other cities
  default: {
    heroImage: "/images/default-garage-door.jpg",
    neighborhoods: [
      "Downtown",
      "Westside",
      "Northside",
      "Eastside",
      "Southside",
      "Central District",
      "Historic District",
      "Waterfront",
    ],
    landmarks: [
      "City Hall",
      "Community Park",
      "Shopping Center",
      "Public Library",
      "Sports Complex",
      "Main Street",
      "Beach Access",
      "Local High School",
    ],
    commonIssues: [
      {
        title: "Hurricane Damage",
        description:
          "South Florida's hurricane season often causes damage to garage doors requiring professional repair.",
      },
      {
        title: "Salt Air Corrosion",
        description: "Proximity to the ocean causes accelerated rusting of springs, tracks, and hardware.",
      },
      {
        title: "Humidity-Related Issues",
        description: "Florida's high humidity causes wood doors to warp and electronic components to malfunction.",
      },
      {
        title: "Power Surges",
        description: "Florida's frequent lightning storms cause power surges that damage garage door openers.",
      },
    ],
    recentProjects: [
      {
        image: "/images/projects/default-1.png",
        description: "Hurricane-rated garage door installation",
      },
      {
        image: "/images/projects/default-2.png",
        description: "Custom wood garage door",
      },
      {
        image: "/images/projects/default-3.png",
        description: "Spring replacement",
      },
      {
        image: "/images/projects/default-4.png",
        description: "Smart opener installation",
      },
      {
        image: "/images/projects/default-5.png",
        description: "Track repair after storm damage",
      },
      {
        image: "/images/projects/default-6.png",
        description: "Full garage door system replacement",
      },
    ],
    services: [
      {
        title: "Hurricane-Rated Door Installation",
        description: "Wind-resistant garage doors that meet or exceed Florida building codes for hurricane protection.",
        startingPrice: 1299,
      },
      {
        title: "Spring Replacement",
        description: "Professional replacement of broken or worn garage door springs.",
        startingPrice: 249,
      },
      {
        title: "Smart Opener Installation",
        description: "Modern, WiFi-enabled garage door openers with smartphone control.",
        startingPrice: 399,
      },
      {
        title: "Preventative Maintenance",
        description: "Regular service to prevent common Florida garage door issues caused by humidity and salt air.",
        startingPrice: 149,
      },
      {
        title: "Emergency Storm Repair",
        description: "Fast response for garage doors damaged during storms and hurricanes.",
        startingPrice: 199,
      },
      {
        title: "Custom Door Design",
        description: "Beautiful, custom garage doors that complement South Florida's unique architectural styles.",
        startingPrice: 1899,
      },
    ],
    buildingCodes: {
      windLoad:
        "South Florida requires garage doors to withstand wind speeds of at least 160 mph in accordance with Florida Building Code for High-Velocity Hurricane Zones (HVHZ).",
      permits:
        "Permits are required for new garage door installations and most major repairs. Our team handles all permitting paperwork.",
      hoa: "Many South Florida communities have specific requirements for garage door styles, colors, and materials. We work with all local HOAs to ensure compliance.",
      insurance:
        "Installing a code-compliant garage door may qualify homeowners for insurance discounts. We provide all necessary documentation.",
    },
    featuredTestimonial: {
      name: "John D.",
      location: "South Florida",
      quote:
        "Palm Tree Garage Door provided excellent service from start to finish. Their technicians were knowledgeable, professional, and completed the work quickly. I highly recommend them to anyone needing garage door repairs or installation.",
      image: "/images/testimonials/default-testimonial.png",
    },
  },
}

// Function to get city data with fallback to default
export function getCityData(cityName: string): CityData {
  return cityData[cityName] || cityData["default"]
}
