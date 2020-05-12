'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfissionalSchema extends Schema {
  up () {
    this.create('profissionals', (table) => {
      table.string('name', 250).notNullable()
      table.string('cpf', 15).notNullable()
      table.string('rg', 15).notNullable()
      // table.string('estado', 250).notNullable()
      // table.string('cidade', 250).notNullable()
      table.string('endereco', 500).notNullable()
      table.string('referencia', 500).notNullable()
      table.string('telCelular', 15).notNullable()
      table.string('telComercial', 15)
      table.string('telOutro', 15)
      table.string('site', 250)
      table.string('email', 250).notNullable()
      table.string('habilidades', 1000)
      table.string('experiencia', 2000)
      // table.string('area', 500)
      // table.string('escolaridade', 250).notNullable()
      // table.string('areaAtuacao', 250).notNullable()
      table.string('cursosExtras', 1000).notNullable()
      // table.string('vagaDesejada', 250).notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('profissionals')
  }
}

module.exports = ProfissionalSchema
