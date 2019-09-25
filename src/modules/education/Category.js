const uuid = require('uuid/v4');


class Category {

  constructor (name, description, overview) {
    this.uid = uuid();
    this.name = name;
    this.description = description;
    this.overview = overview;
  }

}

module.exports = Category;