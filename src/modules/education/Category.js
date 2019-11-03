const uuid = require('uuid/v4');


class Category {

  constructor (name, description) {
    this.uid = uuid();
    this.name = name;
    this.description = description;
    // new category is invisible by default
    this.visible = false;
  }

}


module.exports = Category;