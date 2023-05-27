import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ExperienciasProfissional extends BaseSchema {
  protected tableName = 'experiencias_profissionals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('profissional_id')
        .unsigned()
        .references('id')
        .inTable('profissionals')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('empresa', 250).notNullable()
      table.string('funcao', 2000).notNullable()
      table.date('dataEntrada').notNullable()
      table.date('dataSaida')
      table.boolean('atual').defaultTo(false)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
