import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DadosCadastroController {
  public async index({ response }: HttpContextContract) {
    try {
      const amountBusiness = await Database.from('businesses').count('* as businesses')
      const amountCurricula = await Database.from('professionals').count('* as curricula')
      const amountVacancies = await Database.from('vacancies').count('* as vacancies')

      interface DataReturnTypes {
        amountBusiness: number
        amountCurricula: number
        amountVacancies: number
      }
      const dataReturn: DataReturnTypes = {
        amountBusiness: parseInt(amountBusiness[0].businesses),
        amountCurricula: parseInt(amountCurricula[0].curricula),
        amountVacancies: parseInt(amountVacancies[0].vacancies)
      }
      return response.send(dataReturn)
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
