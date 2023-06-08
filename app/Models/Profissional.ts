import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class Profissional extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public cpf: string

  @column()
  public rg: string

  @column()
  public cidadeId: number | null

  @column()
  public userId: number | null

  @column()
  public endereco: string

  @column()
  public referencia: string

  @column()
  public telCelular: string

  @column()
  public telComercial: string | null

  @column()
  public telOutro: string | null

  @column()
  public site: string | null

  @column()
  public email: string

  @column()
  public habilidades: string | null

  @column()
  public experiencia: string | null

  @column()
  public escolaridadeId: number | null

  @column()
  public areaAtuacaoId: number | null

  @column()
  public vagaDesejadaId: number | null

  @column.dateTime()
  public dataNascimento: DateTime | null

  @column()
  public possuiDeficiencia: string | null

  @column()
  public temHabilitacao: string | null

  @column()
  public idiomas: string | null

  @column()
  public sexoId: number | null

  @column()
  public temFilhos: string | null

  @column()
  public estadoCivilId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
