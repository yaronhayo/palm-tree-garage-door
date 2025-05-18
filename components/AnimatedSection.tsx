"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView, type Variant } from "framer-motion"

type AnimationVariant = "fade" | "slide-up" | "slide-right" | "slide-left" | "zoom" | "none"

interface AnimatedSectionProps {
  children: ReactNode
  id?: string
  className?: string
  variant?: AnimationVariant
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
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
      hidden.y = 30
      break
    case "slide-right":
      hidden.opacity = 0
      hidden.x = -30
      break
    case "slide-left":
      hidden.opacity = 0
      hidden.x = 30
      break
    case "zoom":
      hidden.opacity = 0
      hidden.scale = 0.95
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

export default function AnimatedSection({
  children,
  id,
  className = "",
  variant = "fade",
  delay = 0,
  duration = 0.5,
  threshold = 0.2,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false

  // If user prefers reduced motion, don't animate
  if (prefersReducedMotion || variant === "none") {
    return (
      <section id={id} className={className} ref={ref}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants(variant)}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}
