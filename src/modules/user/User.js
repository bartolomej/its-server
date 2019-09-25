const uuid = require('uuid/v4');
const moment = require('moment');


class User {
  constructor (username, birthDate, email, website = null, interests = [], avatar = null) {
    if (!interests instanceof Array) {
      throw new Error('Interests is not an array');
    }
    this.uid = uuid();
    this.username = username;
    this.birthDate = moment(birthDate).toDate();
    this.email = email;
    this.website = website;
    this.interests = interests.join(',');
    this.avatar = avatar;
    this.createdDate = moment().toDate();
    this.deactivatedDate = null;
    this.status = 'ACTIVE';
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