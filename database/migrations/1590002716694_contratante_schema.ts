import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ContratanteSchema extends BaseSchema {
  protected tableName = 'contratantes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('name', 250).notNullable()
      table.string('nome_fantasia', 250).nullable()
      table.string('descricaoEmpresa', 1500).nullable()
      table.string('cnpj', 30).nullable()
      table.string('site', 250).nullable()
      table.string('email', 250).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('porte_empresa_id')
        .unsigned()
        .references('id')
        .inTable('porte_empresas')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('setor_empresa_id')
        .unsigned()
        .references('id')
        .inTable('setor_empresas')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('cidade_id')
        .unsigned()
        .references('id')
        .inTable('cidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.string('endereco', 500).nullable()
      table.string('responsavel', 250).nullable()
      table.integer('type_responsavel').nullable()
      table.string('emailResponsavel', 100).nullable()
      table.string('telComercial', 50).nullable()
      table.string('telCelular', 50).nullable()
      table.string('telOutro', 50).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
