const nodemailer = require('nodemailer');
const template = require('./template');
const Email = require('./Email');
const db = require('./repository');


function transport () {
  const { EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD, EMAIL_SERVICE } = process.env;
  if (!EMAIL_HOST || !EMAIL_HOST || !EMAIL_PASSWORD || !EMAIL_SERVICE) {
    throw new Error('Email env variables not set');
  }
  return nodemailer.createTransport({
    service: EMAIL_SERVICE,
    host: EMAIL_HOST,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });
}

module.exports.send = async function (toAddress, senderName, subject, text) {
  const transporter = transport();
  const senderEmail = process.env.EMAIL_USER;

  let email = Email.create(toAddress, senderName, senderEmail, subject, text);

  let emailConfig = {
    to: toAddress,
    from: `"${ senderName }" <${ senderEmail }>`,
    subject,
    html: template({
      text: email.getText(),
      email: 'info@racunalnisko-drustvo.si',
      legalName: 'Racunalnisko drustvo NG',
      officeAddress: 'Bratov Hvalič 2 | 5000 Nova Gorica',
      unsubscribeUrl: ''
    })
  }

  transporter.sendMail(emailConfig);

  return await db.save(email);
}