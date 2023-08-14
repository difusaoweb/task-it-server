import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { column, beforeSave, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'
import Task from 'App/Models/Task'

export default class User extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public validated: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null

  @hasMany(() => Task)
  public tasks: HasMany<typeof Task>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
