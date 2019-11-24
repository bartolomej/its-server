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
    type: {
      type: 'varchar'
    },
    creator: {
      type: 'varchar',
      nullable: true
    },
    description: {
      type: 'varchar'
    },
    datetime: {
      type: 'datetime'
    }
  }
});
