import { column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'
import City from 'App/Models/City'

export default class State extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public letter: string

  @column()
  public iso: string

  @column()
  public slug: string

  @column()
  public population: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null

  @hasMany(() => City, {
    foreignKey: 'state_id'
  })
  public cities: HasMany<typeof City>
}
