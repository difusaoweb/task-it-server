import { column, beforeSave, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'
import Professional from 'App/Models/Professional'
import Business from 'App/Models/Business'

export default class User extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public displayName: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public type: string

  @column()
  public validated: boolean

  @column()
  public isInvited: boolean

  @column()
  public asActiveInvite: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => Professional)
  public professional: HasOne<typeof Professional>

  @hasOne(() => Business)
  public business: HasOne<typeof Business>
}
