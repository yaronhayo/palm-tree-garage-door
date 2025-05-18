import React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm transition-colors",
        "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
        "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
