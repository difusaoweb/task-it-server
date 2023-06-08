import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class ExperienciasProfissional extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profissional_id: number

  @column()
  public empresa: string

  @column()
  public funcao: string

  @column.dateTime()
  public dataEntrada: DateTime

  @column.dateTime()
  public dataSaida: DateTime | null

  @column()
  public atual: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
