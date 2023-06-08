import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class Apply extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public candidatoId: number | null

  @column()
  public vagaId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
