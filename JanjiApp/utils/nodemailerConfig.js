// nodemailerConfig.js

const nodemailer = require('nodemailer');

// Konfigurasi transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'ganelajeisa@gmail.com',
    pass: 'kungkingkang123'
  }
});

module.exports = transporter;