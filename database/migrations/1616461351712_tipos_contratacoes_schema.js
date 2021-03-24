'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TiposContratacoesSchema extends Schema {
  up () {
    this.create('tipos_contratacoes', (table) => {
      table.increments()
      table.string('title', 2000).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('tipos_contratacoes')
  }
}

module.exports = TiposContratacoesSchema
