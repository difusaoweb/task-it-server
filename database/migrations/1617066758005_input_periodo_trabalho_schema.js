'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InputPeriodoTrabalhoSchema extends Schema {
  up () {
    this.alter('vagases', (table) => {
      table
        .integer('periodo_trabalho_id')
        .unsigned()
        .references('id')
        .inTable('periodo_trabalhos')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.alter('vagases', (table) => {
      table.dropColumn('periodo_trabalho_id')
    })
  }
}

module.exports = InputPeriodoTrabalhoSchema
