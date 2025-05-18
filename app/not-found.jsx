"use client"

export default function NotFound() {
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
          404 - Page Not Found
        </h1>

        <p
          style={{
            fontSize: "1.125rem",
            color: "#4b5563",
            marginBottom: "2rem",
          }}
        >
          We're sorry, but the page you're looking for doesn't exist or has been moved.
        </p>

        <div>
          <a
            href="/"
            style={{
              display: "inline-block",
              backgroundColor: "#0D423A",
              color: "white",
              fontWeight: "500",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              textDecoration: "none",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0a3029")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#0D423A")}
          >
            Return to Homepage
          </a>

          <div style={{ paddingTop: "1rem" }}>
            <p style={{ color: "#6b7280" }}>
              Need immediate assistance? Call us at{" "}
              <a
                href="tel:+13213669723"
                style={{
                  color: "#0D423A",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
                onMouseOver={(e) => (e.currentTarget.style.textDecoration = "underline")}
                onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
              >
                (321) 366-9723
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
