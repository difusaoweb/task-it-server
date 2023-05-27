'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargosPesquisaSalarioSchema extends Schema {
  up () {
    this.create('cargos_pesquisa_salarios', (table) => {
      table.increments()
      table
        .integer('id_pesquisa_salario')
        .unsigned()
        .references('id')
        .inTable('pesquisa_salarios')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('id_cargo')
        .unsigned()
        .references('id')
        .inTable('vaga_desejadas')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('cargos_pesquisa_salarios')
  }
}

module.exports = CargosPesquisaSalarioSchema
