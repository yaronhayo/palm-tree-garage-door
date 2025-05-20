import type { FormData } from "@/lib/email"
import { formatEasternTime } from "@/lib/date-utils"

interface LeadNotificationEmailProps {
  formData: FormData
  userInfo?: any
}

export function LeadNotificationEmail({ formData, userInfo }: LeadNotificationEmailProps) {
  // Format the submission time in Eastern Time
  const submissionTime = userInfo?.submissionTimeEastern || formatEasternTime(new Date())

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
        <h1 style={{ color: "#0D423A", fontSize: "24px", marginBottom: "20px" }}>New Lead Notification</h1>

        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#0D423A",
              fontSize: "18px",
              marginBottom: "10px",
              borderBottom: "2px solid #9ADF67",
              paddingBottom: "5px",
            }}
          >
            Contact Information
          </h2>
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          {formData.city && (
            <p>
              <strong>City:</strong> {formData.city}
            </p>
          )}
          {formData.zipCode && (
            <p>
              <strong>ZIP Code:</strong> {formData.zipCode}
            </p>
          )}
          {formData.formattedAddress && (
            <p>
              <strong>Address:</strong> {formData.formattedAddress}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#0D423A",
              fontSize: "18px",
              marginBottom: "10px",
              borderBottom: "2px solid #9ADF67",
              paddingBottom: "5px",
            }}
          >
            Service Details
          </h2>
          {formData.service && (
            <p>
              <strong>Service Requested:</strong> {formData.service}
            </p>
          )}
          {formData.urgency && (
            <p>
              <strong>Urgency:</strong> {formData.urgency}
            </p>
          )}
          {formData.date && (
            <p>
              <strong>Preferred Date:</strong> {formData.date}
            </p>
          )}
          {formData.time && (
            <p>
              <strong>Preferred Time:</strong> {formData.time}
            </p>
          )}
          {formData.isEmergency && <p style={{ color: "red", fontWeight: "bold" }}>⚠️ EMERGENCY SERVICE REQUESTED</p>}
          {formData.message && (
            <div>
              <p>
                <strong>Additional Details:</strong>
              </p>
              <p style={{ whiteSpace: "pre-wrap", background: "#fff", padding: "10px", borderRadius: "4px" }}>
                {formData.message}
              </p>
            </div>
          )}
        </div>

        {formData.gateCode && (
          <div style={{ marginBottom: "30px" }}>
            <h2
              style={{
                color: "#0D423A",
                fontSize: "18px",
                marginBottom: "10px",
                borderBottom: "2px solid #9ADF67",
                paddingBottom: "5px",
              }}
            >
              Access Information
            </h2>
            <p>
              <strong>Gate Code:</strong> {formData.gateCode}
            </p>
            {formData.specialInstructions && (
              <div>
                <p>
                  <strong>Special Instructions:</strong>
                </p>
                <p style={{ whiteSpace: "pre-wrap", background: "#fff", padding: "10px", borderRadius: "4px" }}>
                  {formData.specialInstructions}
                </p>
              </div>
            )}
          </div>
        )}

        <div style={{ marginBottom: "30px" }}>
          <h2
            style={{
              color: "#0D423A",
              fontSize: "18px",
              marginBottom: "10px",
              borderBottom: "2px solid #9ADF67",
              paddingBottom: "5px",
            }}
          >
            Submission Information
          </h2>
          <p>
            <strong>Form Type:</strong> {formData.formType || "Contact Form"}
          </p>
          <p>
            <strong>Submission Time (ET):</strong> {submissionTime}
          </p>
          <p>
            <strong>Time Zone:</strong> Eastern Time (Florida)
          </p>
        </div>

        {userInfo && (
          <div>
            <h2
              style={{
                color: "#0D423A",
                fontSize: "18px",
                marginBottom: "10px",
                borderBottom: "2px solid #9ADF67",
                paddingBottom: "5px",
              }}
            >
              User Information
            </h2>

            {userInfo.ip && (
              <p>
                <strong>IP Address:</strong> {userInfo.ip}
              </p>
            )}
            {userInfo.submissionTimeEastern && (
              <p>
                <strong>Submission Time (ET):</strong> {userInfo.submissionTimeEastern}
              </p>
            )}

            {userInfo.screen && (
              <p>
                <strong>Screen Size:</strong> {userInfo.screen.width} x {userInfo.screen.height}
              </p>
            )}

            {userInfo.source && (
              <p>
                <strong>Lead Source:</strong> {userInfo.source}
              </p>
            )}
            {userInfo.referrer && (
              <p>
                <strong>Referrer:</strong> {userInfo.referrer}
              </p>
            )}

            {/* UTM Parameters */}
            {userInfo.utm_source && (
              <p>
                <strong>UTM Source:</strong> {userInfo.utm_source}
              </p>
            )}
            {userInfo.utm_medium && (
              <p>
                <strong>UTM Medium:</strong> {userInfo.utm_medium}
              </p>
            )}
            {userInfo.utm_campaign && (
              <p>
                <strong>UTM Campaign:</strong> {userInfo.utm_campaign}
              </p>
            )}
            {userInfo.utm_term && (
              <p>
                <strong>UTM Term:</strong> {userInfo.utm_term}
              </p>
            )}
            {userInfo.utm_content && (
              <p>
                <strong>UTM Content:</strong> {userInfo.utm_content}
              </p>
            )}

            {userInfo.userAgent && (
              <p>
                <strong>User Agent:</strong> {userInfo.userAgent}
              </p>
            )}
            {userInfo.platform && (
              <p>
                <strong>Platform:</strong> {userInfo.platform}
              </p>
            )}
            {userInfo.language && (
              <p>
                <strong>Language:</strong> {userInfo.language}
              </p>
            )}
            {userInfo.timezone && (
              <p>
                <strong>User Timezone:</strong> {userInfo.timezone}
              </p>
            )}

            {/* Cookie Consent */}
            <p>
              <strong>Cookie Consent:</strong>{" "}
              {userInfo.cookieConsent === true ? "Granted" : userInfo.cookieConsent === false ? "Denied" : "Unknown"}
            </p>

            {/* reCAPTCHA Verification */}
            {userInfo.recaptchaVerified !== undefined && (
              <p>
                <strong>reCAPTCHA:</strong>{" "}
                {userInfo.recaptchaVerified ? `Verified (Score: ${userInfo.recaptchaScore || "N/A"})` : "Failed"}
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", fontSize: "12px", color: "#666", marginTop: "30px" }}>
        <p>This is an automated notification from your website. Please do not reply to this email.</p>
        <p>&copy; {new Date().getFullYear()} Palm Tree Garage Door. All rights reserved.</p>
      </div>
    </div>
  )
}
