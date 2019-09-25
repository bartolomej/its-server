const uuid = require('uuid/v4');


class Course {

  constructor (uid, title, description, tags = [], content, created, subcategories) {
    this.uid = uid;
    this.title = title;
    this.description = description;
    this.tags = tags.join(',');
    this.content = content;
    this.created = created;
    this.subcategories = subcategories;
  }

  static create (title, description, tags = [], content = '', subcategories = []) {
    if (!tags instanceof Array) {
      throw new Error('Tags is not an array');
    }
    if (tags.length === 0) {
      throw new Error('No tags provided');
    }
    if (content.length === 0) {
      throw new Error('No content provided');
    }
    return new Course(
      uuid(),
      title,
      description,
      tags,
      content,
      new Date(),
      subcategories,
    )
  }
}

module.exports = Course;