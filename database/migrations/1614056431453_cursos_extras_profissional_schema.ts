'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CursosExtrasProfissionalSchema extends Schema {
  up () {
    this.create('cursos_extras_profissionals', (table) => {
      table.increments()
      table
        .integer('profissional_id')
        .unsigned()
        .references('id')
        .inTable('profissionals')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('instituicao', 250).notNullable()
      table.string('curso', 2000).notNullable()
      table.date('dataInicio').notNullable()
      table.date('dataTermino')
      table.timestamps()
    })
  }

  down () {
    this.drop('cursos_extras_profissionals')
  }
}

module.exports = CursosExtrasProfissionalSchema
