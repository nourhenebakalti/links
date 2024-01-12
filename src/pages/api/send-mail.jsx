import nodemailer from 'nodemailer';

require('dotenv').config();
const sendEmail = async (req, res) => {
  // Extract form data from the request
  const { name, email, message } = req.body;

  // Nodemailer setup for Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Outlook SMTP server
    port: 587, // Outlook SMTP port
    secure: false,
    auth: {
      user: process.env.MAIL, // Your Gmail address
      pass: process.env.PASS, // Your Gmail password
    },
  });

  // Email content
  const mailOptions = {
    from: 'linksprod@outlook.com', // Your Gmail address
    to: 'contact@linksprod.com', // Recipient's email address
    subject: 'New message from contact form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Email sent successfully' });
  });
};

export default sendEmail;
export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
      externalResolver: true,
    },
  };