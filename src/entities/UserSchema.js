const EntitySchema = require('typeorm').EntitySchema
const User = require('../models/User')

module.exports = new EntitySchema({
  name: 'User',
  target: User,
  columns: {
    uid: {
      primary: true,
      type: 'varchar'
    },
    first_name: {
      type: 'varchar'
    },
    last_name: {
      type: 'varchar'
    },
    email: {
      type: 'varchar'
    },
    website: {
      type: 'varchar'
    },
    interests: {
      type: 'varchar'
    },
    profile_image: {
      type: 'varchar'
    }
  }
})
