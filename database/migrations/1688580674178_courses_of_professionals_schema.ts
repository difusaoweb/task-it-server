import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CoursesOfProfessionalSchema extends BaseSchema {
  protected tableName = 'courses_of_professionals'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table
        .integer('professional_id')
        .unsigned()
        .references('professionals.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('institution', 250).notNullable()
      table.string('course', 2000).notNullable()
      table.timestamp('start_date', { useTz: true }).notNullable()
      table.timestamp('end_date', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
