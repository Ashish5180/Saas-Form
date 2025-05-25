import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    secure: true, // Use TLS
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
});


//  * Sends an email using the configured transporter.
//  * @param {Object} options - Email options
//  * @param {string} options.to - Recipient's email
//  * @param {string} options.subject - Email subject
//  * @param {string} options.text - Plain text version of the message
//  * @param {string} [options.html] - Optional HTML version of the message
 
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Formily" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};