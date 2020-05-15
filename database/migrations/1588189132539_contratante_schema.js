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
      table
      .integer('porte_empresa_id')
      .unsigned()
      .references('id')
      .inTable('porte_empresas')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      table
      .integer('setor_empresa_id')
      .unsigned()
      .references('id')
      .inTable('setor_empresas')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      table
      .integer('cidade_id')
      .unsigned()
      .references('id')
      .inTable('cidade')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
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
