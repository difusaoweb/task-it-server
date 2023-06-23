import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DadosCadastroController {
  public async index({ response }: HttpContextContract) {
    try {
      const totalEmpresas = await Database.from('contratantes').count('* as empresas')
      const totalCurriculos = await Database.from('profissionals').count('* as curriculos')
      const totalVagas = await Database.from('vagases').count('* as vagas')

      interface DataReturnTypes {
        totalEmpresas: number
        totalCurriculos: number
        totalVagas: number
      }
      const dataReturn: DataReturnTypes = {
        totalEmpresas: parseInt(totalEmpresas[0].empresas),
        totalCurriculos: parseInt(totalCurriculos[0].curriculos),
        totalVagas: parseInt(totalVagas[0].vagas)
      }
      response.send(dataReturn)
      return response
    } catch (err) {
      console.error(err)
      return response
    }
  }
}
