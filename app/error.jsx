"use client"

import { useEffect } from "react"

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "28rem",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: "#4b5563",
            marginBottom: "2rem",
          }}
        >
          We apologize for the inconvenience. Please try again or contact our support team.
        </p>

        <div>
          <button
            onClick={() => reset()}
            style={{
              display: "inline-block",
              backgroundColor: "#0D423A",
              color: "white",
              fontWeight: "500",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              marginRight: "1rem",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0a3029")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0D423A")}
          >
            Try again
          </button>

          <a
            href="/"
            style={{
              display: "inline-block",
              backgroundColor: "#e5e7eb",
              color: "#1f2937",
              fontWeight: "500",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              textDecoration: "none",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d1d5db")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e5e7eb")}
          >
            Return to Homepage
          </a>
        </div>
      </div>
    </div>
  )
}
