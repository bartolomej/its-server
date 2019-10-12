const EntitySchema = require('typeorm').EntitySchema;
const Event = require('../Event');

module.exports = new EntitySchema({
  name: 'Event',
  target: Event,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    name: {
      type: 'varchar'
    },
    description: {
      type: 'varchar'
    },
    datetime: {
      type: 'datetime'
    }
  }
});
