import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AppliePlaces extends BaseSchema {
  protected tableName = 'applies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('candidato_id')
        .unsigned()
        .references('id')
        .inTable('profissionals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('vaga_id')
        .unsigned()
        .references('id')
        .inTable('vagases')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
