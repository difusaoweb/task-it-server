import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('username', 80).unique().notNullable()
      table.string('email', 254).unique().notNullable()
      table.string('password', 60).notNullable()
      table.string('type', 2).notNullable()
      table.boolean('validated').defaultTo(false).nullable()
      table.string('token').nullable()
      table.timestamp('token_created_at', { useTz: true }).nullable()
      table.boolean('isInvited').defaultTo(false).nullable()
      table.boolean('asActiveInvite').defaultTo(false).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
