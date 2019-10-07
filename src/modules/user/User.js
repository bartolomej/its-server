const uuid = require('uuid/v4');
const moment = require('moment');

const types = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

class User {

  constructor (username, birthDate, email, type, website = null, interests, avatar = null) {
    this.uid = uuid();
    this.username = username;
    this.birthDate = moment(birthDate).toDate();
    this.email = email;
    this.website = website;
    this.interests = interests instanceof Array ? interests.join(',') : interests;
    this.avatar = avatar;
    this.createdDate = moment().toDate();
    this.deactivatedDate = null;
    this.status = 'ACTIVE';
    this.type = type;
  }

  static create(username, birthDate, email) {
    return new User(username, birthDate, email, types.USER);
  }

  static createAdmin(username, birthDate, email) {
    return new User(username, birthDate, email, types.ADMIN);
  }

  getFieldName (value) {
    for (let key in this) {
      if (
        this.hasOwnProperty(key) &&
        this[key] === value
      ) {
        return key;
      }
    }
    throw new Error(`Property not found in user`);
  }

}

module.exports = User;