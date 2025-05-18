"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

// Toast types
export type ToastVariant = "default" | "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  onClose?: () => void
}

// Context for managing toasts
interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => string
  removeToast: (id: string) => void
  updateToast: (id: string, toast: Partial<Toast>) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

// Provider component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, ...toast }])
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const updateToast = useCallback((id: string, toast: Partial<Toast>) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...toast } : t)))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, updateToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

// Hook for using toasts
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Simplified toast function
export function toast(props: Omit<Toast, "id">) {
  const { addToast } = useToast()
  return addToast(props)
}

// Toast container component
function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end p-4 space-y-4 max-h-screen overflow-hidden">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

// Individual toast component
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const { id, title, description, variant = "default", duration = 5000, onClose: customOnClose } = toast

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    if (customOnClose) {
      customOnClose()
    }
    onClose()
  }

  // Icon based on variant
  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  // Background color based on variant
  const getBgColor = () => {
    switch (variant) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-amber-50 border-amber-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-white border-gray-200"
    }
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-sm overflow-hidden rounded-lg border shadow-lg",
        "transform transition-all duration-300 ease-in-out",
        getBgColor(),
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex w-full items-center p-4">
        {getIcon() && <div className="flex-shrink-0 mr-3">{getIcon()}</div>}

        <div className="flex-1 ml-3">
          {title && <h4 className="text-sm font-medium text-gray-900">{title}</h4>}
          {description && <div className="mt-1 text-sm text-gray-700">{description}</div>}
        </div>

        <button
          type="button"
          className="ml-4 flex-shrink-0 rounded-md p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={handleClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
