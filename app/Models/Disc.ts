import { column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import { CustomBaseModel } from 'App/Models/CustomBaseModel'

export default class Disc extends CustomBaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public profissionalId: number | null

  @column()
  public d: number

  @column()
  public i: number

  @column()
  public s: number

  @column()
  public c: number

  @column()
  public direcionado: number

  @column()
  public influente: number

  @column()
  public estavel: number

  @column()
  public cuidadoso: number

  @column()
  public confianteEmSi: number

  @column()
  public otimista: number

  @column()
  public indeciso: number

  @column()
  public contido: number

  @column()
  public aventureiro: number

  @column()
  public entusiasmado: number

  @column()
  public previsivel: number

  @column()
  public logico: number

  @column()
  public decisivo: number

  @column()
  public aberto: number

  @column()
  public paciente: number

  @column()
  public analitico: number

  @column()
  public desafiador: number

  @column()
  public impulsivel: number

  @column()
  public equilibrado: number

  @column()
  public preciso: number

  @column()
  public incansavel: number

  @column()
  public emotivo: number

  @column()
  public protetor: number

  @column()
  public contestador: number

  @column()
  public competitivo: number

  @column()
  public persuasivo: number

  @column()
  public acomodado: number

  @column()
  public curioso: number

  @column()
  public assertivo: number

  @column()
  public falador: number

  @column()
  public modesto: number

  @column()
  public educado: number

  @column()
  public experimentador: number

  @column()
  public sedutor: number

  @column()
  public facilDeConviver: number

  @column()
  public consistente: number

  @column()
  public rigoroso: number

  @column()
  public sensivel: number

  @column()
  public sincero: number

  @column()
  public perfeccionista: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null
}
