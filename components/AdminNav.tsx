"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gauge, BarChart3 } from "lucide-react"

export default function AdminNav() {
  // Only show in development or for admin users
  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white border rounded-lg shadow-lg p-2 space-y-1">
        <div className="text-xs font-medium text-muted-foreground px-2 py-1">Admin Tools</div>

        <Link href="/performance">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Gauge className="h-4 w-4 mr-2" />
            Performance
          </Button>
        </Link>

        <Link href="/api/pagespeed?url=https://palm-tree-garage-door.vercel.app&strategy=mobile" target="_blank">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <BarChart3 className="h-4 w-4 mr-2" />
            API Test
          </Button>
        </Link>
      </div>
    </div>
  )
}
