'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AreaProfissionalSchema extends Schema {
  up () {
    this.create('area_profissionals', (table) => {
      table.increments()
      table.string('title', 100).notNullable()
      table.integer('state')
      table.timestamps()
    })
  }

  down () {
    this.drop('area_profissionals')
  }
}

module.exports = AreaProfissionalSchema
