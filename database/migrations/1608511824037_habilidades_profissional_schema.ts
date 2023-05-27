import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class HabilidadesProfissional extends BaseSchema {
  protected tableName = 'habilidades_profissionals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table
        .integer('profissional_id')
        .unsigned()
        .references('id')
        .inTable('profissionals')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('habilidade_id')
        .unsigned()
        .references('id')
        .inTable('habilidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
