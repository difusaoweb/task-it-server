import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vagas extends BaseSchema {
  protected tableName = 'vagases'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('title', 100).notNullable()
      table
        .integer('empresa_id')
        .unsigned()
        .references('id')
        .inTable('contratantes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('cidade_id')
        .unsigned()
        .references('id')
        .inTable('cidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('area_profissional_id')
        .unsigned()
        .references('id')
        .inTable('area_profissionals')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('escolaridade_id')
        .unsigned()
        .references('id')
        .inTable('escolaridades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table
        .integer('tipo_salario')
        .unsigned()
        .references('id')
        .inTable('payment_types')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.double('valor_salario')
      table.double('valor_comissao')
      table.string('beneficios')
      table.string('endereco', 350).notNullable()
      table.string('desc_carga_horaria', 200).notNullable()
      table.string('descricao_cargo', 1000)
      table
        .integer('cargo_id')
        .unsigned()
        .references('id')
        .inTable('vaga_desejadas')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('requisitos')
      table
        .integer('tipo_contratacao_id')
        .unsigned()
        .references('id')
        .inTable('tipos_contratacoes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('periodo_trabalho_id')
        .unsigned()
        .references('id')
        .inTable('periodo_trabalhos')
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
