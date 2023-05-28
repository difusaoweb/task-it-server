import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SetorEmpresaSchema extends BaseSchema {
  protected tableName = 'setor_empresas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('title', 100).notNullable()
      table.integer('state').defaultTo(1).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
