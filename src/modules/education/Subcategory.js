const uuid = require('uuid/v4');


class Subcategory {

  constructor (name, description, category) {
    this.uid = uuid();
    this.name = name;
    this.description = description;
    this.category = category;
  }

}

module.exports = Subcategory;