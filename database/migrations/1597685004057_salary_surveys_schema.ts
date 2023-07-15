import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SalarySurveySchema extends BaseSchema {
  protected tableName = 'salary_surveys'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('email', 250).notNullable()
      table.string('nome', 250).notNullable()
      table.string('meucargo', 250).notNullable()
      table.string('telefone_contato', 50).notNullable()
      table.string('nome_empresa', 250).notNullable()
      table.string('area_atuacao', 150).notNullable()
      table.string('address', 350).notNullable()
      table.string('cep', 50).notNullable()
      table.string('site', 150).notNullable()
      table.string('telefone_ramal', 150).notNullable()
      table.string('salary_value', 150).notNullable()
      table.string('salary_value_colaboradores', 150).notNullable()
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('tipo_salario_id')
        .unsigned()
        .references('id')
        .inTable('payment_types')
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