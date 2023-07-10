import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class VacanciesPerStateController {
  public async index({ response }: HttpContextContract) {
    try {
      const states = await Database.from('states')
        .select('states.id', 'states.title as name')
        .innerJoin('cities', 'states.id', 'cities.state_id')
        .groupBy('states.id')
        .innerJoin('vacancies', 'cities.id', 'vacancies.city_id')
        .count('vacancies.id as totalVagas')
        .orderBy('totalVagas', 'desc')
        .limit(12)

      response.send(states)
      return response
    } catch (err) {
      console.error(err)
      let status = 500
      let failure = { code: 'UNKNOWN' }
      return response.status(status).send(failure)
    }
  }
}
