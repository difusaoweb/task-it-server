import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class ExperiencesOfProfessional extends CustomBaseModel {
  public static table = 'experiences_of_professional'

  @column({ isPrimary: true })
  public id: number

  @column()
  public professionalId: number

  @column()
  public business: string

  @column()
  public role: string

  @column.dateTime()
  public startDate: DateTime

  @column()
  public current: boolean

  @column.dateTime()
  public endDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
