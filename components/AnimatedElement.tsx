"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView, type Variant } from "framer-motion"

type AnimationVariant = "fade" | "slide-up" | "slide-right" | "slide-left" | "zoom" | "stagger" | "none"

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  index?: number // For staggered animations
}

const variants = {
  hidden: {
    opacity: 0,
    y: 0,
    x: 0,
    scale: 1,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  },
}

const getVariants = (variant: AnimationVariant) => {
  const hidden: Variant = { ...variants.hidden }

  switch (variant) {
    case "fade":
      hidden.opacity = 0
      break
    case "slide-up":
      hidden.opacity = 0
      hidden.y = 20
      break
    case "slide-right":
      hidden.opacity = 0
      hidden.x = -20
      break
    case "slide-left":
      hidden.opacity = 0
      hidden.x = 20
      break
    case "zoom":
      hidden.opacity = 0
      hidden.scale = 0.95
      break
    case "stagger":
      hidden.opacity = 0
      hidden.y = 15
      break
    case "none":
    default:
      return {}
  }

  return {
    hidden,
    visible: variants.visible,
  }
}

export default function AnimatedElement({
  children,
  className = "",
  variant = "fade",
  delay = 0,
  duration = 0.4,
  threshold = 0.1,
  once = true,
  index = 0,
}: AnimatedElementProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false

  // Calculate stagger delay if applicable
  const finalDelay = variant === "stagger" ? delay + index * 0.1 : delay

  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion || variant === "none") {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants(variant)}
      transition={{ duration, delay: finalDelay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
