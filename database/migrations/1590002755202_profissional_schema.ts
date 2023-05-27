import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profissional extends BaseSchema {
  protected tableName = 'profissionals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
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
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('endereco', 500).notNullable()
      table.string('referencia', 500).notNullable()
      table.string('telCelular', 15).notNullable()
      table.string('telComercial', 15)
      table.string('telOutro', 15)
      table.string('site', 250)
      table.string('email', 250).notNullable()
      table.string('habilidades', 1000)
      table.string('experiencia', 2000)
      table
        .integer('escolaridade_id')
        .unsigned()
        .references('id')
        .inTable('escolaridades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('area_atuacao_id')
        .unsigned()
        .references('id')
        .inTable('area_profissionals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('vaga_desejada_id')
        .unsigned()
        .references('id')
        .inTable('vaga_desejadas')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.date('dataNascimento')
      table.string('possuiDeficiencia')
      table.string('temHabilitacao')
      table.string('idiomas')
      table
        .integer('sexo_id')
        .unsigned()
        .references('id')
        .inTable('sexos')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('temFilhos')
      table
        .integer('estado_civil_id')
        .unsigned()
        .references('id')
        .inTable('estado_civils')
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
