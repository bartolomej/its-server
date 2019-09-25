const uuid = require('uuid/v4');


class Category {

  constructor (uid, name, description, overview) {
    this.uid = uid;
    this.name = name;
    this.description = description;
    this.overview = overview;
  }

  static create (name, description, overview) {
    return new Category(
      uuid(),
      name,
      description,
      overview
    )
  }

}

module.exports = Category;