import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CompanySizeSchema extends BaseSchema {
  protected tableName = 'company_sizes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('title', 100).notNullable()
      table.string('size', 50).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}