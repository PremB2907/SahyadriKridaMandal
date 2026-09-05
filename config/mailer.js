const nodemailer = require('nodemailer');
require('dotenv').config();

const SMTP_USER = process.env.SMTP_USER || 'mitramsolutions@gmail.com';
const rawPass = process.env.SMTP_APP_PASSWORD || 'mrgx xivm dxhw pilu';
const SMTP_APP_PASSWORD = rawPass.replace(/\s+/g, '');
const MANDAL_EMAIL = process.env.MANDAL_EMAIL || 'mitramsolutions@gmail.com';

let transporter = null;

try {
  if (SMTP_USER && SMTP_APP_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_USER,
        pass: SMTP_APP_PASSWORD
      }
    });
    console.log(`✅ Gmail SMTP transporter configured for ${SMTP_USER}.`);
  } else {
    console.log('⚠️ SMTP credentials not set in .env — email sending disabled.');
  }
} catch (err) {
  console.error('⚠️ SMTP transporter creation error:', err.message);
}

/**
 * Helper to check valid email
 */
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Send contact form inquiry email
 * From: mitramsolutions@gmail.com
 * To: Mandal email ID (mitramsolutions@gmail.com)
 * CC: User email ID
 */
async function sendContactEmail({ name, email, contact, message }) {
  if (!transporter) {
    console.log('⚠️ SMTP transporter not available — skipping email.');
    return false;
  }

  const userEmail = (email || contact || '').trim();

  // Workflow: From = mitramsolutions@gmail.com, To = MANDAL_EMAIL, CC = user email
  const toAddress = MANDAL_EMAIL;
  const ccAddress = isValidEmail(userEmail) && userEmail.toLowerCase() !== MANDAL_EMAIL.toLowerCase() ? userEmail : undefined;

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #C0972D; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #800020, #5C0015); padding: 24px; text-align: center;">
        <h2 style="color: #F5D98E; margin: 0; font-size: 22px;">🙏 नवीन संपर्क संदेश</h2>
        <p style="color: #E8C86E; margin: 6px 0 0; font-size: 14px;">New Contact Inquiry — Sahyadri Krida Mandal</p>
      </div>
      <div style="padding: 28px; background: #FFF9F0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 12px; font-weight: 700; color: #800020; width: 140px; vertical-align: top;">नाव / Name:</td>
            <td style="padding: 10px 12px; color: #333;">${name}</td>
          </tr>
          <tr style="background: #FEF3E2;">
            <td style="padding: 10px 12px; font-weight: 700; color: #800020; vertical-align: top;">ईमेल / Email:</td>
            <td style="padding: 10px 12px; color: #333;">${userEmail}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 700; color: #800020; vertical-align: top;">संदेश / Message:</td>
            <td style="padding: 10px 12px; color: #333; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
      </div>
      <div style="background: #800020; padding: 14px; text-align: center;">
        <p style="color: #E8C86E; margin: 0; font-size: 12px;">सह्याद्री क्रीडा मंडळ | Sahyadri Krida Mandal | गणपती बाप्पा मोरया 🙏</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Sahyadri Krida Mandal" <${SMTP_USER}>`,
    to: toAddress,
    cc: ccAddress,
    subject: `नवीन संपर्क संदेश — ${name} | Sahyadri Krida Mandal`,
    html: htmlBody
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Contact email sent (MsgID: ${info.messageId}) - To: ${toAddress}, CC: ${ccAddress || 'none'}`);
    return true;
  } catch (err) {
    console.error('⚠️ Failed to send contact email:', err.message);
    return false;
  }
}

/**
 * Send donation receipt confirmation email
 * From: mitramsolutions@gmail.com
 * To: Mandal email ID
 * CC: Donor user email ID
 */
async function sendDonationEmail(donation, pdfBuffer = null, screenshotPath = null) {
  if (!transporter) {
    console.log('⚠️ SMTP transporter not available — skipping donation email.');
    return false;
  }

  const userEmail = (donation.email || '').trim();
  const toAddress = MANDAL_EMAIL;
  const ccAddress = isValidEmail(userEmail) && userEmail.toLowerCase() !== MANDAL_EMAIL.toLowerCase() ? userEmail : undefined;

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #C0972D; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #800020, #5C0015); padding: 24px; text-align: center;">
        <h2 style="color: #F5D98E; margin: 0; font-size: 22px;">🙏 देणगी पावती / Donation Receipt</h2>
        <p style="color: #E8C86E; margin: 6px 0 0; font-size: 14px;">Sahyadri Krida Mandal — 80G Tax Benefit Receipt</p>
      </div>
      <div style="padding: 28px; background: #FFF9F0;">
        <p style="color: #800020; font-size: 16px; font-weight: bold;">जय गणेश! जय महाराष्ट्र!</p>
        <p style="color: #333; line-height: 1.6;">सह्याद्री क्रीडा मंडळास (Sahyadri Krida Mandal Trust) देणगी दिल्याबद्दल मनापासून धन्यवाद. तुमची अधिकृत ८०जी देणगी पावती PDF सोबत जोडली आहे.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr style="background: #FEF3E2;">
            <td style="padding: 10px 12px; font-weight: 700; color: #800020; width: 140px;">पावती क्र. / Receipt No:</td>
            <td style="padding: 10px 12px; color: #333; font-weight: bold;">${donation.receipt_no}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 700; color: #800020;">देणगीदार / Donor:</td>
            <td style="padding: 10px 12px; color: #333;">${donation.donor_name}</td>
          </tr>
          <tr style="background: #FEF3E2;">
            <td style="padding: 10px 12px; font-weight: 700; color: #800020;">रक्कम / Amount:</td>
            <td style="padding: 10px 12px; color: #2E7D32; font-weight: bold; font-size: 18px;">₹${donation.amount}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 700; color: #800020;">सेवा प्रकार / Category:</td>
            <td style="padding: 10px 12px; color: #333;">${donation.category || 'General Seva'}</td>
          </tr>
          <tr style="background: #FEF3E2;">
            <td style="padding: 10px 12px; font-weight: 700; color: #800020;">Payment ID / UTR:</td>
            <td style="padding: 10px 12px; color: #333;">${donation.payment_id || donation.payment_ref || '-'}</td>
          </tr>
        </table>
      </div>
      <div style="background: #800020; padding: 14px; text-align: center;">
        <p style="color: #E8C86E; margin: 0; font-size: 12px;">सह्याद्री क्रीडा मंडळ | Sahyadri Krida Mandal | गणपती बाप्पा मोरया 🙏</p>
      </div>
    </div>
  `;

  const attachments = [];

  if (pdfBuffer) {
    attachments.push({
      filename: `Receipt_${donation.receipt_no}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    });
  }

  if (screenshotPath && require('fs').existsSync(screenshotPath)) {
    attachments.push({
      filename: `Payment_Screenshot_${donation.receipt_no}${require('path').extname(screenshotPath)}`,
      path: screenshotPath
    });
  }

  const mailOptions = {
    from: `"Sahyadri Krida Mandal" <${SMTP_USER}>`,
    to: toAddress,
    cc: ccAddress,
    subject: `देणगी पावती ${donation.receipt_no} — ${donation.donor_name} | Sahyadri Krida Mandal`,
    html: htmlBody,
    attachments
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Donation email with attachments sent (MsgID: ${info.messageId}) - To: ${toAddress}, CC: ${ccAddress || 'none'}`);
    return true;
  } catch (err) {
    console.error('⚠️ Failed to send donation email:', err.message);
    return false;
  }
}

module.exports = {
  sendContactEmail,
  sendDonationEmail
};
