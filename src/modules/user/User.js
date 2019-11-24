const uuid = require('uuid/v4');
const moment = require('moment');

/**
 * @description
 * Defines user types.
 * @type {{ADMIN: string, USER: string}}
 */
const types = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

const status = {
  ACTIVATED: 'ACTIVATED',
  DEACTIVATED: 'DEACTIVATED'
};


class User {

  constructor (username, birthDate, email, type, gender = null, website = null, interests, avatar = null) {
    this.uid = uuid();
    this.gender = gender;
    this.username = username;
    this.birthDate = moment(birthDate).toDate();
    this.email = email;
    this.website = website;
    this.interests = interests instanceof Array ? interests.join(',') : interests;
    this.avatar = avatar;
    this.createdDate = moment().toDate();
    this.deactivatedDate = null;
    this.status = status.ACTIVATED;
    this.type = type;
  }

  static create (username, birthDate, email) {
    return new User(username, birthDate, email, types.USER);
  }

  static createAdmin (username, email) {
    return new User(username, null, email, types.ADMIN);
  }

  deactivate() {
    this.status = status.DEACTIVATED;
    this.deactivatedDate = new Date();
  }

  isDeactivated() {
    return this.status === status.DEACTIVATED;
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