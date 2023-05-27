'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SexoSchema extends Schema {
  up () {
    this.create('sexos', (table) => {
      table.increments()
      table.string('title', 2000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sexos')
  }
}

module.exports = SexoSchema
