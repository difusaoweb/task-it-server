import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import EstadoCivil from 'App/Models/EstadoCivil'

export default class EstadoCivilController {
  public async index({ response }: HttpContextContract) {
    try {
      const estadoCivil = await EstadoCivil.all()
      return estadoCivil
    } catch (err) {
      console.error(err)
      let status = 500
      let code = 'UNKNOWN'
      // switch (err?.message) {
      //   case 'USER_EXISTS':
      //     status = 400
      //     code = 'USER_EXISTS'
      //     break
      // }
      return response.status(status).send({ failure: { code } })
    }
  }
}
