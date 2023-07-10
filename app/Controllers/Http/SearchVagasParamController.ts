import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class SearchVagasParamController {
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
          'vacancies.title',
          'desired_jobs.title_function as jobName',
          'vacancies.city_id as cityId',
          'vacancies.payment_type_id as paymentTypeId',
          'vacancies.business_id',
          'vacancies.id',
          'businesses.company_name as empresa',
          'vacancies.salary_value',
          'business_categories.title as setor',
          'businesses.phone_number',
          'company_sizes.title as porte',
          'businesses.address as addressEmp',
          'job_workloads.title as jobWorkloadTitle',
          'educational_levels.title as escolaridade',
          'vacancies.valor_comissao',
          'vacancies.benefits',
          'vacancies.job_description',
          'cities.title as cityName',
          'cities.state_id',
          'states.letter as uf'
        )
        .innerJoin('businesses', 'vacancies.business_id', 'businesses.id')
        .leftJoin('cities', 'vacancies.city_id', 'cities.id')
        .leftJoin('states', 'cities.state_id', 'states.id')
        .leftJoin(
          'business_categories',
          'businesses.business_category_id',
          'business_categories.id'
        )
        .leftJoin('company_sizes', 'businesses.company_size_id', 'company_sizes.id')
        .leftJoin('area_professional', 'vacancies.job_workload_id', 'job_workloads.id')
        .leftJoin('educational_levels', 'vacancies.escolaridade_id', 'educational_levels.id')
        .leftJoin('vaga_desejadas', 'vacancies.cargo_id', 'vaga_desejadas.id')

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
      console.log(returnDb)
      response.send(returnDb)
      return response
    } catch (err) {
      console.log(new Date())
      console.error(err)
      response.status(500)
      return null
    }
  }
}
