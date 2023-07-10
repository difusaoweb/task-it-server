import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VacancySchema extends BaseSchema {
  protected tableName = 'vacancies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table
        .integer('business_id')
        .unsigned()
        .references('id')
        .inTable('businesses')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('job_id')
        .unsigned()
        .references('id')
        .inTable('desired_jobs')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.string('title', 100).notNullable()
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('job_workload_id')
        .unsigned()
        .references('id')
        .inTable('job_workloads')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('educational_level_id')
        .unsigned()
        .references('id')
        .inTable('educational_levels')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('payment_type_id')
        .unsigned()
        .references('id')
        .inTable('payment_types')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('employment_regime_id')
        .unsigned()
        .references('id')
        .inTable('employment_regimes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.double('salary_value').nullable()
      table.string('commission').nullable()
      table.string('workload', 200).notNullable()
      table.string('address', 350).nullable()
      table.string('job_description', 1000).notNullable()
      table.string('requirements').notNullable()
      table.string('benefits').notNullable()
      table
        .integer('shift_pattern_id')
        .unsigned()
        .references('id')
        .inTable('shift_patterns')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
        .defaultTo(null)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
