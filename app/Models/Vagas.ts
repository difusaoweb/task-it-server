import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Vagas extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public empresaId: number | null

  @column()
  public cidadeId: number | null

  @column()
  public areaProfissionalId: number | null

  @column()
  public escolaridadeId: number | null

  @column()
  public tipo_salario: number | null

  @column()
  public valorSalario: number | null

  @column()
  public valorComissao: number | null

  @column()
  public beneficios: string | null

  @column()
  public endereco: string

  @column()
  public descCargaHoraria: string

  @column()
  public descricaoCargo: string | null

  @column()
  public cargoId: number | null

  @column()
  public requisitos: string | null

  @column()
  public tipoContratacaoId: number | null

  @column()
  public periodoTrabalhoId: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
