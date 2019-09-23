const EntitySchema = require('typeorm').EntitySchema
const User = require('./User')

module.exports = new EntitySchema({
  name: 'User',
  target: User,
  columns: {
    uid: {
      primary: true,
      type: 'varchar'
    },
    username: {
      type: 'varchar',
      unique: true
    },
    birthDate: {
      type: 'varchar'
    },
    email: {
      type: 'varchar',
      unique: true,
      nullable: true
    },
    website: {
      type: 'varchar',
      nullable: true
    },
    interests: {
      type: 'varchar',
      nullable: true
    },
    profileImage: {
      type: 'varchar',
      nullable: true
    }
  }
})
