import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AreaProfissionalSchema extends BaseSchema {
  protected tableName = 'area_profissionals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().nullable()
      table.string('title', 100).notNullable()
      table.integer('state').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
