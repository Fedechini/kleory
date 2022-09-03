const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // options
  const mailOptions = {
    from: 'Federico Bertoni <owner@kleory.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // send
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
