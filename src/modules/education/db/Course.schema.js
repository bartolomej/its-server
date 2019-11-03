const EntitySchema = require('typeorm').EntitySchema;
const Course = require('../Course');


module.exports = new EntitySchema({
  name: 'Course',
  target: Course,
  columns: {
    uid: {
      primary: true,
      type: 'varchar'
    },
    title: {
      type: 'varchar'
    },
    description: {
      type: 'varchar'
    },
    tags: {
      type: 'varchar'
    },
    content: {
      type: 'text'
    },
    created: {
      type: 'date'
    },
    visible: {
      type: 'boolean'
    }
  },
  relations: {
    subcategories: {
      target: "Subcategory",
      type: "many-to-many",
      joinTable: true,
      cascade: true
    }
  }
});