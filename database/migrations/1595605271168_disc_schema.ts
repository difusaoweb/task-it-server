import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DiscSchema extends BaseSchema {
  protected tableName = 'discs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table
        .integer('professional_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.integer('d').notNullable()
      table.integer('i').notNullable()
      table.integer('s').notNullable()
      table.integer('c').notNullable()
      table.integer('direcionado').notNullable()
      table.integer('influente').notNullable()
      table.integer('estavel').notNullable()
      table.integer('cuidadoso').notNullable()
      table.integer('confiante_em_si').notNullable()
      table.integer('otimista').notNullable()
      table.integer('indeciso').notNullable()
      table.integer('contido').notNullable()
      table.integer('aventureiro').notNullable()
      table.integer('entusiasmado').notNullable()
      table.integer('previsivel').notNullable()
      table.integer('logico').notNullable()
      table.integer('decisivo').notNullable()
      table.integer('aberto').notNullable()
      table.integer('paciente').notNullable()
      table.integer('analitico').notNullable()
      table.integer('desafiador').notNullable()
      table.integer('impulsivel').notNullable()
      table.integer('equilibrado').notNullable()
      table.integer('preciso').notNullable()
      table.integer('incansavel').notNullable()
      table.integer('emotivo').notNullable()
      table.integer('protetor').notNullable()
      table.integer('contestador').notNullable()
      table.integer('competitivo').notNullable()
      table.integer('persuasivo').notNullable()
      table.integer('acomodado').notNullable()
      table.integer('curioso').notNullable()
      table.integer('assertivo').notNullable()
      table.integer('falador').notNullable()
      table.integer('modesto').notNullable()
      table.integer('educado').notNullable()
      table.integer('experimentador').notNullable()
      table.integer('sedutor').notNullable()
      table.integer('facil_de_conviver').notNullable()
      table.integer('consistente').notNullable()
      table.integer('rigoroso').notNullable()
      table.integer('sensivel').notNullable()
      table.integer('sincero').notNullable()
      table.integer('perfeccionista').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
