const EntitySchema = require('typeorm').EntitySchema;
const User = require('../User');


module.exports = new EntitySchema({
  name: 'User',
  target: User,
  columns: {
    uid: {
      primary: true,
      type: 'varchar'
    },
    gender: {
      type: 'varchar',
      nullable: true
    },
    username: {
      type: 'varchar',
      unique: true
    },
    birthDate: {
      type: 'varchar',
      nullable: true
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
    avatar: {
      type: 'varchar',
      nullable: true
    },
    status: {
      type: 'varchar'
    },
    type: {
      type: 'varchar'
    },
    createdDate: {
      type: 'datetime'
    },
    deactivatedDate: {
      type: 'datetime',
      nullable: true
    }
  }
});