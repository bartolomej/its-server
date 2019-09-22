module.exports = class User {
  constructor (firstName, lastName, birthDate, email, website, interests, profileImage) {
    this.firstName = firstName
    this.lastName = lastName
    this.birthDate = birthDate
    this.email = email
    this.website = website
    this.interests = interests
    this.profileImage = profileImage
  }
}
