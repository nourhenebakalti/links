import nodemailer from 'nodemailer';
require('dotenv').config();

const sendEmail = async (req, res) => {
  // Extract form data from the request
  const { name, email, message, workType, services, domain, priorities } = req.body;

  // Nodemailer setup for Outlook
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL, // Your Outlook address
      pass: process.env.PASS, // Your Outlook password
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.MAIL, // Your Outlook address
    to: 'contact@linksprod.com', // Recipient's email address
    subject: 'New message from contact form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nWork Type: ${workType.join(', ')}\nServices: ${services.join(', ')}\nDomain: ${domain.join(', ')}\nPriorities: ${priorities.join(', ')}`,
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
