import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('display_name', 80).notNullable()
      table.string('email', 254).unique().notNullable()
      table.string('password', 255).notNullable()
      table.string('type', 2).notNullable()
      table.boolean('validated').defaultTo(false).nullable()
      table.boolean('is_invited').defaultTo(false).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
