import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class City extends CustomBaseModel {
  public static table = 'cities'

  @column({ isPrimary: true })
  public id: number

  @column()
  public iso: string

  @column()
  public stateId: number | null

  @column()
  public isoDdd: string

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
  public incomePerCapita: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
