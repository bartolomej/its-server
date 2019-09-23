const uuid = require('uuid/v4');

class Email {

  constructor (uid, toAddress, senderEmail, senderName, subject, text) {
    this.uid = uid;
    this.fromAddress = senderEmail;
    this.toAddress = toAddress;
    this.subject = subject;
    this.text = text;
  }

  static create(toAddress, senderEmail, senderName, subject, text) {
    return new Email(
      uuid(),
      toAddress,
      senderEmail,
      senderName,
      subject,
      text
    )
  }

  // TODO: support markdown style text syntax (bold, title)
  getText() {
    return this.text.replace(/\n/g, '<br>');
  }

}

module.exports = Email;