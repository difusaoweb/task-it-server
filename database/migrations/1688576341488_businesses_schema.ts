import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BusinessSchema extends BaseSchema {
  protected tableName = 'businesses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('company_name', 250).notNullable()
      table.string('trading_name', 250).notNullable()
      table.string('description', 1500).nullable()
      table.string('cnpj', 30).unique().nullable()
      table.string('site', 250).nullable()
      table.string('email', 250).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .unique()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('company_size_id')
        .unsigned()
        .references('id')
        .inTable('company_sizes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('business_category_id')
        .unsigned()
        .references('id')
        .inTable('business_categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table
        .integer('city_id')
        .unsigned()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
        .nullable()
      table.string('address', 500).nullable()
      table.string('responsible_name', 250).nullable()
      table.integer('responsible_type_id').nullable()
      table.string('responsible_email', 100).nullable()
      table.string('business_phone', 50).nullable()
      table.string('phone_number', 50).nullable()
      table.string('another_phone_number', 50).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
