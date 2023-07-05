import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CitySchema extends BaseSchema {
  protected tableName = 'cities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('iso', 50).notNullable()
      table
        .integer('state_id')
        .unsigned()
        .references('id')
        .inTable('estados')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
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
