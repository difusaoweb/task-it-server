import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApplySchema extends BaseSchema {
  protected tableName = 'applies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table
        .integer('candidate_id')
        .unsigned()
        .references('id')
        .inTable('professionals')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('vacancy_id')
        .unsigned()
        .references('id')
        .inTable('vacancies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.unique(['candidate_id', 'vacancy_id'])
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
