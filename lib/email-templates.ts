"use server"

// Make functions async as required for server actions

export async function generateCustomerEmailHtml(name: string, service: string): Promise<string> {
  const currentYear = new Date().getFullYear()

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #0D423A; padding: 20px; text-align: center;">
        <h1 style="color: #FFFFFF; margin: 0;">Thank You for Contacting Us!</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <p>Dear ${name},</p>
        <p>
          We've received your inquiry about <strong>${service}</strong>. One of our garage door specialists will contact
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
      <div style="background-color: #9ADF67; padding: 10px; text-align: center; color: #0D423A;">
        <p style="margin: 0;">&copy; ${currentYear} Palm Tree Garage Door. All rights reserved.</p>
      </div>
    </div>
  `
}

export async function generateBusinessEmailHtml(
  name: string,
  email: string,
  phone: string,
  service: string,
  message: string,
): Promise<string> {
  const currentYear = new Date().getFullYear()
  const timestamp = new Date().toLocaleString()

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #0D423A; padding: 20px; text-align: center;">
        <h1 style="color: #FFFFFF; margin: 0;">New Contact Form Submission</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Service:</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Message:</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${message}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Timestamp:</td>
            <td style="padding: 8px;">${timestamp}</td>
          </tr>
        </table>
      </div>
      <div style="background-color: #9ADF67; padding: 10px; text-align: center; color: #0D423A;">
        <p style="margin: 0;">&copy; ${currentYear} Palm Tree Garage Door. All rights reserved.</p>
      </div>
    </div>
  `
}
