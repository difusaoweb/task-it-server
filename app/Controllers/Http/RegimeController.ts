import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Regime from 'App/Models/Regime'

export default class RegimeController {
  public async index({ response }: HttpContextContract) {
    try {
      const RegimeProfi = await Regime.all()
      return RegimeProfi
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
