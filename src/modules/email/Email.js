const uuid = require('uuid/v4');
const moment = require('moment');


class Email {

  constructor (toAddress, senderEmail, senderName, subject, text) {
    this.uid = uuid();
    this.fromAddress = senderEmail;
    this.toAddress = toAddress;
    this.subject = subject;
    this.text = text;
    this.datetime = moment().toDate();
  }

  // TODO: support markdown style text syntax (bold, title)
  getText () {
    return this.text.replace(/\n/g, '<br>');
  }

}


module.exports = Email;