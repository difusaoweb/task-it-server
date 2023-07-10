import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class Vacancy extends CustomBaseModel {
  public static table = 'vacancies'

  @column({ isPrimary: true })
  public id: number

  @column()
  public businessId: number | null

  @column()
  public jobId: number | null

  @column()
  public title: string

  @column()
  public cityId: number | null

  @column()
  public jobWorkloadId: number | null

  @column()
  public educationalLevelId: number | null

  @column()
  public paymentTypeId: number | null

  @column()
  public employmentRegimeId: number | null

  @column()
  public salaryValue: number | null

  @column()
  public commission: string | null

  @column()
  public workload: string

  @column()
  public address: string | null

  @column()
  public jobDescription: string

  @column()
  public requirements: string

  @column()
  public benefits: string

  @column()
  public shiftPatternId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
