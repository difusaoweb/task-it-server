'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstadoCivilSchema extends Schema {
  up () {
    this.create('estado_civils', (table) => {
      table.increments()
      table.string('title', 2000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('estado_civils')
  }
}

module.exports = EstadoCivilSchema
