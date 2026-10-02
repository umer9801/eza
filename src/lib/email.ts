import nodemailer from 'nodemailer';
import type { ContactSubmission, QuoteSubmission } from './models';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email Templates
function getContactEmailTemplate(data: ContactSubmission, isAdmin: boolean) {
  if (isAdmin) {
    return {
      subject: `New Contact Form Submission - ${data.enquiryType}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FF771C; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #FF771C; }
            .value { margin-top: 5px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #FF771C; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              ${data.phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>
              ` : ''}
              ${data.company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${data.company}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Enquiry Type:</div>
                <div class="value">${data.enquiryType}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${data.message}</div>
              </div>
            </div>
            <div class="footer">
              <p>EZA Logistics - Contact Form Notification</p>
              <p>Submitted on ${new Date().toLocaleString('en-GB')}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  } else {
    return {
      subject: 'Thank You for Contacting EZA Logistics',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FF771C; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #FF771C; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Contacting Us</h1>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              <p>Thank you for reaching out to EZA Logistics. We have received your ${data.enquiryType.toLowerCase()} and will get back to you within one working day.</p>
              <p><strong>Your enquiry details:</strong></p>
              <p>${data.message}</p>
              <p>If you need immediate assistance, please call us at <strong>0161 470 2288</strong> during office hours (07:00-19:00, Monday to Friday).</p>
              <p>Best regards,<br>EZA Logistics Team</p>
            </div>
            <div class="footer">
              <p>EZA Logistics | Trafford Park, Manchester</p>
              <p>Email: info@ezalogistics.co.uk | Phone: 0161 470 2288</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  }
}

function getQuoteEmailTemplate(data: QuoteSubmission, isAdmin: boolean) {
  if (isAdmin) {
    return {
      subject: `New Quote Request - ${data.shipmentSize} ${data.serviceSpeed}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FF771C; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #FF771C; }
            .value { margin-top: 5px; }
            .section { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #FF771C; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Quote Request</h1>
            </div>
            <div class="content">
              <h2>Customer Details</h2>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${data.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>
              ${data.company ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${data.company}</div>
              </div>
              ` : ''}

              <div class="section">
                <h2>Shipment Details</h2>
                <div class="field">
                  <div class="label">Collection Postcode:</div>
                  <div class="value">${data.collectionPostcode}</div>
                </div>
                <div class="field">
                  <div class="label">Delivery Postcode:</div>
                  <div class="value">${data.deliveryPostcode}</div>
                </div>
                <div class="field">
                  <div class="label">Shipment Size:</div>
                  <div class="value">${data.shipmentSize}</div>
                </div>
                <div class="field">
                  <div class="label">Service Speed:</div>
                  <div class="value">${data.serviceSpeed}</div>
                </div>
                <div class="field">
                  <div class="label">Weight:</div>
                  <div class="value">${data.weightKg} kg</div>
                </div>
                <div class="field">
                  <div class="label">Number of Items:</div>
                  <div class="value">${data.numberOfItems}</div>
                </div>
                ${data.additionalHandling.length > 0 ? `
                <div class="field">
                  <div class="label">Additional Handling:</div>
                  <div class="value">${data.additionalHandling.join(', ')}</div>
                </div>
                ` : ''}
              </div>

              ${data.preferredCollectionDate || data.preferredCollectionTime ? `
              <div class="section">
                <h2>Collection Preferences</h2>
                ${data.preferredCollectionDate ? `
                <div class="field">
                  <div class="label">Preferred Date:</div>
                  <div class="value">${data.preferredCollectionDate}</div>
                </div>
                ` : ''}
                ${data.preferredCollectionTime ? `
                <div class="field">
                  <div class="label">Preferred Time:</div>
                  <div class="value">${data.preferredCollectionTime}</div>
                </div>
                ` : ''}
              </div>
              ` : ''}

              ${data.specialInstructions ? `
              <div class="section">
                <h2>Special Instructions</h2>
                <p>${data.specialInstructions}</p>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>EZA Logistics - Quote Request Notification</p>
              <p>Submitted on ${new Date().toLocaleString('en-GB')}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  } else {
    return {
      subject: 'Quote Request Received - EZA Logistics',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #FF771C; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
            .highlight { background: #fff; padding: 15px; border-left: 4px solid #FF771C; margin: 20px 0; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #FF771C; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Quote Request Received</h1>
            </div>
            <div class="content">
              <p>Dear ${data.name},</p>
              <p>Thank you for requesting a quote from EZA Logistics. We have received your shipment details and our team is reviewing your requirements.</p>
              
              <div class="highlight">
                <strong>Your Shipment Details:</strong><br>
                From: ${data.collectionPostcode}<br>
                To: ${data.deliveryPostcode}<br>
                Size: ${data.shipmentSize}<br>
                Service: ${data.serviceSpeed}<br>
                Weight: ${data.weightKg} kg<br>
                Items: ${data.numberOfItems}
              </div>

              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your requirements</li>
                <li>We'll prepare a detailed quote</li>
                <li>You'll receive our quote within one working day</li>
              </ul>

              <p>If you need immediate assistance or have urgent requirements, please call us at <strong>0161 470 2288</strong> during office hours (07:00-19:00, Monday to Friday).</p>
              
              <p>Best regards,<br>EZA Logistics Team</p>
            </div>
            <div class="footer">
              <p>EZA Logistics | Trafford Park, Manchester</p>
              <p>Email: info@ezalogistics.co.uk | Phone: 0161 470 2288</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
  }
}

// Send Contact Form Emails
export async function sendContactEmails(data: ContactSubmission) {
  try {
    // Send to admin
    const adminEmail = getContactEmailTemplate(data, true);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });

    // Send to user
    const userEmail = getContactEmailTemplate(data, false);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: userEmail.subject,
      html: userEmail.html,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

// Send Quote Request Emails
export async function sendQuoteEmails(data: QuoteSubmission) {
  try {
    // Send to admin
    const adminEmail = getQuoteEmailTemplate(data, true);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });

    // Send to user
    const userEmail = getQuoteEmailTemplate(data, false);
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: userEmail.subject,
      html: userEmail.html,
    });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}
