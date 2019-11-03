const uuid = require('uuid/v4');
const moment = require('moment');


class Course {

  constructor (title, description, tags, content, subcategories) {
    this.uid = uuid();
    this.title = title;
    this.description = description;
    this.tags = tags instanceof Array ? tags.join(',') : tags;
    this.content = content;
    this.created = moment().toDate();
    this.subcategories = subcategories;
    // new course is invisible by default
    this.visible = false;
  }

}


module.exports = Course;