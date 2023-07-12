import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

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
      cargoId: schema.number.nullableAndOptional(),
      cityId: schema.number.nullableAndOptional(),
      businessCategoryId: schema.number.nullableAndOptional(),
      areaProfissional: schema.number.nullableAndOptional(),
      companySizeId: schema.number.nullableAndOptional(),
      paymentTypeId: schema.number.nullableAndOptional(),
      page: schema.number()
    })
    try {
      const {
        id,
        cargoId,
        cityId,
        businessCategoryId,
        areaProfissional,
        companySizeId,
        paymentTypeId,
        page
      } = await request.validate({ schema: controllerSchema })
      const perPage = 10

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

      if (cargoId) {
        vaga.where('vacancies.cargo_id', cargoId)
      }

      if (cityId) {
        vaga.where('vacancies.city_id', cityId)
      }

      if (businessCategoryId) {
        vaga.where('businesses.business_category_id', businessCategoryId)
      }

      if (areaProfissional) {
        vaga.where('vacancies.job_workload_id', areaProfissional)
      }

      if (companySizeId) {
        vaga.where('businesses.company_size_id', companySizeId)
      }

      if (paymentTypeId) {
        vaga.where('vacancies.payment_type_id', paymentTypeId)
      }

      const returnDb = await vaga.paginate(page, perPage)
      return response.send(returnDb)
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

  public async show({ request, response }) {
    const controllerSchema = schema.create({
      id: schema.number()
    })
    try {
      const { id } = await request.validate({ schema: controllerSchema })
      const vaga = await Database.from('vacancies')
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

      return response.send(vaga[0])
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

  public async last({ request, response }: HttpContextContract) {
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

  // public async update({ auth, request, response }: HttpContextContract) {
  //   const data = request.only(['area_profissional_id', 'tipo_salario', 'escolaridade_id',
  //     'valor_comissao', 'benefits', 'job_description', 'cargo_id', 'salary_value', 'title', 'business_id',
  //     'city_id', 'desc_carga_horaria', 'address', 'requirements', 'employment_regime_id', 'shift_pattern_id'])

  //   const vaga = await Vagas.findOrFail(params.id)

  //   vaga.merge(data)

  //   await vaga.save()

  //   return vaga
  // }

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
}
