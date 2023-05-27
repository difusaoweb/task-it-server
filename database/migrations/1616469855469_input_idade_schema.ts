'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InputIdadeSchema extends Schema {
  up () {
    this.alter('profissionals', (table) => {
      table.date('dataNascimento')
      table.string('possuiDeficiencia')
      table.string('temHabilitacao')
      table.string('idiomas')
      table
        .integer('sexo_id')
        .unsigned()
        .references('id')
        .inTable('sexos')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('temFilhos')
      table
        .integer('estado_civil_id')
        .unsigned()
        .references('id')
        .inTable('estado_civils')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.alter('profissionals', (table) => {
      table.dropColumn('dataNascimento')
      table.dropColumn('possuiDeficiencia')
      table.dropColumn('temHabilitacao')
      table.dropColumn('idiomas')
      table.dropColumn('sexo_id')
      table.dropColumn('estado_civil_id')
      table.dropColumn('temFilhos')
    })
  }
}

module.exports = InputIdadeSchema
