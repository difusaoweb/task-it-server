import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class VagaDesejada extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public typeDepartament: number

  @column()
  public titleDepartament: string

  @column()
  public typeFuction: number | null

  @column()
  public titleTypeFuction: string | null

  @column()
  public titleFunction: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}