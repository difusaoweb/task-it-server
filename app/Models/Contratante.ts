import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Contratante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public nomeFantasia: string | null

  @column()
  public descricaoEmpresa: string | null

  @column()
  public cnpj: string | null

  @column()
  public site: string | null

  @column()
  public email: string

  @column()
  public userId: number | null

  @column()
  public porteEmpresaId: number | null

  @column()
  public setorEmpresaId: number | null

  @column()
  public cidadeId: number | null

  @column()
  public endereco: string | null

  @column()
  public responsavel: string | null

  @column()
  public typeResponsavel: number | null

  @column()
  public emailResponsavel: string | null

  @column()
  public telComercial: string | null

  @column()
  public telCelular: string | null

  @column()
  public telOutro: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
