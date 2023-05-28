import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CargosPesquisaSalarioSchema extends BaseSchema {
  protected tableName = 'cargos_pesquisa_salarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table
        .integer('id_pesquisa_salario')
        .unsigned()
        .references('id')
        .inTable('pesquisa_salarios')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('id_cargo')
        .unsigned()
        .references('id')
        .inTable('vaga_desejadas')
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
