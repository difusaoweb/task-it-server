'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HabilidadesProfissionalSchema extends Schema {
  up () {
    this.create('habilidades_profissionals', (table) => {
      table.increments()
      table
        .integer('profissional_id')
        .unsigned()
        .references('id')
        .inTable('profissionals')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('habilidade_id')
        .unsigned()
        .references('id')
        .inTable('habilidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.drop('habilidades_profissionals')
  }
}

module.exports = HabilidadesProfissionalSchema
