'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveHorasTrabalhadasSchema extends Schema {
  up () {
    this.alter('vagases', (table) => {
      table.dropColumn('carga_horaria')
    })
  }

  down () {
    this.alter('vagases', (table) => {
      table.string('carga_horaria')
    })
  }
}

module.exports = RemoveHorasTrabalhadasSchema
