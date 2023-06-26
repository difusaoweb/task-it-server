import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import PesquisaSalario from 'App/Models/PesquisaSalario'
import CargosPesquisaSalario from 'App/Models/CargosPesquisaSalario'

export default class PesquisaSalarioController {
  public async store({ request, response }: HttpContextContract) {
    const controllerSchema = schema.create({
      email: schema.string(),
      nome: schema.string(),
      meucargo: schema.string(),
      telefoneContato: schema.string(),
      nomeEmpresa: schema.string(),
      areaAtuacao: schema.string(),
      cidadeId: schema.number.nullableAndOptional(),
      endereco: schema.string(),
      cep: schema.string(),
      site: schema.string(),
      telefoneRamal: schema.string(),
      cargosIds: schema.array().members(schema.number()),
      valorSalario: schema.string(),
      valorSalarioColaboradores: schema.string(),
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
        cidadeId,
        endereco,
        cep,
        site,
        telefoneRamal,
        cargosIds,
        valorSalario,
        valorSalarioColaboradores,
        tipoSalarioId
      } = await request.validate({ schema: controllerSchema })

      const pesquisaExists = await PesquisaSalario.findBy('email', email)
      if (pesquisaExists) {
        return response.status(400).send({ error: 'Pesquisa already exists.' })
      }

      const pesquisaSalario = await PesquisaSalario.create({
        email,
        nome,
        meucargo,
        telefoneContato,
        nomeEmpresa,
        areaAtuacao,
        cidadeId,
        endereco,
        cep,
        site,
        telefoneRamal,
        valorSalario,
        valorSalarioColaboradores,
        tipoSalarioId
      })

      const cargosPesquisaSalario = cargosIds.map((cargoId) => {
        const dados = {
          idPesquisaSalario: pesquisaSalario.id,
          idCargo: cargoId
        }

        return dados
      })

      const cargosPesquisa = await CargosPesquisaSalario.createMany(cargosPesquisaSalario)

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
