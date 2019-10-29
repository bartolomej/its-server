const EntitySchema = require('typeorm').EntitySchema;
const Email = require('../Email');

module.exports = new EntitySchema({
  name: 'Email',
  target: Email,
  columns: {
    uid: {
      primary: true,
      type: 'varchar'
    },
    fromAddress: {
      type: 'varchar'
    },
    toAddress: {
      type: 'varchar'
    },
    subject: {
      type: 'varchar'
    },
    text: {
      type: 'varchar'
    },
    datetime: {
      type: 'datetime'
    }
  }
});