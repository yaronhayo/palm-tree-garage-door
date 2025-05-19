"use client"

import { type ReactNode, useEffect, useState } from "react"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface LazyComponentProps {
  children: ReactNode
  threshold?: number
  once?: boolean
  placeholder?: ReactNode
}

export default function LazyComponent({
  children,
  threshold = 0.1,
  once = true,
  placeholder = null,
}: LazyComponentProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  useEffect(() => {
    if (isInView && !shouldRender) {
      setShouldRender(true)
    }
  }, [isInView, shouldRender])

  return <div ref={ref}>{shouldRender ? children : placeholder}</div>
}
