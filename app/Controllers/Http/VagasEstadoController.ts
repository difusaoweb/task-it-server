import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class VagasEstadoController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const estados = await Database.from('estados')
        .select('estados.id', 'estados.title as name')
        .innerJoin('cidades', 'estados.id', 'cidades.state_id')
        .groupBy('estados.id')
        .innerJoin('vagases', 'cidades.id', 'vagases.cidade_id')
        .count('vagases.id as totalVagas')
        .orderBy('totalVagas', 'desc')
        .limit(12)

      response.send(estados)
      return response
    } catch (err) {
      console.error(err)
      return null
    }
  }
}
