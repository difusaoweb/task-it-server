'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VagasSchema extends Schema {
  up () {
    this.create('vagas', (table) => {
      table.increments()
      table
      .integer('area_profissional_id')
      .unsigned()
      .references('id')
      .inTable('area_profissionals')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      table
      .integer('especializacao_id')
      .unsigned()
      .references('id')
      .inTable('escolaridades')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      table.integer('tipo_salario')
      table.float('valor_salario').notNullable()
      table.float('valor_comissao')
      table.string('beneficios')
      table.integer('carga_horaria')
      table.string('descricao_cargo')
      table
      .integer('cargo_id')
      .unsigned()
      .references('id')
      .inTable('vaga_desejadas')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('vagas')
  }
}

module.exports = VagasSchema
