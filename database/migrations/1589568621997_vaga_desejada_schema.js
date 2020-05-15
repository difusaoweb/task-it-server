'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VagaDesejadaSchema extends Schema {
  up () {
    this.create('vaga_desejadas', (table) => {
      table.increments()
      table.integer('type_departament', 2).notNullable()
      table.string('title_departament', 100).notNullable()
      table.integer('type_fuction', 2)
      table.string('title_type_fuction', 100)
      table.string('title_function', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vaga_desejadas')
  }
}

module.exports = VagaDesejadaSchema
