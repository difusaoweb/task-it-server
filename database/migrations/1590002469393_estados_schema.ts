import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EstadosSchema extends BaseSchema {
  protected tableName = 'estados'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('title', 50).notNullable()
      table.string('letter', 50).notNullable()
      table.string('iso', 250).notNullable()
      table.string('slug', 250).notNullable()
      table.string('population', 250).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
