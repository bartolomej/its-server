const uuid = require('uuid/v4');
const moment = require('moment');


const roles = {
  SUPER: 'SUPER',
  NORMAL: 'NORMAL'
};

class Admin {

  constructor (firstName, lastName, role, email, phoneNumber) {
    this.uid = uuid();
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.createdDate = moment().toDate();
  }

}


module.exports = Admin;
module.exports.roles = roles;