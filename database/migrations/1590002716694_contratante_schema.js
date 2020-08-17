'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContratanteSchema extends Schema {
  up () {
    this.create('contratantes', (table) => {
      table.increments()
      table.string('name', 250).notNullable()
      table.string('nome_fantasia', 250)
      table.string('descricaoEmpresa', 1500)
      table.string('cnpj', 30)
      table.string('site', 250)
      table.string('email', 250).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
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
        .inTable('cidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('endereco', 500)
      table.string('responsavel', 250)
      table.string('emailResponsavel', 100)
      table.string('telComercial', 50)
      table.string('telCelular', 50)
      table.string('telOutro', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('contratantes')
  }
}

module.exports = ContratanteSchema
