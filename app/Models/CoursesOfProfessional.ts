import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class CoursesOfProfessional extends CustomBaseModel {
  public static table = 'courses_of_professionals'

  @column({ isPrimary: true })
  public id: number

  @column()
  public professionalId: number

  @column()
  public institution: string

  @column()
  public course: string

  @column.dateTime()
  public startDate: DateTime

  @column.dateTime()
  public endDate: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
