"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Skip rendering on homepage
  if (pathname === "/") return null

  // Generate breadcrumb items
  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`

      // Format the segment name (convert-to-title-case)
      let name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      // Special case for service-areas
      if (segment === "service-areas" && index === 0) {
        name = "Service Areas"
      }

      return { name, path }
    }),
  ]

  return (
    <nav aria-label="Breadcrumb" className="py-2 px-4 bg-gray-50 text-sm">
      <ol className="flex flex-wrap items-center">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1

          return (
            <li key={item.path} className="flex items-center">
              {index === 0 ? (
                <Link href={item.path} className="text-primary-600 hover:text-primary-500 flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  <span className="sr-only">Home</span>
                </Link>
              ) : isLast ? (
                <span className="text-gray-500 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="text-primary-600 hover:text-primary-500">
                  {item.name}
                </Link>
              )}

              {!isLast && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
