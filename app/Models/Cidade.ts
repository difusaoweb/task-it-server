import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public iso: string

  @column()
  public state_id: number | null

  @column()
  public iso_ddd: string

  @column()
  public title: string

  @column()
  public status: string

  @column()
  public slug: string

  @column()
  public population: string

  @column()
  public lat: string

  @column()
  public long: string

  @column()
  public income_per_capita: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
