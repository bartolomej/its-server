const uuid = require('uuid/v4');

class User {
  constructor (uid, username, birthDate, email, website, interests, profileImage) {
    this.uid = uid;
    this.username = username;
    this.birthDate = birthDate;
    this.email = email;
    this.website = website;
    this.interests = interests;
    this.profileImage = profileImage;
  }

  static create (username, birthDate, email, website, interests, profileImage) {
    return new User(
      uuid(),
      username,
      birthDate,
      email,
      website,
      interests,
      profileImage
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