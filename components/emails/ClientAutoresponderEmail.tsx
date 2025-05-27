import type { FormData } from "@/lib/email"
import { formatEasternTime } from "@/lib/date-utils"

interface ClientAutoresponderEmailProps {
  formData: FormData
}

// Service-specific content mapping
const serviceContent = {
  "Spring Repair/Replacement": {
    icon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z",
    title: "Spring Repair Safety Notice",
    content: [
      "Garage door springs are under extreme tension and can be dangerous.",
      "Never attempt to repair springs yourself - our certified technicians have the proper tools and training.",
      "We stock all major spring types and can usually complete repairs same-day.",
    ],
    tips: [
      "Keep the area around your garage door clear until our technician arrives",
      "Do not attempt to manually operate the door if springs are broken",
      "If you hear loud noises or see gaps in the springs, stay away from the door",
    ],
    urgencyLevel: "high",
  },
  "Opener Repair": {
    icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    title: "Opener Repair Information",
    content: [
      "We service all major opener brands including LiftMaster, Chamberlain, and Genie.",
      "Most opener issues can be diagnosed and fixed during the first visit.",
      "We carry common replacement parts in our service vehicles.",
    ],
    tips: [
      "Check if the opener has power (outlet and circuit breaker)",
      "Try replacing the batteries in your remote controls",
      "Note any unusual sounds or behaviors to tell our technician",
    ],
    urgencyLevel: "medium",
  },
  "New Installation": {
    icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    title: "New Door Installation Process",
    content: [
      "Our installation process typically takes 4-6 hours for a complete door replacement.",
      "We'll help you choose the perfect door style and material for your home.",
      "All installations include our lifetime warranty and professional cleanup.",
    ],
    tips: [
      "Consider insulated doors for better energy efficiency",
      "Think about adding smart opener features for convenience",
      "We'll provide samples and color options during our consultation",
    ],
    urgencyLevel: "low",
  },
  "Off Track Repair": {
    icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14",
    title: "Off Track Door Safety",
    content: [
      "An off-track door can be dangerous and should not be operated.",
      "This issue often indicates damaged cables, rollers, or tracks.",
      "We'll inspect the entire system to prevent future problems.",
    ],
    tips: [
      "Do not force the door or attempt to put it back on track yourself",
      "Disconnect the opener to prevent accidental operation",
      "Keep vehicles and belongings away from the door area",
    ],
    urgencyLevel: "high",
  },
  "Panel Replacement": {
    icon: "M12 2l-2 4v6l2 4 2-4V6z",
    title: "Panel Replacement Service",
    content: [
      "We can replace individual panels or sections to restore your door's appearance.",
      "Panel matching service ensures your door looks uniform after repair.",
      "Often more cost-effective than full door replacement.",
    ],
    tips: [
      "Take photos of the damage for insurance purposes if applicable",
      "Note your door's manufacturer and model if visible",
      "Consider upgrading to insulated panels for better efficiency",
    ],
    urgencyLevel: "low",
  },
}

export default function ClientAutoresponderEmail({ formData }: ClientAutoresponderEmailProps) {
  // Format the current time in Eastern Time
  const currentTime = formatEasternTime(new Date())

  // Phone number for click-to-call
  const phoneNumber = "(321) 366-9723"

  // Get service-specific content
  const serviceInfo = formData.service ? serviceContent[formData.service as keyof typeof serviceContent] : null

  // Determine if this is urgent based on service type or emergency flag
  const isUrgent = formData.isEmergency || serviceInfo?.urgencyLevel === "high"

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "0",
        color: "#333",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Header with Brand Colors */}
      <div
        style={{
          backgroundColor: "#0D423A",
          padding: "30px 20px",
          textAlign: "center",
          borderBottom: "5px solid #9ADF67",
        }}
      >
        <h1
          style={{
            color: "#ffffff",
            fontSize: "28px",
            margin: "0",
            fontWeight: "700",
          }}
        >
          Palm Tree Garage Door
        </h1>
        <p
          style={{
            color: "#9ADF67",
            fontSize: "18px",
            margin: "10px 0 0 0",
            fontWeight: "500",
          }}
        >
          Thank You For Your {formData.service || "Service"} Request
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: "30px 25px", backgroundColor: "#ffffff" }}>
        {/* Personalized Greeting */}
        <h2
          style={{
            color: "#0D423A",
            fontSize: "22px",
            marginTop: "0",
            marginBottom: "20px",
            fontWeight: "600",
          }}
        >
          Hello {formData.name},
        </h2>

        {/* Confirmation Message */}
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "25px",
            color: "#333333",
          }}
        >
          Thank you for reaching out to Palm Tree Garage Door. We've received your{" "}
          <strong>{formData.service || "service"}</strong> request and a{" "}
          <strong>certified garage door specialist</strong> from our team will contact you shortly to assist with your
          needs.
        </p>

        {/* Service-Specific Information */}
        {serviceInfo && (
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "25px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                color: "#0D423A",
                fontSize: "18px",
                margin: "0 0 15px 0",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0D423A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={serviceInfo.icon}></path>
              </svg>
              {serviceInfo.title}
            </h3>
            <ul style={{ margin: "0", paddingLeft: "20px", color: "#4b5563" }}>
              {serviceInfo.content.map((item, index) => (
                <li key={index} style={{ marginBottom: "8px", lineHeight: "1.5" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Emergency Service Call Button */}
        <div
          style={{
            backgroundColor: isUrgent ? "#fff8f8" : "#f7f9fc",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "25px",
            border: isUrgent ? "1px solid #ffcdd2" : "1px solid #e3e8ef",
          }}
        >
          <h3
            style={{
              color: isUrgent ? "#d32f2f" : "#0D423A",
              fontSize: "18px",
              margin: "0 0 15px 0",
              fontWeight: "600",
            }}
          >
            {isUrgent ? "⚠️ Need Immediate Assistance?" : "Need to Speak With Us?"}
          </h3>

          <a
            href={`tel:${phoneNumber.replace(/[^0-9]/g, "")}`}
            style={{
              display: "block",
              backgroundColor: isUrgent ? "#d32f2f" : "#0D423A",
              color: "#ffffff",
              textAlign: "center",
              padding: "14px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "16px",
              margin: "0 auto",
              maxWidth: "280px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Now: {phoneNumber}
            </span>
          </a>
        </div>

        {/* Request Summary */}
        <div
          style={{
            backgroundColor: "#f0f7f1",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "25px",
            borderLeft: "4px solid #9ADF67",
          }}
        >
          <h3
            style={{
              color: "#0D423A",
              fontSize: "18px",
              margin: "0 0 15px 0",
              fontWeight: "600",
            }}
          >
            Your Request Summary:
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {formData.service && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div
                  style={{
                    minWidth: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D423A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <strong style={{ color: "#0D423A" }}>Service:</strong> {formData.service}
                </div>
              </div>
            )}

            {formData.date && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div
                  style={{
                    minWidth: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D423A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <strong style={{ color: "#0D423A" }}>Preferred Date:</strong> {formData.date}
                </div>
              </div>
            )}

            {formData.time && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div
                  style={{
                    minWidth: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D423A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <strong style={{ color: "#0D423A" }}>Preferred Time:</strong> {formData.time}
                </div>
              </div>
            )}

            {formData.city && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div
                  style={{
                    minWidth: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0D423A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <strong style={{ color: "#0D423A" }}>Location:</strong> {formData.city}
                  {formData.zipCode && `, ${formData.zipCode}`}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Service-Specific Tips */}
        {serviceInfo && serviceInfo.tips.length > 0 && (
          <div
            style={{
              backgroundColor: "#fef3c7",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "25px",
              borderLeft: "4px solid #f59e0b",
            }}
          >
            <h3
              style={{
                color: "#92400e",
                fontSize: "18px",
                margin: "0 0 15px 0",
                fontWeight: "600",
              }}
            >
              💡 Helpful Tips While You Wait:
            </h3>
            <ul style={{ margin: "0", paddingLeft: "20px", color: "#92400e" }}>
              {serviceInfo.tips.map((tip, index) => (
                <li key={index} style={{ marginBottom: "8px", lineHeight: "1.5" }}>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Our Promises */}
        <div
          style={{
            backgroundColor: "#f0f7ff",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "25px",
            borderLeft: "4px solid #4a90e2",
          }}
        >
          <h3
            style={{
              color: "#0D423A",
              fontSize: "18px",
              margin: "0 0 15px 0",
              fontWeight: "600",
            }}
          >
            Our Promises To You:
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div
                style={{
                  minWidth: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D423A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div>
                <strong style={{ color: "#0D423A" }}>Lifetime Warranty</strong> on all our installations and repairs
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div
                style={{
                  minWidth: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D423A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <strong style={{ color: "#0D423A" }}>Fast Response Times</strong> with same-day service available
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div
                style={{
                  minWidth: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0D423A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div>
                <strong style={{ color: "#0D423A" }}>Special Discounts</strong> for seniors and veterans
              </div>
            </div>
          </div>
        </div>

        {/* Closing Message */}
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "25px",
            color: "#333333",
          }}
        >
          {isUrgent ? (
            <>
              We understand this is an urgent matter. Our emergency response team has been notified and will prioritize
              your request. Please call us immediately at <strong>{phoneNumber}</strong> if you need assistance right
              away.
            </>
          ) : (
            <>
              If you have any questions before we contact you, please don't hesitate to call us at{" "}
              <strong>{phoneNumber}</strong>.
            </>
          )}
        </p>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "10px",
            color: "#333333",
          }}
        >
          Thank you for choosing Palm Tree Garage Door!
        </p>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "0",
            color: "#333333",
          }}
        >
          Sincerely,
          <br />
          <strong>The Palm Tree Garage Door Team</strong>
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          textAlign: "center",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "#666666",
            margin: "0 0 10px 0",
          }}
        >
          This email was sent at {currentTime} Eastern Time.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#666666",
            margin: "0 0 10px 0",
          }}
        >
          &copy; {new Date().getFullYear()} Palm Tree Garage Door. All rights reserved.
        </p>

        <p
          style={{
            fontSize: "14px",
            color: "#666666",
            margin: "0",
          }}
        >
          <a href="https://palmtreegaragedoor.com/privacy-policy" style={{ color: "#0D423A", textDecoration: "none" }}>
            Privacy Policy
          </a>{" "}
          |
          <a
            href="https://palmtreegaragedoor.com/terms-of-service"
            style={{ color: "#0D423A", textDecoration: "none", marginLeft: "10px" }}
          >
            Terms of Service
          </a>
        </p>
      </div>

      {/* Mobile Responsiveness */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media only screen and (max-width: 600px) {
          h1 { font-size: 24px !important; }
          h2 { font-size: 20px !important; }
          h3 { font-size: 16px !important; }
          p, div { font-size: 14px !important; }
          .main-content { padding: 20px 15px !important; }
        }
      `,
        }}
      />
    </div>
  )
}

// Also export as named export for backward compatibility
export { ClientAutoresponderEmail }
