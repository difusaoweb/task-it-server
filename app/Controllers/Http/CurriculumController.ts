import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'
import Hash from '@ioc:Adonis/Core/Hash'
import { Exception } from '@adonisjs/core/build/standalone'

export default class CurriculumController {
  public async index({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      desiredJobId: schema.number.nullableAndOptional(),
      cityId: schema.number.nullableAndOptional(),
      jobWorkloadId: schema.number.nullableAndOptional(),
      page: schema.number()
    })
    try {
      const { desiredJobId, cityId, jobWorkloadId, page } = await request.validate({
        schema: controllerSchema
      })

      const curricula = Database.from('professionals')
        .select(
          'professionals.*',
          'cities.title as city',
          'states.letter as uf',
          'desired_jobs.title_function as jobName'
        )
        .innerJoin('cities', 'cities.id', 'professionals.city_id')
        .innerJoin('states', 'states.id', 'cities.state_id')
        .innerJoin('desired_jobs', 'desired_jobs.id', 'professionals.desired_job_id')
      // .forPage(page, 10)

      if (desiredJobId) {
        curricula.where('professionals.desired_job_id', desiredJobId)
      }

      if (cityId) {
        curricula.where('professionals.city_id', cityId)
      }

      if (jobWorkloadId) {
        curricula.where('professionals.job_workload_id', jobWorkloadId)
      }

      return await curricula.paginate(page, 10)
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          failure.code = 'INVALID_PARAMETERS'
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      id: schema.number()
    })
    try {
      const { id } = await request.validate({
        schema: controllerSchema
      })
      const curricula = await Database.from('professionals')
        .select(
          'professionals.*',
          'cities.title as city',
          'states.letter as uf',
          'desired_jobs.title_function as jobName'
        )
        .leftJoin('cities', 'professionals.city_id', 'cities.id')
        .leftJoin('states', 'cities.state_id', 'states.id')
        .leftJoin('desired_jobs', 'desired_jobs.id', 'professionals.desired_job_id')

      return curricula
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
