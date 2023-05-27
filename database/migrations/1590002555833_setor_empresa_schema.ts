'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SetorEmpresaSchema extends Schema {
  up () {
    this.create('setor_empresas', (table) => {
      table.increments()
      table.string('title', 100).notNullable()
      table.integer('state').defaultTo(1)
      table.timestamps()
    })
  }

  down () {
    this.drop('setor_empresas')
  }
}

module.exports = SetorEmpresaSchema
