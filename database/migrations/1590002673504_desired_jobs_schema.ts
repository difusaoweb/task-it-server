import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DesiredJobSchema extends BaseSchema {
  protected tableName = 'desired_jobs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.integer('type_departament', 2).notNullable()
      table.string('title_departament', 100).notNullable()
      table.integer('type_fuction', 2).nullable()
      table.string('title_type_fuction', 100).nullable()
      table.string('title_function', 100).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}