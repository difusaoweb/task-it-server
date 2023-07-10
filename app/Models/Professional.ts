import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { manyToMany, ManyToMany, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'
import Skill from 'App/Models/Skill'
import CoursesOfProfessional from 'App/Models/CoursesOfProfessional'
import ExperiencesOfProfessional from 'App/Models/ExperiencesOfProfessional'

export default class Professional extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cpf: string

  @column()
  public rg: string

  @column()
  public cityId: number | null

  @column()
  public userId: number | null

  @column()
  public address: string

  @column()
  public addressReference: string | null

  @column()
  public phoneNumber: string

  @column()
  public anotherPhoneNumber: string | null

  @column()
  public site: string | null

  @column()
  public email: string

  @column()
  public educationalLevelId: number | null

  @column()
  public jobWorkloadId: number | null

  @column()
  public desiredJobId: number | null

  @column.dateTime()
  public dateOfBirth: DateTime

  @column()
  public disability: string | null

  @column()
  public haveALicense: boolean

  @column()
  public languages: string | null

  @column()
  public sexId: number | null

  @column()
  public maritalStatusId: number | null

  @column()
  public jobTypeId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null

  @manyToMany(() => Skill, {
    pivotTable: 'skills_professional',
    pivotForeignKey: 'profissional_id',
    pivotRelatedForeignKey: 'skill_id'
  })
  public skills: ManyToMany<typeof Skill>

  @hasMany(() => CoursesOfProfessional, {
    foreignKey: 'professional_id'
  })
  public courses: HasMany<typeof CoursesOfProfessional>

  @hasMany(() => ExperiencesOfProfessional, {
    foreignKey: 'professional_id'
  })
  public experiences: HasMany<typeof ExperiencesOfProfessional>
}
