const uuid = require('uuid/v4');

class User {
  constructor (uid, username, birthDate, email, website, interests = [], avatar, status) {
    this.uid = uid;
    this.username = username;
    this.birthDate = birthDate;
    this.email = email;
    this.website = website;
    this.interests = interests.join(',');
    this.avatar = avatar;
    this.status = status;
  }

  static create (username, birthDate, email, website, interests, avatar) {
    if (!interests instanceof Array) {
      throw new Error('Interests is not an array');
    }
    return new User(
      uuid(),
      username,
      birthDate,
      email,
      website,
      interests,
      avatar,
      'ACTIVE'
    )
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