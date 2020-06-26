'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VagasSchema extends Schema {
  up () {
    this.create('vagases', (table) => {
      table.increments()
      table.string('title', 100).notNullable()
      table
        .integer('empresa_id')
        .unsigned()
        .references('id')
        .inTable('contratantes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('cidade_id')
        .unsigned()
        .references('id')
        .inTable('cidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('area_profissional_id')
        .unsigned()
        .references('id')
        .inTable('area_profissionals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('escolaridade_id')
        .unsigned()
        .references('id')
        .inTable('escolaridades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.integer('tipo_salario').notNullable()
      table.float('valor_salario')
      table.float('valor_comissao')
      table.string('beneficios')
      table.integer('carga_horaria')
      table.string('desc_carga_horaria', 200).notNullable()
      table.string('descricao_cargo', 1000)
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
    this.drop('vagases')
  }
}

module.exports = VagasSchema
