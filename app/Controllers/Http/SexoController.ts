import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Sexo from 'App/Models/Sexo'

export default class SexoController {
  public async index({ response }: HttpContextContract) {
    try {
      const sexo = await Sexo.all()
      return sexo
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
