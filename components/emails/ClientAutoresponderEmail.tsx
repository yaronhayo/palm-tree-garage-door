import type { FormData } from "@/lib/email"
import { formatEasternTime } from "@/lib/date-utils"

interface ClientAutoresponderEmailProps {
  formData: FormData
}

export default function ClientAutoresponderEmail({ formData }: ClientAutoresponderEmailProps) {
  // Format the current time in Eastern Time
  const currentTime = formatEasternTime(new Date())

  return (
    <div
      style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px", color: "#333" }}
    >
      {/* Header with Logo */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src="https://palmtreegaragedoor.com/logo.png"
          alt="Palm Tree Garage Door"
          style={{ maxWidth: "200px", height: "auto" }}
        />
      </div>

      <div style={{ background: "#f7f7f7", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h1 style={{ color: "#0D423A", fontSize: "24px", marginBottom: "20px" }}>Thank You for Contacting Us!</h1>

        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>Dear {formData.name},</p>

        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
          Thank you for reaching out to Palm Tree Garage Door. We have received your {formData.formType || "service"}{" "}
          request and our team is already working on it.
        </p>

        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
          <strong>What happens next?</strong> One of our garage door specialists will contact you shortly to discuss
          your needs and schedule your service.
        </p>

        {formData.isEmergency && (
          <div
            style={{
              background: "#ffeaea",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
              borderLeft: "4px solid #ff5252",
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold" }}>
              We've noted that this is an emergency request and will prioritize accordingly.
            </p>
          </div>
        )}

        <div
          style={{
            background: "#e8f4ea",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            borderLeft: "4px solid #9ADF67",
          }}
        >
          <h3 style={{ color: "#0D423A", margin: "0 0 10px 0" }}>Your Request Summary:</h3>
          <ul style={{ paddingLeft: "20px", margin: "0" }}>
            {formData.service && (
              <li>
                <strong>Service:</strong> {formData.service}
              </li>
            )}
            {formData.date && (
              <li>
                <strong>Preferred Date:</strong> {formData.date}
              </li>
            )}
            {formData.time && (
              <li>
                <strong>Preferred Time:</strong> {formData.time}
              </li>
            )}
            {formData.city && (
              <li>
                <strong>Location:</strong> {formData.city}
              </li>
            )}
          </ul>
        </div>

        <div
          style={{
            background: "#e8f4ff",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
            borderLeft: "4px solid #52a9ff",
          }}
        >
          <h3 style={{ color: "#0D423A", margin: "0 0 10px 0" }}>Garage Door Maintenance Tips:</h3>
          <ul style={{ paddingLeft: "20px", margin: "0" }}>
            <li>Regularly lubricate moving parts with silicone-based lubricant</li>
            <li>Test the auto-reverse safety feature monthly</li>
            <li>Inspect cables and springs for wear (but never attempt to repair them yourself)</li>
            <li>Keep tracks clean and free of debris</li>
            <li>Listen for unusual noises during operation - they often indicate developing problems</li>
          </ul>
        </div>

        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "20px" }}>
          If you have any questions or need immediate assistance, please don't hesitate to call us at{" "}
          <strong>(321) 366-9723</strong>.
        </p>

        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "10px" }}>
          Thank you for choosing Palm Tree Garage Door!
        </p>

        <p style={{ fontSize: "16px", lineHeight: "1.6", marginBottom: "0" }}>
          Sincerely,
          <br />
          The Palm Tree Garage Door Team
        </p>
      </div>

      <div style={{ textAlign: "center", fontSize: "12px", color: "#666", marginTop: "30px" }}>
        <p>This email was sent at {currentTime} Eastern Time.</p>
        <p>&copy; {new Date().getFullYear()} Palm Tree Garage Door. All rights reserved.</p>
        <p>
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
    </div>
  )
}

// Also export as named export for backward compatibility
export { ClientAutoresponderEmail }
