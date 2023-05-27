import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class HabilidadesProfissional extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profissionalId: number

  @column()
  public habilidadeId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
