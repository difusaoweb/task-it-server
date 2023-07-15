import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ShiftPatternSchema extends BaseSchema {
  protected tableName = 'shift_patterns'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('title', 2000).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}