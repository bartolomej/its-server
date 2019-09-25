const uuid = require('uuid/v4');

class Email {

  constructor (toAddress, senderEmail, senderName, subject, text) {
    this.uid = uuid();
    this.fromAddress = senderEmail;
    this.toAddress = toAddress;
    this.subject = subject;
    this.text = text;
  }

  // TODO: support markdown style text syntax (bold, title)
  getText() {
    return this.text.replace(/\n/g, '<br>');
  }

}

module.exports = Email;