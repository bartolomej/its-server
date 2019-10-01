const EntitySchema = require('typeorm').EntitySchema;
const Admin = require('../Admin');


module.exports = new EntitySchema({
  name: 'Admin',
  target: Admin,
  columns: {
    uid: {
      primary: true,
      type: 'varchar'
    },
    firstName: {
      type: 'varchar'
    },
    lastName: {
      type: 'varchar'
    },
    role: {
      type: 'varchar'
    },
    email: {
      type: 'varchar'
    },
    phoneNumber: {
      type: 'varchar'
    },
    createdDate: {
      type: 'varchar'
    },
  }
});
