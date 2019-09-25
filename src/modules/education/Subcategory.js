const uuid = require('uuid/v4');


class Subcategory {

  constructor (uid, name, description, category) {
    this.uid = uid;
    this.name = name;
    this.description = description;
    this.category = category;
  }

  static create (name, description, category) {
    return new Subcategory(
      uuid(),
      name,
      description,
      category
    )
  }

}

module.exports = Subcategory;