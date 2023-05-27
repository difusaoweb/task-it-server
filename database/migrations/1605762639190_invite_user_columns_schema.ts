'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InviteUserColumnsSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.boolean('isInvited').defaultTo(false)
      table.boolean('asActiveInvite').defaultTo(false)
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = InviteUserColumnsSchema
