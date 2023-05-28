import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TokensSchema extends BaseSchema {
  protected tableName = 'tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.string('token', 255).unique().index().notNullable()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
