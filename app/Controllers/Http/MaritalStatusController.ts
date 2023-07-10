import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import MaritalStatus from 'App/Models/MaritalStatus'

export default class MaritalStatusController {
  public async index({ response }: HttpContextContract) {
    try {
      const maritalStatuses = await MaritalStatus.all()
      return maritalStatuses
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
