import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfessionalSchema extends BaseSchema {
  protected tableName = 'professionals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('name', 250).notNullable()
      table.string('cpf', 15).unique().notNullable()
      table.string('rg', 15).unique().notNullable()
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('user_id')
        .unsigned()
        .unique()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .nullable()
      table.string('address', 500).notNullable()
      table.string('address_reference', 500).nullable()
      table.string('phone_number', 15).notNullable()
      table.string('another_phone_number', 15).nullable()
      table.string('site', 250).nullable()
      table.string('email', 250).notNullable()
      table
        .integer('educational_level_id')
        .unsigned()
        .references('id')
        .inTable('educational_levels')
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
        .integer('desired_job_id')
        .unsigned()
        .references('id')
        .inTable('desired_jobs')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.timestamp('date_of_birth', { useTz: true }).nullable()
      table.string('disability').nullable()
      table.boolean('have_a_license').defaultTo(false).notNullable()
      table.string('languages').nullable()
      table
        .integer('sex_id')
        .unsigned()
        .references('id')
        .inTable('sexes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('marital_status_id')
        .unsigned()
        .references('id')
        .inTable('marital_statuses')
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
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
