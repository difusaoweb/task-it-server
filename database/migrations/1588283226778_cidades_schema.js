'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CidadesSchema extends Schema {
  up () {
    this.create('cidades', (table) => {
      table.increments()
      table.string('iso', 50).notNullable()
      table
        .integer('state_id')
        .unsigned()
        .references('id')
        .inTable('estados')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('iso_ddd', 50).notNullable()
      table.string('status', 50).notNullable()
      table.string('slug', 50).notNullable()
      table.string('population', 50).notNullable()
      table.string('lat', 50).notNullable()
      table.string('long', 50).notNullable()
      table.string('income_per_capita', 50).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('cidades')
  }
}

module.exports = CidadesSchema
