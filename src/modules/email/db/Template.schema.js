const EntitySchema = require('typeorm').EntitySchema;
const Template = require('../Template');

module.exports = new EntitySchema({
  name: 'Template',
  target: Template,
  columns: {
    uid: {
      primary: true,
      type: 'varchar'
    },
    type: {
      type: 'varchar'
    },
    text: {
      type: 'varchar'
    },
    isInUse: {
      type: 'boolean'
    },
    created: {
      type: 'datetime'
    }
  }
});