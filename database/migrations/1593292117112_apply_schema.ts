'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppliePlacesSchema extends Schema {
  up () {
    this.create('applies', (table) => {
      table.increments()
      table
        .integer('candidato_id')
        .unsigned()
        .references('id')
        .inTable('profissionals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('vaga_id')
        .unsigned()
        .references('id')
        .inTable('vagases')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('applies')
  }
}

module.exports = AppliePlacesSchema
