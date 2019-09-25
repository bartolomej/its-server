const uuid = require('uuid/v4');
const moment = require('moment');


class Course {

  constructor (title, description, tags = [], content, subcategories) {
    if (!tags instanceof Array) {
      throw new Error('Tags is not an array');
    }
    this.uid = uuid();
    this.title = title;
    this.description = description;
    this.tags = tags.join(',');
    this.content = content;
    this.created = moment().toDate();
    this.subcategories = subcategories;
  }

}

module.exports = Course;