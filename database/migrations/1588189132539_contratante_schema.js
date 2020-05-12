'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContratanteSchema extends Schema {
  up () {
    this.create('contratantes', (table) => {
      table.increments()
      table.string('name', 250).notNullable()
      table.string('razaoSocial', 250).notNullable()
      table.string('descricaoEmpresa', 1500).notNullable()
      table.string('cnpj', 30).notNullable()
      table.string('site', 250).notNullable()
      table.string('email', 250).notNullable()
      // table.string('setorEmpresa', 250).notNullable()
      // table.string('estado', 250).notNullable()
      // table.string('cidade', 250).notNullable()
      table.string('endereco', 500).notNullable()
      table.string('responsavel', 250).notNullable()
      table.string('emailResponsavel', 100).notNullable()
      table.string('telComercial', 50).notNullable()
      table.string('telCelular', 50).notNullable()
      table.string('telOutro', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('contratantes')
  }
}

module.exports = ContratanteSchema
