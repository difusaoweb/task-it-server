import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ExperienciasProfissionalSchema extends BaseSchema {
  protected tableName = 'experiencias_profissionals'

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
      table.string('empresa', 250).notNullable()
      table.string('funcao', 2000).notNullable()
      table.timestamp('dataEntrada', { useTz: true }).notNullable()
      table.timestamp('dataSaida', { useTz: true }).nullable()
      table.boolean('atual').defaultTo(false).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
