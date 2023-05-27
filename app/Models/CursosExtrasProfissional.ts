import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class CursosExtrasProfissional extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profissional_id: number

  @column()
  public instituicao: string

  @column()
  public curso: string

  @column.dateTime()
  public dataInicio: DateTime

  @column.dateTime()
  public dataTermino: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}