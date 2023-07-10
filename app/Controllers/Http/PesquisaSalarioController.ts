import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import SalarySurvey from 'App/Models/SalarySurvey'
import CargosSalarySurvey from 'App/Models/CargosSalarySurvey'

export default class SalarySurveyController {
  public async store({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      nome: schema.string(),
      meucargo: schema.string(),
      telefoneContato: schema.string(),
      nomeEmpresa: schema.string(),
      areaAtuacao: schema.string(),
      cityId: schema.number.nullableAndOptional(),
      address: schema.string(),
      cep: schema.string(),
      site: schema.string(),
      telefoneRamal: schema.string(),
      cargosIds: schema.array().members(schema.number()),
      salaryValue: schema.string(),
      salaryValueColaboradores: schema.string(),
      tipoSalarioId: schema.number.nullableAndOptional()
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
        cargosIds,
        salaryValue,
        salaryValueColaboradores,
        tipoSalarioId
      } = await request.validate({ schema: controllerSchema })

      const pesquisaExists = await SalarySurvey.findBy('email', email)
      if (pesquisaExists) {
        return response.status(400).send({ error: 'Pesquisa already exists.' })
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
        salaryValue,
        salaryValueColaboradores,
        tipoSalarioId
      })

      const cargosSalarySurvey = cargosIds.map((cargoId) => {
        const dados = {
          idSalarySurvey: pesquisaSalario.id,
          idCargo: cargoId
        }

        return dados
      })

      const cargosPesquisa = await CargosSalarySurvey.createMany(cargosSalarySurvey)

      const returnResonse = {
        pesquisaSalario,
        cargosPesquisa
      }
      response.send(returnResonse)
      return response
    } catch (err) {
      console.error(err)
      response.status(500)
      return response
    }
  }
}
