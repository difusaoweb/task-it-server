'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PorteEmpresaSchema extends Schema {
  up () {
    this.create('porte_empresas', (table) => {
      table.increments()
      table.string('title', 100).notNullable()
      table.string('size', 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('porte_empresas')
  }
}

module.exports = PorteEmpresaSchema
