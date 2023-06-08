import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class AreaProfissional extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public state: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
