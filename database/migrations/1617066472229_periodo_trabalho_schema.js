'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SexoSchema extends Schema {
  up () {
    this.create('periodo_trabalhos', (table) => {
      table.increments()
      table.string('title', 2000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('periodo_trabalhos')
  }
}

module.exports = SexoSchema
