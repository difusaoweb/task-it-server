import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cidades extends BaseSchema {
  protected tableName = 'cidades'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('iso', 50).notNullable()
      table
        .integer('state_id')
        .unsigned()
        .references('id')
        .inTable('estados')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('iso_ddd', 50).notNullable()
      table.string('title', 100).notNullable()
      table.string('status', 50).notNullable()
      table.string('slug', 50).notNullable()
      table.string('population', 50).notNullable()
      table.string('lat', 50).notNullable()
      table.string('long', 50).notNullable()
      table.string('income_per_capita', 50).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
