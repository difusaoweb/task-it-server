import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Apply extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public candidato_id: number | null

  @column()
  public vaga_id: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
