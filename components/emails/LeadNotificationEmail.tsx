import type { FormData } from "@/lib/email"
import { formatEasternTime } from "@/lib/date-utils"

interface LeadNotificationEmailProps {
  formData: FormData
  userInfo?: any
}

export default function LeadNotificationEmail({ formData, userInfo }: LeadNotificationEmailProps) {
  // Format the submission time in Eastern Time
  const submissionTime = userInfo?.submissionTimeEastern || formatEasternTime(new Date())

  // Format phone number for the call link
  const formattedPhone = formData.phone?.replace(/\D/g, "") || ""

  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "0",
        color: "#333",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Header with Business Name */}
      <div style={{ backgroundColor: "#0D423A", padding: "20px", textAlign: "center", borderRadius: "8px 8px 0 0" }}>
        <h1
          style={{
            color: "#ffffff",
            fontSize: "28px",
            fontWeight: "bold",
            margin: "0",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          Palm Tree Garage Door
        </h1>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "30px",
          borderRadius: "0 0 8px 8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* Lead Alert Banner */}
        <div
          style={{
            backgroundColor: formData.isEmergency ? "#ffebee" : "#e8f5e9",
            padding: "15px",
            borderRadius: "6px",
            marginBottom: "25px",
            borderLeft: `5px solid ${formData.isEmergency ? "#f44336" : "#4caf50"}`,
          }}
        >
          <h1
            style={{
              color: formData.isEmergency ? "#d32f2f" : "#2e7d32",
              fontSize: "22px",
              margin: "0 0 5px 0",
              fontWeight: "600",
            }}
          >
            {formData.isEmergency ? "🚨 EMERGENCY LEAD" : "✅ NEW LEAD"}
          </h1>
          <p style={{ margin: "0", fontSize: "16px", color: "#555" }}>
            Received on <strong>{submissionTime}</strong>
          </p>
        </div>

        {/* Call to Action Button */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <a
            href={`tel:${formattedPhone}`}
            style={{
              backgroundColor: "#9ADF67",
              color: "#0D423A",
              padding: "15px 30px",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: "none",
            }}
          >
            📞 Call {formData.name} Now
          </a>
        </div>

        {/* Contact Information */}
        <div style={{ marginBottom: "30px", backgroundColor: "#f5f9ff", padding: "20px", borderRadius: "8px" }}>
          <h2
            style={{
              color: "#0D423A",
              fontSize: "18px",
              marginTop: "0",
              marginBottom: "15px",
              borderBottom: "2px solid #9ADF67",
              paddingBottom: "8px",
              fontWeight: "600",
            }}
          >
            📋 Contact Information
          </h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "8px 0", fontWeight: "bold", width: "120px" }}>Name:</td>
                <td style={{ padding: "8px 0" }}>{formData.name}</td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", fontWeight: "bold" }}>Phone:</td>
                <td style={{ padding: "8px 0" }}>
                  <a href={`tel:${formattedPhone}`} style={{ color: "#0D423A", fontWeight: "bold" }}>
                    {formData.phone}
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0", fontWeight: "bold" }}>Email:</td>
                <td style={{ padding: "8px 0" }}>
                  <a href={`mailto:${formData.email}`} style={{ color: "#0D423A" }}>
                    {formData.email}
                  </a>
                </td>
              </tr>
              {formData.city && (
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold" }}>City:</td>
                  <td style={{ padding: "8px 0" }}>{formData.city}</td>
                </tr>
              )}
              {formData.zipCode && (
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold" }}>ZIP Code:</td>
                  <td style={{ padding: "8px 0" }}>{formData.zipCode}</td>
                </tr>
              )}
              {formData.formattedAddress && (
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold" }}>Address:</td>
                  <td style={{ padding: "8px 0" }}>{formData.formattedAddress}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Service Details */}
        <div style={{ marginBottom: "30px", backgroundColor: "#f7f7f7", padding: "20px", borderRadius: "8px" }}>
          <h2
            style={{
              color: "#0D423A",
              fontSize: "18px",
              marginTop: "0",
              marginBottom: "15px",
              borderBottom: "2px solid #9ADF67",
              paddingBottom: "8px",
              fontWeight: "600",
            }}
          >
            🔧 Service Details
          </h2>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {formData.service && (
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold", width: "150px" }}>Service Requested:</td>
                  <td style={{ padding: "8px 0" }}>{formData.service}</td>
                </tr>
              )}
              {formData.urgency && (
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold" }}>Urgency:</td>
                  <td style={{ padding: "8px 0" }}>{formData.urgency}</td>
                </tr>
              )}
              {formData.date && (
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold" }}>Preferred Date:</td>
                  <td style={{ padding: "8px 0" }}>{formData.date}</td>
                </tr>
              )}
              {formData.time && (
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold" }}>Preferred Time:</td>
                  <td style={{ padding: "8px 0" }}>{formData.time}</td>
                </tr>
              )}
              {formData.isEmergency && (
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold" }}>Emergency:</td>
                  <td style={{ padding: "8px 0", color: "#d32f2f", fontWeight: "bold" }}>
                    ⚠️ EMERGENCY SERVICE REQUESTED
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {formData.message && (
            <div style={{ marginTop: "15px" }}>
              <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>Additional Details:</p>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#fff",
                  padding: "15px",
                  borderRadius: "6px",
                  border: "1px solid #e0e0e0",
                  fontSize: "14px",
                  lineHeight: "1.5",
                }}
              >
                {formData.message}
              </div>
            </div>
          )}
        </div>

        {/* Access Information (if provided) */}
        {formData.gateCode && (
          <div
            style={{
              marginBottom: "30px",
              backgroundColor: "#fff8e1",
              padding: "20px",
              borderRadius: "8px",
              border: "1px dashed #ffd54f",
            }}
          >
            <h2
              style={{
                color: "#0D423A",
                fontSize: "18px",
                marginTop: "0",
                marginBottom: "15px",
                borderBottom: "2px solid #9ADF67",
                paddingBottom: "8px",
                fontWeight: "600",
              }}
            >
              🔑 Access Information
            </h2>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "8px 0", fontWeight: "bold", width: "120px" }}>Gate Code:</td>
                  <td style={{ padding: "8px 0", fontWeight: "bold" }}>{formData.gateCode}</td>
                </tr>
              </tbody>
            </table>

            {formData.specialInstructions && (
              <div style={{ marginTop: "15px" }}>
                <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>Special Instructions:</p>
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    background: "#fff",
                    padding: "15px",
                    borderRadius: "6px",
                    border: "1px solid #e0e0e0",
                    fontSize: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  {formData.specialInstructions}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Lead Source Information */}
        <div style={{ marginBottom: "30px", backgroundColor: "#f0f4f8", padding: "20px", borderRadius: "8px" }}>
          <h2
            style={{
              color: "#0D423A",
              fontSize: "18px",
              marginTop: "0",
              marginBottom: "15px",
              borderBottom: "2px solid #9ADF67",
              paddingBottom: "8px",
              fontWeight: "600",
            }}
          >
            📊 Lead Source Information
          </h2>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", fontWeight: "bold", width: "150px" }}>Form Type:</td>
                <td style={{ padding: "6px 0" }}>{formData.formType || "Contact Form"}</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", fontWeight: "bold" }}>Submission Time:</td>
                <td style={{ padding: "6px 0" }}>{submissionTime}</td>
              </tr>
              {userInfo?.source && (
                <tr>
                  <td style={{ padding: "6px 0", fontWeight: "bold" }}>Lead Source:</td>
                  <td style={{ padding: "6px 0" }}>{userInfo.source}</td>
                </tr>
              )}
              {userInfo?.referrer && (
                <tr>
                  <td style={{ padding: "6px 0", fontWeight: "bold" }}>Referrer:</td>
                  <td style={{ padding: "6px 0" }}>{userInfo.referrer}</td>
                </tr>
              )}
              {userInfo?.utm_source && (
                <tr>
                  <td style={{ padding: "6px 0", fontWeight: "bold" }}>UTM Source:</td>
                  <td style={{ padding: "6px 0" }}>{userInfo.utm_source}</td>
                </tr>
              )}
              {userInfo?.utm_medium && (
                <tr>
                  <td style={{ padding: "6px 0", fontWeight: "bold" }}>UTM Medium:</td>
                  <td style={{ padding: "6px 0" }}>{userInfo.utm_medium}</td>
                </tr>
              )}
              {userInfo?.utm_campaign && (
                <tr>
                  <td style={{ padding: "6px 0", fontWeight: "bold" }}>UTM Campaign:</td>
                  <td style={{ padding: "6px 0" }}>{userInfo.utm_campaign}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* User Technical Information */}
        {userInfo && (
          <div
            style={{
              marginBottom: "20px",
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          >
            <h2
              style={{
                color: "#0D423A",
                fontSize: "16px",
                marginTop: "0",
                marginBottom: "15px",
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "8px",
                fontWeight: "600",
              }}
            >
              💻 Technical Information
            </h2>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <tbody>
                {userInfo.ip && (
                  <tr>
                    <td style={{ padding: "4px 0", fontWeight: "bold", width: "150px" }}>IP Address:</td>
                    <td style={{ padding: "4px 0" }}>{userInfo.ip}</td>
                  </tr>
                )}
                {(userInfo.city || userInfo.country) && (
                  <tr>
                    <td style={{ padding: "4px 0", fontWeight: "bold" }}>User Location:</td>
                    <td style={{ padding: "4px 0" }}>
                      {[userInfo.city, userInfo.region, userInfo.country].filter(Boolean).join(", ")}
                      {userInfo.isVpn && <span style={{ color: "#d32f2f", marginLeft: "5px" }}> (VPN detected)</span>}
                    </td>
                  </tr>
                )}
                {userInfo.device && (
                  <tr>
                    <td style={{ padding: "4px 0", fontWeight: "bold" }}>Device Used:</td>
                    <td style={{ padding: "4px 0" }}>{userInfo.device}</td>
                  </tr>
                )}
                {userInfo.browser && (
                  <tr>
                    <td style={{ padding: "4px 0", fontWeight: "bold" }}>Browser:</td>
                    <td style={{ padding: "4px 0" }}>{userInfo.browser}</td>
                  </tr>
                )}
                {userInfo.os && (
                  <tr>
                    <td style={{ padding: "4px 0", fontWeight: "bold" }}>Operating System:</td>
                    <td style={{ padding: "4px 0" }}>{userInfo.os}</td>
                  </tr>
                )}
                {userInfo.screen && (
                  <tr>
                    <td style={{ padding: "4px 0", fontWeight: "bold" }}>Screen Size:</td>
                    <td style={{ padding: "4px 0" }}>
                      {userInfo.screen.width} x {userInfo.screen.height}
                    </td>
                  </tr>
                )}
                {userInfo.timezone && (
                  <tr>
                    <td style={{ padding: "4px 0", fontWeight: "bold" }}>Timezone:</td>
                    <td style={{ padding: "4px 0" }}>{userInfo.timezone}</td>
                  </tr>
                )}
                {userInfo.language && (
                  <tr>
                    <td style={{ padding: "4px 0", fontWeight: "bold" }}>Language:</td>
                    <td style={{ padding: "4px 0" }}>{userInfo.language}</td>
                  </tr>
                )}
                {userInfo.recaptchaVerified !== undefined && (
                  <tr>
                    <td style={{ padding: "4px 0", fontWeight: "bold" }}>reCAPTCHA:</td>
                    <td style={{ padding: "4px 0" }}>
                      {userInfo.recaptchaVerified
                        ? `✅ Verified (Score: ${userInfo.recaptchaScore || "N/A"})`
                        : "❌ Failed"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Final Call to Action */}
        <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "10px" }}>
          <a
            href={`tel:${formattedPhone}`}
            style={{
              backgroundColor: "#0D423A",
              color: "white",
              padding: "15px 30px",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: "bold",
              textDecoration: "none",
              display: "inline-block",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              border: "none",
            }}
          >
            📞 Call Customer Now
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", fontSize: "12px", color: "#666", marginTop: "20px", padding: "0 20px 20px" }}>
        <p style={{ margin: "0 0 5px 0" }}>
          This is an automated notification from your website. Please do not reply to this email.
        </p>
        <p style={{ margin: "0" }}>&copy; {new Date().getFullYear()} Palm Tree Garage Door. All rights reserved.</p>
      </div>
    </div>
  )
}

// Also export as named export for backward compatibility
export { LeadNotificationEmail }
