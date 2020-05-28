'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfissionalSchema extends Schema {
  up () {
    this.create('profissionals', (table) => {
      table.string('nome', 250).notNullable()
      table.string('cpf', 15).notNullable()
      table.string('rg', 15).notNullable()
      table
        .integer('cidade_id')
        .unsigned()
        .references('id')
        .inTable('cidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('endereco', 500).notNullable()
      table.string('referencia', 500).notNullable()
      table.string('telCelular', 15).notNullable()
      table.string('telComercial', 15)
      table.string('telOutro', 15)
      table.string('site', 250)
      table.string('email', 250).notNullable()
      table.string('habilidades', 1000)
      table.string('experiencia', 2000)
      table
        .integer('escolaridade_id')
        .unsigned()
        .references('id')
        .inTable('escolaridades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('area_atuacao_id')
        .unsigned()
        .references('id')
        .inTable('area_profissionals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('cursosExtras', 1000).notNullable()
      table
        .integer('vaga_desejada_id')
        .unsigned()
        .references('id')
        .inTable('vaga_desejadas')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('profissionals')
  }
}

module.exports = ProfissionalSchema
