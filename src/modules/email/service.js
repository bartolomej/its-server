const nodemailer = require('nodemailer');
const template = require('./html-template');
const Email = require('./Email');
const db = require('./db/repository');

/**
 * TODO: deamon service scanning for email jobs
 * TODO: add email jobs
 */

/**
 * @description
 * Creates transporter object.
 * @returns {Promise<nodemailer.Transporter>}
 */
function createTransporter () {
  const { EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD, EMAIL_SERVICE } = process.env;
  if (!EMAIL_HOST || !EMAIL_HOST || !EMAIL_PASSWORD || !EMAIL_SERVICE) {
    throw new Error('Email env variables not set');
  }
  return nodemailer.createTransport({
    service: EMAIL_SERVICE ? EMAIL_SERVICE : 'gmail',
    host: EMAIL_HOST ? EMAIL_HOST : 'gmail',
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });
}

/**
 * @description
 * Sends email with default html template.
 * @param toAddress
 * @param senderName
 * @param subject
 * @param text
 * @returns {Promise<Email|void>}
 */
async function send (toAddress, senderName, subject, text) {
  // escape sending mail in 'test' environment mode
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  const transporter = createTransporter();
  const senderEmail = process.env.EMAIL_USER;

  let email = new Email(toAddress, senderName, senderEmail, subject, text);

  // refer to: https://nodemailer.com/message/
  let emailConfig = {
    to: toAddress,
    from: `"${senderName}" <${senderEmail}>`,
    subject,
    // plaintext version of the message
    text: email.getText(),
    // render details in html template
    html: template({
      text: email.getText(),
      email: 'info@racunalnisko-drustvo.si',
      legalName: 'Racunalnisko drustvo NG',
      officeAddress: 'Bratov Hvalič 2 | 5000 Nova Gorica',
      unsubscribeUrl: ''
    })
  };

  transporter.sendMail(emailConfig);

  return await db.saveEmail(email);
}

module.exports = {
  send
};