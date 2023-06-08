import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class CargosPesquisaSalario extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public idPesquisaSalario: number | null

  @column()
  public idCargo: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
