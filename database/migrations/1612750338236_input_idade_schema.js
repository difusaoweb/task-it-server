'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InputIdadeSchema extends Schema {
  up () {
    this.alter('profissionals', (table) => {
      table.integer('idade')
    })
  }

  down () {
    this.alter('profissionals', (table) => {
      table.dropColumn('idade')
    })
  }
}

module.exports = InputIdadeSchema
