import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RolesSalarySurveySchema extends BaseSchema {
  protected tableName = 'roles_salary_surveys'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table
        .integer('salary_survey_id')
        .unsigned()
        .references('id')
        .inTable('salary_surveys')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('desired_jobs_id')
        .unsigned()
        .references('id')
        .inTable('desired_jobs')
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
