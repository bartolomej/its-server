const EntitySchema = require('typeorm').EntitySchema;
const Category = require('../Category');


module.exports = new EntitySchema({
  name: 'Category',
  target: Category,
  columns: {
    uid: {
      primary: true,
      type: 'varchar'
    },
    name: {
      type: 'varchar'
    },
    description: {
      type: 'varchar'
    },
    visible: {
      type: 'boolean'
    }
  }
});
