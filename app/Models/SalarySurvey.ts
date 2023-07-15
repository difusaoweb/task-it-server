import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class SalarySurvey extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public nome: string

  @column()
  public meucargo: string

  @column()
  public telefoneContato: string

  @column()
  public nomeEmpresa: string

  @column()
  public areaAtuacao: string

  @column()
  public address: string

  @column()
  public cep: string

  @column()
  public site: string

  @column()
  public telefoneRamal: string

  @column()
  public salaryValue: string

  @column()
  public salaryValueColaboradores: string

  @column()
  public cityId: number | null

  @column()
  public tipoSalarioId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}