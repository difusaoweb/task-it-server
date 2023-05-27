import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class User extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('type', 2).notNullable()
      table.boolean('validated').defaultTo(false)
      table.string('token')
      table.timestamp('token_created_at')
      table.boolean('isInvited').defaultTo(false)
      table.boolean('asActiveInvite').defaultTo(false)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
