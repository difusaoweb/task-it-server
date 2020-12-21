'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HabilidadesSchema extends Schema {
  up () {
    this.create('habilidades', (table) => {
      table.increments()
      table.integer('idTipo').notNullable()
      table.string('tipo', 100).notNullable()
      table.string('nome', 100).notNullable()

      table.timestamps()
    })
  }

  down () {
    this.drop('habilidades')
  }
}

module.exports = HabilidadesSchema
