import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class PesquisaSalario extends BaseModel {
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
  public endereco: string

  @column()
  public cep: string

  @column()
  public site: string

  @column()
  public telefoneRamal: string

  @column()
  public valorSalario: string

  @column()
  public valorSalarioColaboradores: string

  @column()
  public cidadeId: number | null

  @column()
  public tipoSalarioId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
