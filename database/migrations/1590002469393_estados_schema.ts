'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstadosSchema extends Schema {
  up () {
    this.create('estados', (table) => {
      table.increments()
      table.string('title', 50).notNullable()
      table.string('letter', 50).notNullable()
      table.string('iso', 250).notNullable()
      table.string('slug', 250).notNullable()
      table.string('population', 250).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('estados')
  }
}

module.exports = EstadosSchema
