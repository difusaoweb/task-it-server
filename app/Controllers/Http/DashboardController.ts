import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Exception } from '@adonisjs/core/build/standalone'
import Professional from 'App/Models/Professional'

export default class DashboardController {
  public async show({ auth, response }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', undefined, 'TOKEN_USER_INVALID')
      }

      const professional = await Professional.findBy('user_id', user.id)
      if (professional === null) {
        return response.send([])
      }

      const returnDb = await Database.from('applies')
        .select(
          'applies.id',
          'vacancies.title',
          'businesses.company_name as business',
          'cities.title as city',
          'states.letter as uf',
          'job_workloads.title as jobWorkloadTitle',
          'vacancies.payment_type_id as paymentTypeId',
          'applies.vacancy_id as vacancyId',
          'applies.candidate_id as candidateId'
        )
        .innerJoin('vacancies', 'vacancies.id', 'applies.vacancy_id')
        .innerJoin('cities', 'cities.id', 'vacancies.city_id')
        .innerJoin('states', 'states.id', 'cities.state_id')
        .innerJoin('businesses', 'businesses.id', 'vacancies.business_id')
        .innerJoin('job_workloads', 'job_workloads.id', 'vacancies.job_workload_id')
        .where('applies.candidate_id', professional.id)

      return response.send(returnDb)
    } catch (err: any) {
      console.error(err)
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      if (err.code) {
        failure.code = err.code
      }
      switch (failure.code) {
        case 'TOKEN_USER_INVALID':
          status = 403
          failure.code = 'TOKEN_USER_INVALID'
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/DashboardController.ts show')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
