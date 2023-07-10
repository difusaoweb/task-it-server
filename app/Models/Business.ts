import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class Business extends CustomBaseModel {
  public static table = 'businesses'

  @column({ isPrimary: true })
  public id: number

  @column()
  public companyName: string

  @column()
  public tradingName: string

  @column()
  public description: string | null

  @column()
  public cnpj: string | null

  @column()
  public site: string | null

  @column()
  public email: string

  @column()
  public userId: number

  @column()
  public companySizeId: number | null

  @column()
  public businessCategoryIdId: number | null

  @column()
  public cityId: number | null

  @column()
  public address: string | null

  @column()
  public responsibleName: string | null

  @column()
  public responsibleTypeId: number | null

  @column()
  public responsibleEmail: string | null

  @column()
  public businessPhone: string | null

  @column()
  public phoneNumber: string | null

  @column()
  public anotherPhoneNumber: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
