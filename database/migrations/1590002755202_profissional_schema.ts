import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfissionalSchema extends BaseSchema {
  protected tableName = 'profissionals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('nome', 250).notNullable()
      table.string('cpf', 15).notNullable()
      table.string('rg', 15).notNullable()
      table
        .integer('cidade_id')
        .unsigned()
        .references('id')
        .inTable('cidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.string('endereco', 500).notNullable()
      table.string('referencia', 500).notNullable()
      table.string('telCelular', 15).notNullable()
      table.string('telComercial', 15).nullable()
      table.string('telOutro', 15).nullable()
      table.string('site', 250).nullable()
      table.string('email', 250).notNullable()
      table.string('habilidades', 1000).nullable()
      table.string('experiencia', 2000).nullable()
      table
        .integer('escolaridade_id')
        .unsigned()
        .references('id')
        .inTable('escolaridades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('area_atuacao_id')
        .unsigned()
        .references('id')
        .inTable('area_profissionals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('vaga_desejada_id')
        .unsigned()
        .references('id')
        .inTable('vaga_desejadas')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.timestamp('dataNascimento', { useTz: true }).nullable()
      table.string('possuiDeficiencia').nullable()
      table.string('temHabilitacao').nullable()
      table.string('idiomas').nullable()
      table
        .integer('sexo_id')
        .unsigned()
        .references('id')
        .inTable('sexos')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.string('temFilhos').nullable()
      table
        .integer('estado_civil_id')
        .unsigned()
        .references('id')
        .inTable('estado_civils')
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
