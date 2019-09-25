const EntitySchema = require('typeorm').EntitySchema
const Subcategory = require('../Subcategory')

module.exports = new EntitySchema({
  name: 'Subcategory',
  target: Subcategory,
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
    }
  },
  relations: {
    category: {
      target: "Category",
      type: "many-to-one",
      joinTable: true,
      cascade: true
    }
  }
})
