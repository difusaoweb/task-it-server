'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExperienciasProfissionalSchema extends Schema {
  up () {
    this.create('experiencias_profissionals', (table) => {
      table.increments()
      table
        .integer('profissional_id')
        .unsigned()
        .references('id')
        .inTable('profissionals')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('empresa', 250).notNullable()
      table.string('funcao', 2000).notNullable()
      table.date('dataEntrada').notNullable()
      table.date('dataSaida')
      table.timestamps()
    })
  }

  down () {
    this.drop('experiencias_profissionals')
  }
}

module.exports = ExperienciasProfissionalSchema
