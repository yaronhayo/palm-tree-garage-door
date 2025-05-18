import { Wrench, Cog, PenToolIcon as Tool, Home } from "lucide-react"

export const services = [
  {
    id: "door-repair",
    title: "Door Repair",
    description: "Fast, reliable repair for all types of garage door issues.",
    longDescription:
      "Our expert technicians provide comprehensive garage door repair services to fix any issue quickly and efficiently. We diagnose the problem accurately and use high-quality parts for lasting repairs.",
    benefits: [
      "Same-day service available for emergency repairs",
      "Experienced technicians with proper tools and parts",
      "All work backed by our satisfaction guarantee",
      "Transparent pricing with no hidden fees",
    ],
    pricing: "Starting at $89 for basic repairs. We provide free estimates for all services.",
    icon: <Wrench className="h-5 w-5 text-primary-900" />,
    image: "/images/services/door-repair-technician.jpg",
  },
  {
    id: "spring-replacement",
    title: "Spring Replacement",
    description: "Expert replacement of broken or worn garage door springs.",
    longDescription:
      "Broken garage door springs are dangerous and require professional replacement. Our technicians are trained to safely remove old springs and install new ones that match your door's specifications exactly.",
    benefits: [
      "High-quality springs rated for 10,000+ cycles",
      "Proper tensioning for smooth door operation",
      "Inspection of other components for potential issues",
      "Lubrication of all moving parts included",
    ],
    pricing: "Torsion springs from $175-$250. Extension springs from $150-$200. Includes parts and labor.",
    icon: <Cog className="h-5 w-5 text-primary-900" />,
    image: "/images/spring-replacement.jpeg",
  },
  {
    id: "opener-repair",
    title: "Opener Repair",
    description: "Troubleshooting and repair of garage door openers.",
    longDescription:
      "We repair all major brands of garage door openers, including Chamberlain, LiftMaster, Genie, and more. From motor issues to sensor alignment, we can diagnose and fix your opener problems.",
    benefits: [
      "Comprehensive diagnosis of opener issues",
      "Repair of motor, circuit board, and sensor problems",
      "Remote programming and keypad setup",
      "Advice on repair vs. replacement options",
    ],
    pricing: "Repairs start at $95. New opener installation from $275-$450 depending on model.",
    icon: <Tool className="h-5 w-5 text-primary-900" />,
    image: "/images/services/opener-repair.png",
  },
  {
    id: "new-installation",
    title: "New Installation",
    description: "Professional installation of new garage doors.",
    longDescription:
      "Transform your home's appearance and improve security with a new garage door. We offer a wide selection of styles, materials, and features to match your home and budget.",
    benefits: [
      "Free in-home consultation and measurement",
      "Wide selection of styles and materials",
      "Professional installation by certified technicians",
      "Removal and disposal of old door included",
    ],
    pricing: "New doors start at $900 installed. Premium options with insulation and windows from $1,200-$3,000.",
    icon: <Home className="h-5 w-5 text-primary-900" />,
    image: "/images/services/new-installation.png",
  },
]
