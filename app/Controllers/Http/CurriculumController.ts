import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import { Exception } from '@adonisjs/core/build/standalone'

import Professional from 'App/Models/Professional'

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
          'cities.title as cityTitle',
          'states.letter as stateAbbreviation',
          'desired_jobs.title_function as desiredJobTitleFunction'
        )
        .innerJoin('cities', 'cities.id', 'professionals.city_id')
        .innerJoin('states', 'states.id', 'cities.state_id')
        .innerJoin('desired_jobs', 'desired_jobs.id', 'professionals.desired_job_id')
        .forPage(page, 10)

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

  public async show({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      curriculumId: schema.number()
    })
    try {
      let { curriculumId } = await request.validate({
        schema: controllerSchema
      })

      const professional = await Database.from('professionals')
        .select(
          'professionals.*',
          'cities.title as cityTitle',
          'educational_levels.title as educationalLevelTitle',
          'job_workloads.title as jobWorkloadTitle',
          'desired_jobs.title_function as desiredJobTitleFunction',
          'sexes.title as sexTitle',
          'marital_statuses.title as maritalStatusTitle',
          'employment_regimes.title as employmentRegimeTitle'
        )
        .innerJoin('cities', 'cities.id', 'professionals.city_id')
        .innerJoin(
          'educational_levels',
          'educational_levels.id',
          'professionals.educational_level_id'
        )
        .leftJoin('job_workloads', 'job_workloads.id', 'professionals.job_workload_id')
        .innerJoin('desired_jobs', 'desired_jobs.id', 'professionals.desired_job_id')
        .innerJoin('sexes', 'sexes.id', 'professionals.sex_id')
        .innerJoin('marital_statuses', 'marital_statuses.id', 'professionals.marital_status_id')
        .innerJoin(
          'employment_regimes',
          'employment_regimes.id',
          'professionals.employment_regime_id'
        )
        .where('professionals.id', curriculumId)
      if (professional.length === 0) {
        throw {
          status: 404,
          code: 'PROFESSIONAL_NOT_FOUND'
        }
      }

      const skills = await Database.from('skill_professional as hp')
        .select('h.*')
        .innerJoin('skills as h', 'h.id', 'hp.skill_id')
        .where('hp.professional_id', curriculumId)

      const experiences = await Database.from('experiences_of_professionals as ep')
        .select('ep.business', 'ep.start_date', 'ep.end_date', 'ep.role')
        .where('ep.professional_id', curriculumId)

      const courses = await Database.from('courses_of_professionals as cs')
        .select('cs.institution', 'cs.start_date', 'cs.end_date', 'cs.course')
        .where('cs.professional_id', curriculumId)

      return response.send({
        professional: professional.length === 0 ? {} : professional[0],
        skills,
        experiences,
        courses
      })
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      if (err.status) {
        status = err.status
      }
      if (err.code) {
        failure.code = err.code
      }

      switch (failure.code) {
        case 'PROFESSIONAL_NOT_FOUND':
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/CurriculumController.ts show')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  // public async show({ auth, request, response }: HttpContextContract) {
  //   const controllerSchema = schema.create({
  //     curriculumId: schema.number.optional()
  //   })
  //   try {
  //     let { curriculumId } = await request.validate({
  //       schema: controllerSchema
  //     })

  //     if (curriculumId === undefined) {
  //       const user = auth.use('api').user
  //       if (user === undefined) {
  //         throw new Exception('', 403, 'TOKEN_USER_INVALID')
  //       }

  //       const professional = await Professional.findBy('user_id', user.id)
  //       if (professional === null) {
  //         throw new Exception('', 404, 'PROFESSIONAL_NOT_FOUND')
  //       }

  //       curriculumId = professional.id
  //     }

  //     const professional = await Database.from('professional')
  //       .select(
  //         'professionals.*',
  //         'cities.title as cityTitle',
  //         'educational_levels.title as educational_levels.title',
  //         'job_workloads.title as jobWorkloadTitle',
  //         'desired_jobs.title_function as vagaDesejada',
  //         'sexes.title as sexo',
  //         'marital_statuses.title as stateCivil'
  //       )
  //       .innerJoin('cities', 'professionals.city_id', 'cities.id')
  //       .innerJoin('educational_levels', 'educational_levels.id', 'professionals.escolaridade_id')
  //       .leftJoin('area_professional', 'professionals.area_atuacao_id', 'job_workloads.id')
  //       .innerJoin('vaga_desejadas', 'professionals.vaga_desejada_id', 'vaga_desejadas.id')
  //       .innerJoin('sexos', 'professionals.sexo_id', 'sexes.id')
  //       .innerJoin('marital_statuses', 'professionals.marital_status_id', 'marital_statuses.id')
  //       .where('professionals.id', curriculumId)

  //     console.log(professional)

  //     const skills = await Database.from('skills_professional as hp')
  //       .select('h.*')
  //       .innerJoin('skills as h', 'h.id', 'hp.skill_id')
  //       .where('hp.professional_id', curriculumId)

  //     const experiences = await Database.from('experiences_of_professional as ep')
  //       .select('ep.business', 'ep.start_date', 'ep.end_date', 'ep.current', 'ep.role')
  //       .where('ep.professional_id', curriculumId)

  //     const courses = await Database.from('courses_of_professional as cs')
  //       .select('cs.institution', 'cs.start_date', 'cs.end_date', 'cs.course')
  //       .where('cs.professional_id', curriculumId)

  //     return response.send({
  //       professional: professional.length === 0 ? {} : professional[0],
  //       skills,
  //       experiences,
  //       courses
  //     })
  //   } catch (err: any) {
  //     // console.error(err)
  //     let status = 500
  //     let failure: any = { code: 'UNKNOWN' }
  //     if (err.code) {
  //       failure.code = err.code
  //     }
  //     switch (failure.code) {
  //       case 'UNKNOWN':
  //         console.error(err)
  //         break
  //     }
  //     return response.status(status).send(failure)
  //   }
  // }

  public async showDashboard({ auth, response }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', 403, 'TOKEN_USER_INVALID')
      }

      const professional = await Professional.findBy('user_id', user.id)
      if (professional === null) {
        throw new Exception('', 404, 'PROFESSIONAL_NOT_FOUND')
      }

      const curriculum = await Database.from('professionals')
        .select(
          'professionals.*',
          'cities.id as cityId',
          'cities.title as cityTitle',
          'educational_levels.id as educationalLevelId',
          'educational_levels.title as educationalLevelTitle',
          'marital_statuses.id as maritalStatusId',
          'marital_statuses.title as maritalStatusTitle',
          'sexes.id as sexId',
          'sexes.title as sexTitle',
          'employment_regimes.id as employmentRegimeId',
          'employment_regimes.title as employmentRegimeTitle',
          'job_workloads.id as jobWorkloadId',
          'job_workloads.title as jobWorkloadTitle',
          'desired_jobs.id as desiredJobId',
          'desired_jobs.title_function as desiredJobTitle'
        )
        .innerJoin('cities', 'cities.id', 'professionals.city_id')
        .innerJoin(
          'educational_levels',
          'educational_levels.id',
          'professionals.educational_level_id'
        )
        .innerJoin('marital_statuses', 'marital_statuses.id', 'professionals.marital_status_id')
        .innerJoin('sexes', 'sexes.id', 'professionals.sex_id')
        .innerJoin(
          'employment_regimes',
          'employment_regimes.id',
          'professionals.employment_regime_id'
        )
        .leftJoin('job_workloads', 'job_workloads.id', 'professionals.job_workload_id')
        .innerJoin('desired_jobs', 'desired_jobs.id', 'professionals.desired_job_id')
        .where('professionals.id', professional.id)

      await professional.load('skills')
      await professional.load('courses')
      await professional.load('experiences')

      // const skills = await Database.from('skills_professional as hp')
      //   .select('h.*')
      //   .innerJoin('skills as h', 'h.id', 'hp.skill_id')
      //   .where('hp.professional_id', professional.id)

      // const experiences = await Database.from('experiences_of_professional as ep')
      //   .select('ep.business', 'ep.start_date', 'ep.end_date', 'ep.current', 'ep.role')
      //   .where('ep.professional_id', professional.id)

      // const courses = await Database.from('courses_of_professional as cs')
      //   .select('cs.institution', 'cs.start_date', 'cs.end_date', 'cs.course')
      //   .where('cs.professional_id', professional.id)

      return response.send({
        professional: curriculum.length === 0 ? {} : curriculum[0],
        skills: professional.skills,
        experiences: professional.experiences,
        courses: professional.courses
      })
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
          break
        case 'PROFESSIONAL_NOT_FOUND':
          status = 404
          break
        case 'UNKNOWN':
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
