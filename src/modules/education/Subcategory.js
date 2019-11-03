const uuid = require('uuid/v4');


class Subcategory {

  constructor (name, description, category) {
    this.uid = uuid();
    this.name = name;
    this.description = description;
    this.category = category;
    // new subcategory is invisible by default
    this.visible = false;
  }

}


module.exports = Subcategory;