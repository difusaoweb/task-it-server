import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Exception } from '@adonisjs/core/build/standalone'

import Vacancy from 'App/Models/Vacancy'
import Business from 'App/Models/Business'
// import JobAvisoCreateVaga from 'App/Jobs/CreateVagaMail'
import CreateVagaMailer from 'App/Mailers/CreateVaga'
// const Database = use('Database')

// const Kue = use('Kue')

export default class VacancyController {
  public async index({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      id: schema.number.nullableAndOptional(),
      desiredJobId: schema.number.nullableAndOptional(),
      cityId: schema.number.nullableAndOptional(),
      businessCategoryId: schema.number.nullableAndOptional(),
      jobWorkloadId: schema.number.nullableAndOptional(),
      companySizeId: schema.number.nullableAndOptional(),
      paymentTypeId: schema.number.nullableAndOptional(),
      page: schema.number()
    })
    try {
      const {
        id,
        desiredJobId,
        cityId,
        businessCategoryId,
        jobWorkloadId,
        companySizeId,
        paymentTypeId,
        page
      } = await request.validate({ schema: controllerSchema })
      const perPage = 2

      const vaga = Database.from('vacancies')
        .select(
          'vacancies.id',
          'vacancies.title',
          'businesses.company_name as businessCompanyName',
          'payment_types.title as paymentTypeTitle',
          'vacancies.salary_value as salaryValue',
          'vacancies.commission',
          'cities.title as cityTitle',
          'states.letter as stateAbbreviation',
          'vacancies.job_description as jobDescription'
        )
        .innerJoin('businesses', 'businesses.id', 'vacancies.business_id')
        .leftJoin('cities', 'cities.id', 'vacancies.city_id')
        .leftJoin('states', 'states.id', 'cities.state_id')
        .leftJoin('payment_types', 'payment_types.id', 'vacancies.payment_type_id')

      if (id) {
        vaga.where('vacancies.id', id)
      }

      if (desiredJobId) {
        vaga.where('vacancies.job_id', desiredJobId)
      }

      if (cityId) {
        vaga.where('vacancies.city_id', cityId)
      }

      if (businessCategoryId) {
        vaga.where('businesses.business_category_id', businessCategoryId)
      }

      if (jobWorkloadId) {
        vaga.where('vacancies.job_workload_id', jobWorkloadId)
      }

      if (companySizeId) {
        vaga.where('businesses.company_size_id', companySizeId)
      }

      if (paymentTypeId) {
        vaga.where('vacancies.payment_type_id', paymentTypeId)
      }

      const returnDb: any = await vaga.paginate(page, perPage)

      return response.send({
        data: returnDb.rows,
        meta: { lastPage: returnDb.rows.length > 0 ? returnDb.lastPage : 0 }
      })
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

  public async last({ response }: HttpContextContract) {
    try {
      const vacancies = await Database.from('vacancies')
        .select(
          'vacancies.id',
          'vacancies.title',
          'businesses.company_name as businessCompanyName',
          'payment_types.title as paymentTypeTitle',
          'vacancies.salary_value as salaryValue',
          'vacancies.commission',
          'cities.title as cityTitle',
          'states.letter as stateAbbreviation',
          'vacancies.job_description as jobDescription'
        )
        .innerJoin('businesses', 'businesses.id', 'vacancies.business_id')
        .leftJoin('cities', 'cities.id', 'vacancies.city_id')
        .leftJoin('states', 'states.id', 'cities.state_id')
        .leftJoin('payment_types', 'payment_types.id', 'vacancies.payment_type_id')
        .limit(6)

      return response.send(vacancies)
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

  // public async index2({ request, response }: HttpContextContract) {
  //   const controllerSchema = schema.create({
  //     title: schema.string.nullableAndOptional()
  //   })
  //   try {
  //     const { title } = await request.validate({ schema: controllerSchema })
  //     const query = Database.from('vacancies')
  //       .select(
  //         'vacancies.title',
  //         'vacancies.payment_type_id as paymentTypeId',
  //         'vacancies.city_id as cityId',
  //         'vacancies.business_id as businessId',
  //         'vacancies.id',
  //         'businesses.company_name as businessName',
  //         'vacancies.salary_value as salaryValue',
  //         'vacancies.job_description as jobDescription',
  //         'cities.title as cityName',
  //         'employment_regimes.title as employmentRegimeTitle',
  //         'cities.state_id as stateId',
  //         'states.letter as uf',
  //         'shift_patterns.title as periodoTrabalho'
  //       )
  //       .innerJoin('businesses', 'vacancies.business_id', 'businesses.id')
  //       .innerJoin('cities', 'vacancies.city_id', 'cities.id')
  //       .innerJoin('states', 'cities.state_id', 'states.id')
  //       .leftJoin('employment_regimes', 'vacancies.employment_regime_id', 'employment_regimes.id')
  //       .leftJoin('shift_patterns', 'vacancies.shift_pattern_id', 'shift_patterns.id')
  //       .limit(6)
  //       .orderBy('vacancies.id', 'desc')

  //     if (typeof title === 'string') {
  //       query.where('vacancies.title', 'ILIKE', '%' + title + '%')
  //     }
  //     const returnDb = await query

  //     response.send(returnDb)
  //     return response
  //   } catch (err: any) {
  //     let status = 500
  //     let failure: any = { code: 'UNKNOWN' }
  //     switch (err.code) {
  //       default:
  //         console.error(err)
  //         break
  //     }
  //     return response.status(status).send(failure)
  //   }
  // }

  public async indexBusinessApplied({ auth, response }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (user === undefined) {
        throw new Exception('', 403, 'TOKEN_USER_INVALID')
      }

      const business = await Business.findByOrFail('user_id', user.id)

      const returnDb = await Database.from('applies')
        .select(
          'applies.id',
          'vacancies.title as vacancyTitle',
          'cities.title as cityTitle',
          'states.letter as stateAbbreviation',
          'job_workloads.title as jobWorkloadTitle',
          'vacancies.payment_type_id as paymentTypeId',
          'applies.vacancy_id as vacancyId',
          'applies.candidate_id as candidateId',
          'professionals.name as professionalName'
        )
        .innerJoin('vacancies', 'vacancies.id', 'applies.vacancy_id')
        .innerJoin('professionals', 'professionals.id', 'applies.candidate_id')
        .innerJoin('cities', 'cities.id', 'professionals.city_id')
        .innerJoin('states', 'states.id', 'cities.state_id')
        .innerJoin('businesses', 'businesses.id', 'vacancies.business_id')
        .innerJoin('job_workloads', 'job_workloads.id', 'vacancies.job_workload_id')
        .innerJoin('users', 'users.id', 'businesses.user_id')
        .where('businesses.id', business.id)

      return returnDb
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'TOKEN_USER_INVALID':
          status = err.status
          failure.code = err.code
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async indexBusinessRegistered({ auth, response }) {
    try {
      const user = auth.use('api').user
      if (user === undefined) {
        throw new Error('TOKEN_USER_INVALID')
      }

      const business = await Business.findBy('user_id', user.id)
      if (business === null) {
        throw new Exception('', 404, 'BUSINESS_NOT_FOUND')
      }

      const vacancies = await Database.from('vacancies')
        .select(
          'vacancies.id',
          'vacancies.title',
          'cities.title as cityTitle',
          'states.letter as stateAbbreviation'
        )
        .innerJoin('cities', 'cities.id', 'vacancies.city_id')
        .innerJoin('states', 'states.id', 'cities.state_id')
        .where('vacancies.business_id', business.id)
        .orderBy('vacancies.id', 'desc')

      return response.send(vacancies)
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      if (err.code) {
        failure.code = err.code
      }

      switch (failure.code) {
        case 'BUSINESS_NOT_FOUND':
          status = err.status
          break
        case 'UNKNOWN':
          console.error(err)
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async show({ auth, request, response }) {
    const controllerSchema = schema.create({
      id: schema.number()
    })
    try {
      const { id } = await request.validate({ schema: controllerSchema })

      await auth.use('api').check()
      const user = auth.use('api').user

      interface VacancyTypes {
        applicant: boolean | number
      }
      let vacancy: VacancyTypes | VacancyTypes[] | null = null

      if (user === undefined) {
        vacancy = await Database.from('vacancies')
          .select(
            'vacancies.id',
            'businesses.company_name as businessCompanyName',
            'company_sizes.title as companySizeTitle',
            'business_categories.title as businessCategoryTitle',
            'businesses.address as businessAddress',
            'businesses.business_phone as businessPhone',
            'businesses.description',
            'vacancies.title',
            'desired_jobs.title_function as desiredJobTitleFunction',
            'vacancies.job_description as jobDescription',
            'employment_regimes.title as employmentRegimeTitle',
            'vacancies.requirements',
            'job_workloads.title as jobWorkloadTitle',
            'educational_levels.title as educationalLevelTitle',
            'payment_types.title as paymentTypeTitle',
            'vacancies.salary_value as salaryValue',
            'vacancies.commission',
            'cities.title as cityTitle',
            'states.letter as stateAbbreviation',
            'vacancies.workload',
            'vacancies.benefits',
            'vacancies.address'
          )
          .leftJoin('businesses', 'businesses.id', 'vacancies.business_id')
          .leftJoin('company_sizes', 'company_sizes.id', 'businesses.company_size_id')
          .leftJoin(
            'business_categories',
            'business_categories.id',
            'businesses.business_category_id'
          )
          .leftJoin('desired_jobs', 'desired_jobs.id', 'vacancies.job_id')
          .leftJoin('employment_regimes', 'employment_regimes.id', 'vacancies.employment_regime_id')
          .leftJoin('job_workloads', 'job_workloads.id', 'vacancies.job_workload_id')
          .leftJoin('educational_levels', 'educational_levels.id', 'vacancies.educational_level_id')
          .leftJoin('payment_types', 'payment_types.id', 'vacancies.payment_type_id')
          .leftJoin('cities', 'cities.id', 'vacancies.city_id')
          .leftJoin('states', 'states.id', 'cities.state_id')
          .where('vacancies.id', id)
          .orderBy('vacancies.id', 'desc')

        if (vacancy.length === 0) {
          throw { status: 404, code: 'VACANCY_NOT_FOUND' }
        }

        vacancy = vacancy[0]
        vacancy.applicant = false
      } else {
        vacancy = await Database.from('vacancies')
          .select(
            'vacancies.id',
            'businesses.company_name as businessCompanyName',
            'company_sizes.title as companySizeTitle',
            'business_categories.title as businessCategoryTitle',
            'businesses.address as businessAddress',
            'businesses.business_phone as businessPhone',
            'businesses.description',
            'vacancies.title',
            'desired_jobs.title_function as desiredJobTitleFunction',
            'vacancies.job_description as jobDescription',
            'employment_regimes.title as employmentRegimeTitle',
            'vacancies.requirements',
            'job_workloads.title as jobWorkloadTitle',
            'educational_levels.title as educationalLevelTitle',
            'payment_types.title as paymentTypeTitle',
            'vacancies.salary_value as salaryValue',
            'vacancies.commission',
            'cities.title as cityTitle',
            'states.letter as stateAbbreviation',
            'vacancies.workload',
            'vacancies.benefits',
            'vacancies.address',
            Database.from('applies')
              .select(1)
              .whereColumn('candidate_id', 'professionals.id')
              .whereColumn('vacancy_id', 'vacancies.id')
              .limit(1)
              .as('applicant')
          )
          .leftJoin('businesses', 'businesses.id', 'vacancies.business_id')
          .leftJoin('company_sizes', 'company_sizes.id', 'businesses.company_size_id')
          .leftJoin(
            'business_categories',
            'business_categories.id',
            'businesses.business_category_id'
          )
          .leftJoin('desired_jobs', 'desired_jobs.id', 'vacancies.job_id')
          .leftJoin('employment_regimes', 'employment_regimes.id', 'vacancies.employment_regime_id')
          .leftJoin('job_workloads', 'job_workloads.id', 'vacancies.job_workload_id')
          .leftJoin('educational_levels', 'educational_levels.id', 'vacancies.educational_level_id')
          .leftJoin('payment_types', 'payment_types.id', 'vacancies.payment_type_id')
          .leftJoin('cities', 'cities.id', 'vacancies.city_id')
          .leftJoin('states', 'states.id', 'cities.state_id')
          .leftJoin('professionals', 'professionals.user_id', user.id)
          .where('vacancies.id', id)
          .orderBy('vacancies.id', 'desc')

        if (vacancy.length === 0) {
          throw { status: 404, code: 'VACANCY_NOT_FOUND' }
        }

        vacancy = vacancy[0]
        vacancy.applicant = vacancy.applicant === 1
      }

      return response.send(vacancy)
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'VACANCY_NOT_FOUND':
          status = err.status
          failure.code = err.code
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async showDashboard({ request, response }) {
    const controllerSchema = schema.create({
      id: schema.number()
    })
    try {
      const { id } = await request.validate({ schema: controllerSchema })

      const vaga = await Database.from('vacancies')
        .select(
          'vacancies.id',
          'desired_jobs.id as desiredJobId',
          'desired_jobs.title_departament as desiredJobTitleDepartament',
          'desired_jobs.title_function as desiredJobTitleFunction',
          'vacancies.title',
          'cities.id as cityId',
          'cities.title as cityTitle',
          'job_workloads.id as jobWorkloadId',
          'job_workloads.title as jobWorkloadTitle',
          'educational_levels.id as educationalLevelId',
          'educational_levels.title as educationalLevelTitle',
          'payment_types.id as paymentTypeId',
          'payment_types.title as paymentTypeTitle',
          'employment_regimes.id as employmentRegimeId',
          'employment_regimes.title as employmentRegimeTitle',
          'vacancies.salary_value as salaryValue',
          'vacancies.commission',
          'vacancies.workload',
          'vacancies.address',
          'vacancies.job_description as jobDescription',
          'vacancies.requirements',
          'vacancies.benefits'
        )
        .leftJoin('desired_jobs', 'desired_jobs.id', 'vacancies.job_id')
        .leftJoin('employment_regimes', 'employment_regimes.id', 'vacancies.employment_regime_id')
        .leftJoin('job_workloads', 'job_workloads.id', 'vacancies.job_workload_id')
        .leftJoin('educational_levels', 'educational_levels.id', 'vacancies.educational_level_id')
        .leftJoin('payment_types', 'payment_types.id', 'vacancies.payment_type_id')
        .leftJoin('cities', 'cities.id', 'vacancies.city_id')
        .where('vacancies.id', id)
        .orderBy('vacancies.id', 'desc')
      if (vaga.length === 0) {
        throw new Exception('', 404, 'VACANCY_NOT_FOUND')
      }

      return response.send(vaga[0])
    } catch (err: any) {
      console.error(err)
      let status = 500
      let failure: any = { code: 'UNKNOWN' }

      if (err.status !== undefined) {
        failure.status = err.status
      }
      if (err.code !== undefined) {
        failure.code = err.code
      }

      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 403
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'VACANCY_NOT_FOUND':
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      jobId: schema.number(),
      title: schema.string(),
      cityId: schema.number.nullable(),
      jobWorkloadId: schema.number(),
      educationalLevelId: schema.number(),
      paymentTypeId: schema.number(),
      employmentRegimeId: schema.number(),
      salaryValue: schema.number.nullable(),
      commission: schema.string.nullable(),
      workload: schema.string(),
      address: schema.string.nullable(),
      jobDescription: schema.string(),
      requirements: schema.string(),
      benefits: schema.string()
    })
    try {
      const {
        jobId,
        title,
        cityId,
        jobWorkloadId,
        educationalLevelId,
        paymentTypeId,
        employmentRegimeId,
        salaryValue,
        commission,
        workload,
        address,
        jobDescription,
        requirements,
        benefits
      } = await request.validate({
        schema: controllerSchema
      })

      const user = auth.use('api').user
      if (user === undefined) {
        throw new Error('TOKEN_USER_INVALID')
      }

      const business = await Business.findByOrFail('user_id', user.id)

      const vaga = await Vacancy.create({
        businessId: business.id,
        jobId,
        title,
        cityId,
        jobWorkloadId,
        educationalLevelId,
        paymentTypeId,
        employmentRegimeId,
        salaryValue,
        commission,
        workload,
        address,
        jobDescription,
        requirements,
        benefits
      })

      // Kue.dispatch(JobAvisoCreateVaga.key, { email: empresa.email }, { attempts: 3 })
      await new CreateVagaMailer({ email: business.email })

      return vaga
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }
      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 400
          failure.code = 'INVALID_PARAMETERS'
          break
        default:
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      // id: schema.number(),
      jobId: schema.number(),
      title: schema.string(),
      cityId: schema.number.nullable(),
      jobWorkloadId: schema.number(),
      educationalLevelId: schema.number(),
      paymentTypeId: schema.number(),
      employmentRegimeId: schema.number(),
      salaryValue: schema.number.nullable(),
      commission: schema.string.nullable(),
      workload: schema.string(),
      address: schema.string.nullable(),
      jobDescription: schema.string(),
      requirements: schema.string(),
      benefits: schema.string()
    })
    try {
      const id: number | null = request.param('id', null)
      const data = await request.validate({
        schema: controllerSchema
      })
      const user = auth.use('api').user
      if (user === undefined) {
        throw new Error('TOKEN_USER_INVALID')
      }

      const vacancy = await Vacancy.findOrFail(id)

      console.log(vacancy.users)

      vacancy.merge(data)
      await vacancy.save()

      return response.status(200).send({ updated: true })
    } catch (err: any) {
      let status = 500
      let failure: any = { code: 'UNKNOWN' }

      if (err.status !== undefined) {
        failure.status = err.status
      }
      if (err.code !== undefined) {
        failure.code = err.code
      }

      switch (err.code) {
        case 'E_VALIDATION_FAILURE':
          status = 400
          failure.code = 'INVALID_PARAMETERS'
          break
        case 'TOKEN_USER_INVALID':
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/VacancyController.ts')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }

  // public async show({ auth, request, response }: HttpContextContract) {
  //   const vaga = await Database.select('vacancies.*', 'cities.title as nomeCidade', 'educational_levels.title as escolaridade',
  //     'employment_regimes.title as tipoContratacao', 'shift_patterns.title as periodoTrabalho',
  //     'area_professionals.title as area_profissional', 'payment_types.title as tipoSalario', 'desired_jobs.title_function as jobNameName')
  //     .from('vacancies').where('vacancies.id', params.id)
  //     .leftJoin('cities', 'vacancies.city_id', 'cities.id')
  //     .leftJoin('educational_levels', 'educational_levels.id', 'vacancies.escolaridade_id')
  //     .leftJoin('area_professional', 'vacancies.job_workload_id', 'job_workloads.id')
  //     .leftJoin('payment_types', 'vacancies.payment_type_id', 'payment_types.id')
  //     .leftJoin('vaga_desejadas', 'vacancies.cargo_id', 'vaga_desejadas.id')
  //     .leftJoin('employment_regimes', 'vacancies.employment_regime_id', 'employment_regimes.id')
  //     .leftJoin('shift_patterns', 'vacancies.shift_pattern_id', 'shift_patterns.id')

  //   return vaga
  // }

  // public async destroy({ auth, request, response }: HttpContextContract) {
  //   const vaga = await Vagas.findOrFail(params.id)

  //   vaga.delete()
  // }

  public async destroy({ auth, request, response }: HttpContextContract) {
    try {
      const id: number | null = request.param('id', null)
      if (id === null) {
        throw { code: 'INVALID_PARAMETERS', status: 400 }
      }

      const vacancy = await Vacancy.findOrFail(id)

      const user = auth.use('api').user
      if (user === undefined) {
        throw { code: 'TOKEN_USER_INVALID' }
      }
      await user.load('business')
      if (user.business === null) {
        throw { code: 'BUSINESS_NOT_FOUND' }
      }

      if (vacancy.businessId !== user.business.id) {
        throw { code: 'YOU_ARE_NOT_THE_OWNER' }
      }

      vacancy.delete()

      return response.status(200).send({ deleted: true })
    } catch (err: any) {
      // console.error(err)
      let status = 500
      const failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (err.code) {
        case 'INVALID_PARAMETERS':
          break
        case 'BUSINESS_NOT_FOUND':
          break
        case 'YOU_ARE_NOT_THE_OWNER':
          break
        case 'E_ROW_NOT_FOUND':
          failure.code = 'VACANCY_NOT_FOUND'
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/VacancyController.ts destroy')
          console.error(err)
          break
      }
      return response.status(status).send(failure)
    }
  }
}
