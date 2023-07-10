import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class Apply extends CustomBaseModel {
  public static table = 'applies'

  @column({ isPrimary: true })
  public id: number

  @column()
  public candidateId: number

  @column()
  public vacancyId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
