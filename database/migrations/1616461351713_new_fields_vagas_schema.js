'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InputIdadeSchema extends Schema {
  up () {
    this.alter('vagases', (table) => {
      table.string('requisitos')
      table
        .integer('tipo_contratacao_id')
        .unsigned()
        .references('id')
        .inTable('tipos_contratacoes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.alter('vagases', (table) => {
      table.dropColumn('requisitos')
      table.dropColumn('tipo_contratacao_id')
    })
  }
}

module.exports = InputIdadeSchema
