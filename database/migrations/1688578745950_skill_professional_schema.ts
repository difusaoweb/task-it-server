import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SkillProfessionalSchema extends BaseSchema {
  protected tableName = 'skill_professional'

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
      table
        .integer('skill_id')
        .unsigned()
        .references('skills.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.unique(['professional_id', 'skill_id'])
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
