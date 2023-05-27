import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class CargosPesquisaSalario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_pesquisa_salario: number | null

  @column()
  public id_cargo: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
