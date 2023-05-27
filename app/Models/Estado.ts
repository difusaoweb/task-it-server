import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Cidade from 'App/Models/Cidade'

export default class Estado extends BaseModel {
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

  @hasMany(() => Cidade, {
    foreignKey: 'state_id'
  })
  public cidades: HasMany<typeof Cidade>
}
