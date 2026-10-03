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

// Verify SMTP connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ SMTP connection failed:', error);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
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
      subject: `New Quote Request - ${data.name}`,
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
              <h1>New Quote Request</h1>
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
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>
              ${data.company && data.company !== 'N/A' ? `
              <div class="field">
                <div class="label">Company:</div>
                <div class="value">${data.company}</div>
              </div>
              ` : ''}
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
              ${data.additionalHandling && data.additionalHandling.length > 0 ? `
              <div class="field">
                <div class="label">Additional Handling:</div>
                <div class="value">${data.additionalHandling.join(', ')}</div>
              </div>
              ` : ''}
              ${data.preferredCollectionDate ? `
              <div class="field">
                <div class="label">Preferred Collection Date:</div>
                <div class="value">${data.preferredCollectionDate}</div>
              </div>
              ` : ''}
              ${data.preferredCollectionTime ? `
              <div class="field">
                <div class="label">Preferred Collection Time:</div>
                <div class="value">${data.preferredCollectionTime}</div>
              </div>
              ` : ''}
              ${data.specialInstructions ? `
              <div class="field">
                <div class="label">Special Instructions:</div>
                <div class="value">${data.specialInstructions}</div>
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
              
              <p><strong>Your Quote Details:</strong></p>
              <p><strong>From:</strong> ${data.collectionPostcode}<br>
              <strong>To:</strong> ${data.deliveryPostcode}<br>
              <strong>Size:</strong> ${data.shipmentSize}<br>
              <strong>Service:</strong> ${data.serviceSpeed}<br>
              <strong>Weight:</strong> ${data.weightKg} kg<br>
              <strong>Items:</strong> ${data.numberOfItems}</p>

              <p><strong>What happens next?</strong></p>
              <p>Our team will review your requirements and prepare a detailed quote. You'll receive our quote within one working day.</p>

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
    console.log('📧 Attempting to send contact emails...');
    console.log('   Admin email:', process.env.ADMIN_EMAIL);
    console.log('   User email:', data.email);

    // Send to admin
    console.log('📤 Sending email to admin...');
    const adminEmail = getContactEmailTemplate(data, true);
    await transporter.sendMail({
      from: `"EZA Logistics Ltd" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });
    console.log('✓ Admin email sent successfully to:', process.env.ADMIN_EMAIL);

    // Send to user
    console.log('📤 Sending email to user...');
    const userEmail = getContactEmailTemplate(data, false);
    const userResult = await transporter.sendMail({
      from: `"EZA Logistics Ltd" <${process.env.EMAIL_FROM}>`,
      to: data.email,
      replyTo: process.env.EMAIL_FROM,
      subject: userEmail.subject,
      html: userEmail.html,
    });
    console.log('✓ User email sent successfully to:', data.email);
    console.log('   Message ID:', userResult.messageId);

    return { success: true };
  } catch (error) {
    console.error('✗ Email sending error:');
    console.error('   Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('   Error message:', error instanceof Error ? error.message : error);
    console.error('   Full error:', error);
    return { success: false, error };
  }
}

// Send Quote Request Emails
export async function sendQuoteEmails(data: QuoteSubmission) {
  try {
    console.log('📧 Attempting to send quote emails...');
    console.log('   Admin email:', process.env.ADMIN_EMAIL);
    console.log('   User email:', data.email);
    console.log('   SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
    });

    // Send to admin
    console.log('📤 Sending email to admin...');
    const adminEmail = getQuoteEmailTemplate(data, true);
    await transporter.sendMail({
      from: `"EZA Logistics Ltd" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: adminEmail.subject,
      html: adminEmail.html,
    });
    console.log('✓ Admin email sent successfully to:', process.env.ADMIN_EMAIL);

    // Send to user
    console.log('📤 Sending email to user...');
    const userEmail = getQuoteEmailTemplate(data, false);
    const userResult = await transporter.sendMail({
      from: `"EZA Logistics Ltd" <${process.env.EMAIL_FROM}>`,
      to: data.email,
      replyTo: process.env.EMAIL_FROM,
      subject: userEmail.subject,
      html: userEmail.html,
    });
    console.log('✓ User email sent successfully to:', data.email);
    console.log('   Message ID:', userResult.messageId);
    console.log('   Response:', userResult.response);

    return { success: true };
  } catch (error) {
    console.error('✗ Email sending error:');
    console.error('   Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('   Error message:', error instanceof Error ? error.message : error);
    console.error('   Full error:', error);
    return { success: false, error };
  }
}
