"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)

    // Log to server or analytics if needed
    if (typeof window !== "undefined") {
      // Send to analytics or error tracking service
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "error",
          errorMessage: error.message,
          errorStack: error.stack,
          errorInfo: JSON.stringify(errorInfo),
        })
      }
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
              <h2 className="text-2xl font-bold text-primary-600 mb-4">Something went wrong</h2>
              <p className="text-gray-600 mb-4">
                We're sorry, but there was an error loading this page. Please try refreshing the page or contact support
                if the problem persists.
              </p>
              <div className="bg-gray-100 p-4 rounded-md mb-4 overflow-auto max-h-40">
                <p className="text-sm font-mono text-red-600">{this.state.error?.message}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
