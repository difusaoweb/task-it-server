import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VagaDesejada extends BaseSchema {
  protected tableName = 'vaga_desejadas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.integer('type_departament', 2).notNullable()
      table.string('title_departament', 100).notNullable()
      table.integer('type_fuction', 2)
      table.string('title_type_fuction', 100)
      table.string('title_function', 100).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
