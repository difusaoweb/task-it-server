import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import SalarySurvey from 'App/Models/SalarySurvey'
import RolesSalarySurvey from 'App/Models/RolesSalarySurvey'

export default class SalarySurveyController {
  public async store({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      nome: schema.string(),
      meucargo: schema.string(),
      telefoneContato: schema.string(),
      nomeEmpresa: schema.string(),
      areaAtuacao: schema.string(),
      cityId: schema.number.nullable(),
      address: schema.string.nullable(),
      cep: schema.string.nullable(),
      site: schema.string(),
      telefoneRamal: schema.string(),
      desiredJobsId: schema.array().members(schema.number()),
      paymentTypeId: schema.number(),
      salaryValue: schema.string(),
      salaryValueColaboradores: schema.string()
    })
    try {
      const {
        email,
        nome,
        meucargo,
        telefoneContato,
        nomeEmpresa,
        areaAtuacao,
        cityId,
        address,
        cep,
        site,
        telefoneRamal,
        desiredJobsId,
        paymentTypeId,
        salaryValue,
        salaryValueColaboradores
      } = await request.validate({ schema: controllerSchema })

      const pesquisaExists = await SalarySurvey.findBy('email', email)
      if (pesquisaExists) {
        throw { code: 'SURVEY_ALREADY_EXISTS', status: 400 }
      }

      const pesquisaSalario = await SalarySurvey.create({
        email,
        nome,
        meucargo,
        telefoneContato,
        nomeEmpresa,
        areaAtuacao,
        cityId,
        address,
        cep,
        site,
        telefoneRamal,
        paymentTypeId,
        salaryValue,
        salaryValueColaboradores
      })

      const cargosSalarySurvey = desiredJobsId.map((desiredJobId) => {
        const dados = {
          salarySurveyId: pesquisaSalario.id,
          desiredJobId: desiredJobId
        }

        return dados
      })

      const cargosPesquisa = await RolesSalarySurvey.createMany(cargosSalarySurvey)

      const returnResonse = {
        pesquisaSalario,
        cargosPesquisa
      }
      response.send(returnResonse)
      return response
    } catch (err: any) {
      console.error(err)
      let status = 500
      let failure = { code: 'UNKNOWN' }
      if (err.code !== undefined) {
        failure.code = err.code
      }
      if (err.status !== undefined) {
        status = err.status
      }

      switch (failure.code) {
        case 'SURVEY_ALREADY_EXISTS':
          break
        case 'UNKNOWN':
          console.error(new Date(), 'app/Controllers/Http/SalarySurveyController.ts store')
          console.error(err)
          break
      }

      return response.status(status).send(failure)
    }
  }
}
