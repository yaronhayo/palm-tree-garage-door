"use server"

import type * as React from "react"

interface EmailTemplateProps {
  name: string
  service: string
}

export const CustomerEmailTemplate: React.FC<EmailTemplateProps> = ({ name, service }) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <div style={{ backgroundColor: "#0D423A", padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "#FFFFFF", margin: 0 }}>Thank You for Contacting Us!</h1>
    </div>
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <p>Dear {name},</p>
      <p>
        We've received your inquiry about <strong>{service}</strong>. One of our garage door specialists will contact
        you shortly.
      </p>
      <p>
        If you need immediate assistance, please call us at <strong>(772) 275-3721</strong>.
      </p>
      <br />
      <p>Best regards,</p>
      <p>
        <strong>Palm Tree Garage Door</strong>
        <br />
        (772) 275-3721
        <br />
        support@garagedoorspringsrepairfl.com
      </p>
    </div>
    <div style={{ backgroundColor: "#9ADF67", padding: "10px", textAlign: "center", color: "#0D423A" }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Palm Tree Garage Door. All rights reserved.</p>
    </div>
  </div>
)

export const BusinessEmailTemplate: React.FC<{
  name: string
  email: string
  phone: string
  service: string
  message: string
}> = ({ name, email, phone, service, message }) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <div style={{ backgroundColor: "#0D423A", padding: "20px", textAlign: "center" }}>
      <h1 style={{ color: "#FFFFFF", margin: 0 }}>New Contact Form Submission</h1>
    </div>
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tr>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd", fontWeight: "bold" }}>Name:</td>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{name}</td>
        </tr>
        <tr>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd", fontWeight: "bold" }}>Email:</td>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{email}</td>
        </tr>
        <tr>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd", fontWeight: "bold" }}>Phone:</td>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{phone}</td>
        </tr>
        <tr>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd", fontWeight: "bold" }}>Service:</td>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{service}</td>
        </tr>
        <tr>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd", fontWeight: "bold" }}>Message:</td>
          <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{message}</td>
        </tr>
        <tr>
          <td style={{ padding: "8px", fontWeight: "bold" }}>Timestamp:</td>
          <td style={{ padding: "8px" }}>{new Date().toLocaleString()}</td>
        </tr>
      </table>
    </div>
    <div style={{ backgroundColor: "#9ADF67", padding: "10px", textAlign: "center", color: "#0D423A" }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Palm Tree Garage Door. All rights reserved.</p>
    </div>
  </div>
)
