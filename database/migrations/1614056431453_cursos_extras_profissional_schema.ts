import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CursosExtrasProfissionalSchema extends BaseSchema {
  protected tableName = 'cursos_extras_profissionals'

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
      table.string('instituicao', 250).notNullable()
      table.string('curso', 2000).notNullable()
      table.timestamp('dataInicio', { useTz: true }).notNullable()
      table.timestamp('dataTermino', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
